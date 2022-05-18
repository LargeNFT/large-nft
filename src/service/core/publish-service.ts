import { BigNumber, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Author } from "../../dto/author"
import { Channel } from "../../dto/channel"
import { ContractMetadata } from "../../dto/contract-metadata"
import { ExportBundle } from "../../dto/export-bundle"
import { Item } from "../../dto/item"
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

@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async createBackup(channel: Channel, items: Item[], author: Author) {

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

        }

        //Add itemCount to channel
        channel['itemCount'] = items?.length


        //Split items into chunks
        const chunkedItems = []

        const chunkSize = ItemRepository.CHUNK_SIZE
        for (let i = 0; i < items.length; i += chunkSize) {
            chunkedItems.push(items.slice(i, i + chunkSize))
        }

        //Save pouch dbs
        return {
            channels: [channel],
            authors: [author],
            itemChunks: chunkedItems, 
            items: items      
        }

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
        let animations:string[] = []
        let nftMetadata:NFTMetadata[] = []

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
            let animationCid
            if (item.contentHTML) {
                animations.push(this.itemService.buildAnimationPage(item))
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

            //Generate metadata and add to list
            nftMetadata.push(await this.itemService.exportNFTMetadata(channel, item, animationCid, item.coverImageId))

        }

        //Look up all the images
        imageCids = [...new Set(imageCids)] //deduplicate

        let images = []

        for (let imageCid of imageCids) {
            images.push(await this.imageService.get(imageCid))
        }


        return {

            nftMetadata: nftMetadata,
            animations: animations,
            images: images,

            channel: channel,
            items: items,
            author: author,

            contractMetadata: await this.channelService.exportContractMetadata(channel, ownerAddress)

        }

    }

    async exportToIPFS(exportBundle:ExportBundle): Promise<string> {

        let directory = `/blogs/${exportBundle.channel._id}`

        /**
         * BACKUP FOR READER
        */
        let backupPath = `${directory}/backup`
        let backup = await this.createBackup(exportBundle.channel, exportBundle.items, exportBundle.author)

        let publishStatus:PublishStatus = {

            contractMetadata:false,
            
            nftMetadata: { saved: 0, total: exportBundle.nftMetadata.length },
            images: { saved: 0, total: exportBundle.images.length },
            animations: { saved: 0, total: exportBundle.animations.length },
        
            backups: {
                channels: false, 
                authors: false, 
                itemChunks: { saved: 0, total: backup.itemChunks.length },
                items: { saved: 0, total: backup.items.length },
                images: { saved: 0, total: exportBundle.images.length },
            }
        }

        this.logPublishProgress(publishStatus)

        //Add all images to IPFS
        for (let image of exportBundle.images) {

            //Add to IPFS
            let result = await this.ipfsService.ipfs.add({
                content: image.buffer?.data ? image.buffer?.data : image.buffer //difference between browser and node buffer?
            })

            if (result.cid.toString() != image.cid) {
                throw new Error("Incorrect cid when saving image. ")
            }

            //Remove publishing related field from image
            delete image._rev
            // delete image.dateCreated
            delete image["_rev_tree"]
        }


        

        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(directory)
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true })
        } catch (ex) { }



        //Save contract metadata
        let contractMetadataPath = `${directory}/contractMetadata.json`
        
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(exportBundle.contractMetadata)), { create: true, parents: true, flush:true })
        
        publishStatus.contractMetadata = true
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath}`)



        //Save metadata for each NFT
        for (let nft of exportBundle.nftMetadata) {

            let nftMetadataPath = `${directory}/${nft.tokenId}.json`

            await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true, flush:true })

            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${nft.tokenId} to ${nftMetadataPath}`)

        }



        //Save images 
        for (let image of exportBundle.images) {

            await this.ipfsService.ipfs.files.cp(`/ipfs/${image.cid}`, `${directory}/images/${image.cid}`, { parents: true, flush:true })

            publishStatus.images.saved++

            this.logPublishProgress(publishStatus, `Saving image #${image.cid} to ${directory}/images/${image.cid}`)

        }



        //Save animation cids
        for (let animation of exportBundle.animations) {

            let result = await this.ipfsService.ipfs.add({
                content: animation
            })

            let animationCid = result.cid.toString()


            //In theory there can be duplicates if any NFTs have identical content.
            let stat
            try {
                stat = await this.ipfsService.ipfs.files.stat(`${directory}/animations/${animationCid}`)
            } catch (ex) { }

            if (stat) {
                console.log(`${directory}/animations/${animationCid} already exists. Skipping.`)
            } else {
                await this.ipfsService.ipfs.files.cp(`/ipfs/${animationCid}`, `${directory}/animations/${animationCid}`, { parents: true, flush: true })
            }

            publishStatus.animations.saved++

            this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} ${animationCid} to ${directory}/animations/${animationCid}`)


        }




        //Write channels
        await this.ipfsService.ipfs.files.write(`${backupPath}/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: true })

        publishStatus.backups.channels = true
        this.logPublishProgress(publishStatus)


        //Write authors
        await this.ipfsService.ipfs.files.write(`${backupPath}/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: true })
        publishStatus.backups.authors = true
        this.logPublishProgress(publishStatus)


        //Write item chunks
        publishStatus.backups.itemChunks.total = backup.itemChunks.length
        for (let itemChunk of backup.itemChunks) {
            
            await this.ipfsService.ipfs.files.write(`${backupPath}/itemChunks/${publishStatus.backups.itemChunks.saved}.json`, new TextEncoder().encode(JSON.stringify(itemChunk)), { create: true, parents: true, flush: true })
        
            publishStatus.backups.itemChunks.saved++ 
            
            this.logPublishProgress(publishStatus)

        }

        //Also write each row as a file so the reader can open it quickly 
        for (let item of backup.items) {

            await this.ipfsService.ipfs.files.write(`${backupPath}/items/${item._id}.json`, new TextEncoder().encode(  JSON.stringify(item, Object.keys(item).sort() )  ), { create: true, parents: true, flush: true })
        
            publishStatus.backups.items.saved++

            this.logPublishProgress(publishStatus, `Saving #${item.tokenId} to ${backupPath}/items/${item._id}.json`)

        }



        //Write image backups.
        for (let image of exportBundle.images) {
            await this.ipfsService.ipfs.files.cp(`/ipfs/${image.cid}`, `${backupPath}/images/${image.cid}`, { parents: true, flush: true })

            publishStatus.backups.images.saved++

            this.logPublishProgress(publishStatus, `Saving #${image.cid} to ${backupPath}/images/${image.cid}.json`)
        }


        let result = await this.ipfsService.ipfs.files.stat(`/blogs/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

    }

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