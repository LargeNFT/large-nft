import { BigNumber, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Author } from "../../dto/author"
import { Channel } from "../../dto/channel"
import { Animation } from "../../dto/animation"

import { ExportBundle } from "../../dto/export-bundle"
import { Item } from "../../dto/item"
import { Image } from "../../dto/image"

import { NFTMetadata } from "../../dto/nft-metadata"
import { PublishStatus } from "../../dto/viewmodel/publish-status"
import { ItemRepository } from "../../repository/item-repository"
import { AuthorService } from "../author-service"
import { ChannelService } from "../channel-service"
import { ImageService } from "../image-service"
import { ItemService } from "../item-service"

import { IpfsService } from "./ipfs-service"
import TYPES from "./types"
import { WalletService } from "./wallet-service"
import { AnimationService } from "../animation-service"

import Hash from 'ipfs-only-hash'
import { QuillService } from "../quill-service"


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private quillService:QuillService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async publishToIPFS(channel: Channel) {

        //Get all the items
        const items: Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)

        //Get author
        const author = await this.authorService.get(channel.authorId)

        //Export metadata
        let exportBundle:ExportBundle = await this.prepareExport(channel, items, author, this.walletService.address)
        let cid: string = await this.exportToIPFS(exportBundle)


        //Update local cid info
        Object.assign(channel, await this.channelService.get(channel._id))

        channel.localCid = cid
        channel.localPubDate = new Date().toJSON()

        await this.channelService.put(channel)

    }

    async prepareExport(originalChannel: Channel, originalItems: Item[], originalAuthor: Author, ownerAddress:string) : Promise<ExportBundle> {

        //Clone
        let channel = JSON.parse(JSON.stringify(originalChannel))
        let items = JSON.parse(JSON.stringify(originalItems))
        let author = JSON.parse(JSON.stringify(originalAuthor))

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
        delete channel.lastUpdated
        // delete channel.dateCreated
        delete channel._rev
        delete channel["_rev_tree"]

        //Remove publishing related fields from author
        if (author) {
            delete author._rev
            delete author.lastUpdated
            // delete author.dateCreated
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
            // delete item.dateCreated
            delete item["_rev_tree"]

        }

        //Look up all the images
        imageCids = [...new Set(imageCids)] //deduplicate

        let images = []

        for (let imageCid of imageCids) {   

            let image = await this.imageService.get(imageCid)

            //Remove publishing related field from image
            delete image._rev
            // delete image.dateCreated
            delete image["_rev_tree"]

            //Also remove content. Will refetch when needed.
            delete image.buffer
            delete image.svg

            images.push(image)

        }



        //Look up all the animations
        let animations = []
        for (let animationCid of animationCids) {

            let animation = await this.animationService.get(animationCid)

            //Remove publishing related field from image
            delete animation._rev
            // delete image.dateCreated
            delete animation["_rev_tree"]

            delete animation.content

            animations.push(animation)
        }


        return {

            animations: animations,
            images: images,

            channel: channel,
            items: items,
            author: author,

            contractMetadata: await this.channelService.exportContractMetadata(channel, ownerAddress)

        }

    }

    async exportToIPFS(exportBundle:ExportBundle): Promise<string> {

        let flush = true
        let directory = `/export/${exportBundle.channel._id}`


        try {
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true, flush: true})
        } catch (ex) { }


        


        /**
         * BACKUP FOR READER
        */
        // let backupPath = `${directory}/backup`
        let backup = await this.createBackup(exportBundle.channel, exportBundle.items, exportBundle.author, exportBundle.images, exportBundle.animations)

        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.images.length },
            animations: { saved: 0, total: exportBundle.animations.length },
        
            backups: {
                channels: { saved: 0, total: 1 },
                authors: { saved: 0, total: 1 }, 
                items: { saved: 0, total: backup.items.length },
                images: { saved: 0, total: backup.images.length },
                animations: { saved: 0, total: backup.animations.length }
            }
        }

        this.logPublishProgress(publishStatus)
        
        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(directory)
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true })
        } catch (ex) { }




        //Save contract metadata
        let contractMetadataPath = `${directory}/contractMetadata.json`
        
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(exportBundle.contractMetadata)), { create: true, parents: true, flush:flush })
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath}`)


        //Save images 
        for (let image of exportBundle.images) {

            //Fetch content
            image = await this.imageService.get(image._id)

            //Add to IPFS
            let content
            let filename = `${directory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            if (image.buffer) {
                content = image.buffer?.data ? image.buffer?.data : image.buffer //difference between browser and node buffer?
            } else if (image.svg) {
                content = image.svg
            }

            let result = await this.ipfsService.ipfs.add({
                content: content
            })

            await this.ipfsService.ipfs.files.cp(`/ipfs/${image.cid}`, filename, { create: true, parents: true, flush:flush })

            //Validate cid
            if (result.cid.toString() != image.cid) {
                throw new Error("Incorrect cid when saving image. ")
            }

            publishStatus.images.saved++

            this.logPublishProgress(publishStatus, `Saving image #${image.cid} to ${filename}`)

        }

        //Save animation cids
        for (let animation of exportBundle.animations) {

            //Fetch content
            animation = await this.animationService.get(animation._id)

            let filename = `${directory}/animations/${animation.cid}.html`

            //Add content
            let result = await this.ipfsService.ipfs.add({
                content: animation.content
            })

            let animationCid = result.cid.toString()

            if (animationCid !== animation.cid.toString()) {
                throw new Error('CIDs did not match')
            }

            //In theory there can be duplicates if any NFTs have identical content.
            let stat
            try {
                stat = await this.ipfsService.ipfs.files.stat(filename)
            } catch (ex) { }

            if (stat) {
                console.log(`${filename} already exists. Skipping.`)
            } else {
                await this.ipfsService.ipfs.files.cp(`/ipfs/${animationCid}`, filename, { parents: true, flush: flush })
            }


            publishStatus.animations.saved++

            this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} ${animation.cid} to ${directory}/animations/${animation.cid}.html`)


        }

        //Save metadata for each NFT
        for (let item of backup.items) {

            let imageDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/images/`, {
                hash: true
            })

            let animationDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/animations/`, {
                hash: true
            })

            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nft = await this.itemService.exportNFTMetadata(exportBundle.channel, item, coverImage, animationDirectory.cid.toString(), imageDirectory.cid.toString())
            
            
            let nftMetadataPath = `${directory}/metadata/${nft.tokenId}.json`

            await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true, flush:flush })

            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${nft.tokenId} to ${nftMetadataPath}`)

        }





        //Write channels backup
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
        await this.ipfsService.ipfs.files.write(`${directory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(backup.images)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.images.saved = backup.images.length
        this.logPublishProgress(publishStatus)

        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(backup.animations)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.animations.saved = backup.animations.length
        this.logPublishProgress(publishStatus)


        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

    }

    async createBackup(channel: Channel, items: Item[], author: Author, images:Image[], animations:Animation[]) {

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


        //Remove the actual image data from the images
        let backupImages:Image[] = JSON.parse(JSON.stringify(images))

        for (let image of backupImages) {
            delete image.svg
            delete image.buffer
        }

        //And the animations
        // let backupAnimations:Animation[] = JSON.parse(JSON.stringify(animations))
        // for (let animation of backupAnimations) {
        //     delete animation.content
        // }


        //Save pouch dbs
        return {
            channels: [channel],
            authors: [author],
            items: items,
            images: backupImages,
            animations: animations      
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
        
        let contract = await factory.deploy(name, symbol, ipfsCid, BigNumber.from(mintFee.toString()), BigNumber.from(maxTokenId.toString()))

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