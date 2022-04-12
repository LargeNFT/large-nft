import { BigNumber, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Author } from "../../dto/author"
import { Channel } from "../../dto/channel"
import { ContractMetadata } from "../../dto/contract-metadata"
import { Item } from "../../dto/item"
import { NFTMetadata } from "../../dto/nft-metadata"
import { PinningApi } from "../../dto/pinning-api"
import { ItemViewModel } from "../../dto/viewmodel/item-view-model"
import { AuthorService } from "../author-service"
import { ChannelService } from "../channel-service"
import { ImageService } from "../image-service"
import { ItemService } from "../item-service"
import { ChannelWebService } from "../web/channel-web-service"
import { ItemWebService } from "../web/item-web-service"
import { IpfsService } from "./ipfs-service"
import { PinningService } from "./pinning-service"
import TYPES from "./types"
import { WalletService } from "./wallet-service"

@injectable()
class PublishService {

    constructor(
        private itemWebService: ItemWebService,
        private channelWebService: ChannelWebService,
        private channelService:ChannelService,
        private itemService:ItemService,
        private authorService:AuthorService,
        private ipfsService:IpfsService,
        private imageService:ImageService,
        private pinningService:PinningService,
        @inject(TYPES.WalletService) private walletService:WalletService,
        @inject("contracts") private contracts,
    ) { }

    async createBackup(channel: Channel, items: Item[], author: Author) {

        const chunkedItems = []

        //Split items into chunks
        const chunkSize = 20
        for (let i = 0; i < items.length; i += chunkSize) {
            chunkedItems.push(items.slice(i, i + chunkSize))
        }

        //Save pouch dbs
        return {
            channels: [channel],
            authors: [author],
            itemChunks: chunkedItems //rest of items            
        }

    }

    async exportNFTMetadata(channel: Channel, items: Item[], author: Author, ownerAddress: string): Promise<string> {

        //Remove publishing related field from channel
        delete channel.pinJobId
        delete channel.pinJobStatus
        delete channel.publishedCid
        delete channel.pubDate
        delete channel.publishReaderRepoId
        delete channel.publishReaderRepoPath
        delete channel.publishReaderRepoStatus
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
        let nftMetadata: NFTMetadata[] = []

        let animations: string[] = []

        let imageCids: string[] = []

        //Get contract metadata
        let contractMetadata: ContractMetadata = await this.channelService.exportContractMetadata(channel, ownerAddress)

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


        //Add all images to IPFS
        for (let image of images) {

            //Add to IPFS
            let result = await this.ipfsService.ipfs.add({
                content: image.buffer?.data ? image.buffer?.data : image.buffer //difference between browser and node buffer?
            })

            if (result.cid.toString() != image.cid) {
                throw new Error("Incorrect cid when saving image. ")
            }

            //Remove publishing related field from image
            delete image._rev
            delete image.lastUpdated
            delete image["_rev_tree"]
        }


        let directory = `/blogs/${channel._id}`

        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(directory)
            await this.ipfsService.ipfs.files.rm(directory, { recursive: true })
        } catch (ex) { }

        //Save contract metadata
        let contractMetadataPath = `${directory}/contractMetadata.json`

        this.logPublishProgress(`Saving contract metadata to ${contractMetadataPath}`)

        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true })

        //Save metadata for each NFT
        for (let nft of nftMetadata) {

            let nftMetadataPath = `${directory}/${nft.tokenId}.json`

            this.logPublishProgress(`Saving #${nft.tokenId} to ${nftMetadataPath}`)
            await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true })

        }

        //Save images 
        for (let image of images) {
            this.logPublishProgress(`Saving image #${image.cid} to ${directory}/images/${image.cid}`)
            await this.ipfsService.ipfs.files.cp(`/ipfs/${image.cid}`, `${directory}/images/${image.cid}`, { parents: true })
        }

        //Save animation cids
        for (let animation of animations) {

            let result = await this.ipfsService.ipfs.add({
                content: animation
            })

            let animationCid = result.cid.toString()

            this.logPublishProgress(`Saving animation #${animationCid} to ${directory}/images/${animationCid}`)
            await this.ipfsService.ipfs.files.cp(`/ipfs/${animationCid}`, `${directory}/animations/${animationCid}`, { parents: true })
        }




        /**
         * BACKUP FOR READER
         */

        //Save pouch dbs
        this.logPublishProgress(`Starting backup`)
        let backupPath = `${directory}/backup`
        let backup = await this.createBackup(channel, items, author)



        //Write channels
        await this.ipfsService.ipfs.files.write(`${backupPath}/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true })

        //Write authors
        await this.ipfsService.ipfs.files.write(`${backupPath}/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true })


        let counter = 0
        for (let itemChunk of backup.itemChunks) {
            await this.ipfsService.ipfs.files.write(`${backupPath}/itemChunks/${counter++}.json`, new TextEncoder().encode(JSON.stringify(itemChunk)), { create: true, parents: true })
        }

        this.logPublishProgress(`Saving items to backup`)
        //Also write each row as a file so the reader can open it quickly 
        for (let item of [].concat.apply([], backup.itemChunks)) {
            console.log(item)
            this.logPublishProgress(`Saving #${item.tokenId} to ${backupPath}/items/${item.tokenId}.json`)
            await this.ipfsService.ipfs.files.write(`${backupPath}/items/${item.tokenId}.json`, new TextEncoder().encode(JSON.stringify(item, Object.keys(item).sort())), { create: true, parents: true })
        }

        this.logPublishProgress(`Saving images to backup`)
        //Write image backups.
        for (let image of images) {
            this.logPublishProgress(`Saving #${image.cid} to ${backupPath}/images/${image.cid}.json`)
            await this.ipfsService.ipfs.files.cp(`/ipfs/${image.cid}`, `${backupPath}/images/${image.cid}`, { parents: true })
        }

        let result = await this.ipfsService.ipfs.files.stat(`/blogs/${channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(`Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

    }


    async publishToIPFS(channel:Channel, pinningApi:PinningApi) {

        //Get all the items
        const items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)
    
        //Get author
        const author = await this.authorService.get(channel.authorId)
    
        let tokenId = 1
        for (let item of items) {
    
          //Set the tokenID
          item.tokenId = tokenId.toString()
    
          //Save it
          await this.itemService.put(Object.assign(new Item(), item))
    
          tokenId++
        }
    
    
        //Export metadata
        let cid:string = await this.exportNFTMetadata(channel, items, author, this.walletService.address)
    
        //Save to Pinata
        if (pinningApi) {
          let result = await this.pinningService.pinByHash(pinningApi, cid, channel.title)
          if (!result.ipfsHash) throw new Error("Problem publishing")
    
          //Get the ID of the Pinata deploy job and update the channel
          channel = await this.channelService.get(channel._id)
          channel.pinJobId = result.id 
          channel.pinJobStatus = result.status 
          channel.publishedCid = result.ipfsHash
    
          await this.channelService.put(channel)
    
        }
    
      }
    
      async deployContract(channel:Channel) {
    
        if (!channel.publishedCid) {
          throw new Error("Not published to Pinata")
        }
    
        let count = await this.channelService.countItemsByChannel(channel._id)
    
        if (count <= 0) {
          throw new Error("No NFTs")
        }
    
        //Deploy contract
        let mintPriceWei = ethers.utils.parseUnits(channel.mintPrice, 'ether')
        let receipt = await this.deploy(channel.title, channel.symbol, channel.publishedCid, mintPriceWei.toString(), count)
    
        //Update address locally
        channel.contractAddress = receipt.contractAddress
        await this.channelService.put(channel)
    
      }
    
      private async deploy(name:string, symbol:string, ipfsCid:string, mintFee:string, maxTokenId:number) {
    
        if (!name || !symbol || !mintFee || !maxTokenId || !ipfsCid) throw new Error("Missing inputs to deploy")
    
        let wallet = this.walletService.wallet
        if (!wallet) throw new Error("No wallet!")
    
        const c = this.contracts['Channel']
    
        const factory = new ethers.ContractFactory(c.abi, c.bytecode, wallet)
        
        let contract = await factory.deploy( name, symbol, ipfsCid, BigNumber.from(mintFee), BigNumber.from(maxTokenId)  )
      
        return contract.deployTransaction.wait()
      }
    
    
      private logPublishProgress(message:string) {
        
        console.log(message)
    
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
          // browser
          const imageSelectedEvent = new CustomEvent('publish-progress', {
            detail: { message: message }
          })
      
          document.dispatchEvent(imageSelectedEvent)
    
        }
    
      }
    




}

export {
    PublishService
}