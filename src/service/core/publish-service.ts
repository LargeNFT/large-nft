import { BigNumber, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Author } from "../../dto/author"
import { Channel } from "../../dto/channel"
import { Animation } from "../../dto/animation"

import { ExportBundle } from "../../dto/export-bundle"
import { Item } from "../../dto/item"
import { Image } from "../../dto/image"

import { PublishStatus } from "../../dto/viewmodel/publish-status"
import { AuthorService } from "../author-service"
import { ChannelService } from "../channel-service"
import { ImageService } from "../image-service"
import { ItemService } from "../item-service"

import { IpfsService } from "./ipfs-service"
import TYPES from "./types"
import { WalletService } from "./wallet-service"
import { AnimationService } from "../animation-service"


import { ThemeService } from "../theme-service"
import { Theme } from "../../dto/theme"
import { StaticPage } from "../../dto/static-page"
import { StaticPageService } from "../static-page-service"

import Hash from 'ipfs-only-hash'


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private themeService:ThemeService,
        private staticPageService:StaticPageService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async publishToIPFS(channel: Channel) {

        //Get all the items
        const items: Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)

        //Get author
        const author = await this.authorService.get(channel.authorId)

        //Get themes
        const themes = await this.themeService.listByChannel(channel._id, 1000, 0)

        //Get static pages
        const staticPages = await this.staticPageService.listByChannel(channel._id, 1000, 0)

        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.prepareExport(channel, items, author, themes, staticPages, this.walletService.address)
        this.logPublishProgress(undefined, "Exporting backup...")

        let cid: string = await this.exportToIPFS(exportBundle)


        //Update local cid info
        Object.assign(channel, await this.channelService.get(channel._id))

        channel.localCid = cid
        channel.localPubDate = new Date().toJSON()

        await this.channelService.put(channel)

    }

    async prepareExport(originalChannel: Channel, originalItems: Item[], originalAuthor: Author, originalThemes:Theme[], originalStaticPages:StaticPage[], ownerAddress:string) : Promise<ExportBundle> {

        //Clone
        let channel = JSON.parse(JSON.stringify(originalChannel))
        let items = JSON.parse(JSON.stringify(originalItems))
        let author = JSON.parse(JSON.stringify(originalAuthor))
        let themes = JSON.parse(JSON.stringify(originalThemes))
        let staticPages = JSON.parse(JSON.stringify(originalStaticPages))

        //Remove publishing related field from channel
        delete channel.contractAddress
        delete channel.localCid
        delete channel.localPubDate
        delete channel.pinJobId
        delete channel.pinJobStatus
        delete channel.publishedCid
        delete channel.pubDate
        delete channel.publishReaderRepoId
        delete channel.publishReaderRepoPath
        delete channel.publishReaderRepoStatus
        delete channel.importSuccess
        delete channel.lastUpdated
        delete channel._rev
        delete channel["_rev_tree"]

        //Remove publishing related fields from author
        if (author) {
            delete author._rev
            delete author.lastUpdated
            delete author["_rev_tree"]
        }

        //Assign  
        let imageCids:string[] = []
        let animationCids:string[] = []
        

        //Add cover image
        if (channel.coverImageId?.length > 0) {
            imageCids.push(channel.coverImageId)
        }

        //Add banner image
        if (channel.coverBannerId?.length > 0) {
            imageCids.push(channel.coverBannerId)
        }

        //Add author image
        if (author.coverPhotoId?.length > 0) {
            imageCids.push(author.coverPhotoId)
        }

        this.logPublishProgress(undefined, "Exporting items...")


        //Gather NFT data
        for (let item of items) {

            //Build animation URL if we have content
            if (item.animationId) {
                animationCids.push(item.animationId)
            }

            //Add cover image
            if (item.coverImageId?.length > 0) {
                imageCids.push(item.coverImageId)
            } 

            //Get images in post content
            if (item.content?.ops) {
                for (let op of item.content.ops) {
                    if (op.insert && op.insert.ipfsimage && op.insert.ipfsimage?.cid?.length > 0) {
                        imageCids.push(op.insert.ipfsimage.cid)
                    }
                }
            }

            //Delete publishing related fields
            delete item._rev
            delete item.lastUpdated
            delete item["_rev_tree"]

        }

        //Look up all the images
        imageCids = [...new Set(imageCids)] //deduplicate


        //Clean up themes
        for (let theme of themes) {

            delete theme._rev
            delete theme["_rev_tree"]
        }

        //Clean up staticPages
        for (let staticPage of staticPages) {

            delete staticPage._rev
            delete staticPage["_rev_tree"]
        }


        return {

            animations: animationCids,
            images: imageCids,

            channel: channel,
            items: items,
            author: author,
            themes: themes,
            staticPages: staticPages,

            ownerAddress: ownerAddress


        }

    }

    async exportToIPFS(exportBundle:ExportBundle): Promise<string> {

        let flush = true
        let directory = `/export/${exportBundle.channel._id}`

        try {
            //TODO: investigate leaving files in place that will still exist for optimization reasons
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true, flush: true})
        } catch (ex) { }

    
        /**
         * BACKUP FOR READER
        */
        let backup = await this.createBackup(
            exportBundle.channel, 
            exportBundle.items, 
            exportBundle.author, 
            exportBundle.themes,
            exportBundle.staticPages
        )

        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.images.length },
            animations: { saved: 0, total: exportBundle.animations.length },
        
            backups: {
                channels: { saved: 0, total: 1 },
                authors: { saved: 0, total: 1 }, 
                items: { saved: 0, total: backup.items.length },
                images: { saved: 0, total: exportBundle.images.length },
                animations: { saved: 0, total: exportBundle.animations.length },
                themes: { saved: 0, total: backup.themes.length },
                staticPages: { saved: 0, total: backup.staticPages.length }
            }
        }

        this.logPublishProgress(publishStatus)
        
        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(directory)
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true })
        } catch (ex) { }



        let images:Image[] = []

        //Save images 
        for (let imageCid of exportBundle.images) {

            //Fetch content
            let image = await this.imageService.get(imageCid)

            //Add to IPFS
            let content
            let filename = `${directory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            if (image.buffer) {
                content = image.buffer?.data ? image.buffer?.data : image.buffer //difference between browser and node buffer?
            } else if (image.svg) {
                content = image.svg
                console.log(new TextEncoder().encode(image.svg))
            }



            //Adding and then copying otherwise the CID does not match what we'd expect. 
            let result = await this.ipfsService.ipfs.add({
                content: content
            })

            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { create: true, parents: true, flush:flush })
    

            //Validate cid
            if (result.cid.toString() != image.cid) {    
                throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.cid.toString()}`)
            }


            publishStatus.images.saved++


            let clonedImage = JSON.parse( JSON.stringify(image) )

            //Remove publishing related field from image
            delete clonedImage._rev
            delete clonedImage["_rev_tree"]
            delete clonedImage.buffer
            delete clonedImage.svg

            images.push( clonedImage )

            this.logPublishProgress(publishStatus, `Saving image to ${filename} (${image.cid})`)

        }

        let animations:Animation[] = []

        //Save animation cids
        for (let animationCid of exportBundle.animations) {

            //Fetch content
            let animation = await this.animationService.get(animationCid)

            let filename = `${directory}/animations/${animation.cid}.html`

            //Add content
            let result = await this.ipfsService.ipfs.add({
                content: animation.content
            })

            if (result.cid.toString() !== animation.cid.toString()) {
                throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.cid.toString()}`)
            }

            //In theory there can be duplicates if any NFTs have identical content.
            let stat
            try {
                stat = await this.ipfsService.ipfs.files.stat(filename)
            } catch (ex) { }

            if (stat) {
                console.log(`${filename} already exists. Skipping.`)
            } else {
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { parents: true, flush: flush })
            }

            publishStatus.animations.saved++


            let clonedAnimation = JSON.parse( JSON.stringify(animation) )

            //Remove publishing related fields
            delete clonedAnimation._rev
            delete clonedAnimation["_rev_tree"]
            delete clonedAnimation.content

            animations.push( clonedAnimation )

            this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to ${directory}/animations/${animation.cid}.html (${animation.cid})`)


        }

        //Get directory cids
        let imageDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/images/`, {
            hash: true
        })

        let animationDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/animations/`, {
            hash: true
        })


        //Save metadata for each NFT
        for (let item of backup.items) {

            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nft = await this.itemService.exportNFTMetadata(exportBundle.channel, item, coverImage, animationDirectory.cid.toString(), imageDirectory.cid.toString())
            
            
            let nftMetadataPath = `${directory}/metadata/${nft.tokenId}.json`


            //Adding and then copying otherwise the CID does not match what we'd expect. 
            // let result = await this.ipfsService.ipfs.add({
            //     content: new TextEncoder().encode(JSON.stringify(nft))
            // })

            // await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, nftMetadataPath, { create: true, parents: true, flush:flush })
            await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true, flush:flush })




            let stat = await this.ipfsService.ipfs.files.stat(nftMetadataPath)

            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${nft.tokenId} to ${nftMetadataPath} (${stat.cid})`)

        }


        //Save contract metadata
        let contractMetadataPath = `${directory}/contractMetadata.json`
        let contractMetadata = await this.channelService.exportContractMetadata(
            exportBundle.channel, 
            exportBundle.channel.forkType == "existing" ? exportBundle.channel.forkedFromFeeRecipient : exportBundle.ownerAddress, 
            imageDirectory.cid.toString()
        )

        //Adding and then copying otherwise the CID does not match what we'd expect. 
        // let contractResult = await this.ipfsService.ipfs.add({
        //     content: new TextEncoder().encode(JSON.stringify(contractMetadata))
        // })

        // await this.ipfsService.ipfs.files.cp(`/ipfs/${contractResult.cid.toString()}`, contractMetadataPath, { create: true, parents: true, flush:flush })

        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush:flush })





        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath)
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`)



        //Write channels backup
        
        //If we're exporting an existing collection delete the "forkedBy" fields
        for (let channel of backup.channels) {
            if (channel.forkType == "existing") {
                delete channel.forkType
                delete channel.forkedFromCid
                delete channel.forkedFromFeeRecipient
                delete channel.forkedFromId
            }
        }

        await this.ipfsService.ipfs.files.write(`${directory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush })
        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)


        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush })
        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)

        //Write items backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/items.json`,  new TextEncoder().encode(JSON.stringify(backup.items)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.items.saved = backup.items.length
        this.logPublishProgress(publishStatus)

        //Write images backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(images)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.images.saved = images.length
        this.logPublishProgress(publishStatus)

        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(animations)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.animations.saved = animations.length
        this.logPublishProgress(publishStatus)

        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/themes.json`,  new TextEncoder().encode(JSON.stringify(backup.themes)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.themes.saved = backup.themes.length
        this.logPublishProgress(publishStatus)

        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/static-pages.json`,  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.staticPages.saved = backup.staticPages.length
        this.logPublishProgress(publishStatus)


        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

    }

    async createBackup(channel: Channel, items: Item[], author: Author, themes:Theme[], staticPages:StaticPage[]) {

        //Look up any data we need to add to the bundle


        //Generate bundles with extra info for each item
        for (let item of items) {

            let previous = items.filter( i => i.tokenId == parseInt(item.tokenId.toString()) -1)
            let next = items.filter( i => i.tokenId == parseInt(item.tokenId.toString()) + 1)

            //Add the previous and next items so they can used in navigation
            item['previous'] = previous?.length > 0 ? { 
                _id: previous[0]._id,
                tokenId: previous[0].tokenId
            }  : undefined

            item['next'] = next?.length > 0 ? { 
                _id: next[0]._id,
                tokenId: next[0].tokenId
            } : undefined


            //Remove the image src data from the content. Will restore from local copy when importing.
            //Reduce backup filesize

            if (item.content?.ops?.length > 0) {

                let ops = []

                for (let op of item.content.ops) {

                    if (op.insert && op.insert.ipfsimage) {
                        delete op.insert.ipfsimage.src
                    }

                    ops.push(op)
                }

                item.content.ops = ops

            }

        }

        //Add itemCount to channel
        channel['itemCount'] = items?.length

        //Save pouch dbs
        return {
            channels: [channel],
            authors: [author],
            items: items,
            themes: themes,
            staticPages: staticPages      
        }

    }

    async deployContract(channel: Channel) {

        if (!channel.localCid) {
            throw new Error("Not published to Pinata")
        }

        let count = await this.channelService.countItemsByChannel(channel._id)

        if (count <= 0) {
            throw new Error("No NFTs")
        }

        //Deploy contract
        let mintPriceWei = ethers.utils.parseUnits(channel.mintPrice, 'ether')        
        let receipt = await this.deploy(channel.title, channel.symbol, channel.localCid, mintPriceWei.toString(), count)

        //Update address locally
        channel.contractAddress = receipt.contractAddress
        await this.channelService.put(channel)

    }

    private async deploy(name: string, symbol: string, ipfsCid: string, mintFee: string, maxTokenId: number) {

        if (!name || !symbol || !mintFee || !maxTokenId || !ipfsCid) throw new Error("Missing inputs to deploy")

        let wallet = this.walletService.wallet
        if (!wallet) throw new Error("No wallet!")

        const c = this.contracts['Channel']

        const factory = new ethers.ContractFactory(c.abi, c.bytecode, wallet)
        
        let contract = await factory.deploy(
            name, 
            symbol, 
            ipfsCid, 
            BigNumber.from(mintFee.toString()), 
            BigNumber.from(maxTokenId.toString())
        )
        
        return contract.deployTransaction.wait()
    }

    private logPublishProgress(publishStatus:PublishStatus, message?: string) {

        if (message) {
            console.log(message)
        }
        

        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { 
                    publishStatus: publishStatus,
                    message: message 
                }
            })

            document.dispatchEvent(imageSelectedEvent)

        }

    }

}

export {
    PublishService
}