import { inject, injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel"
import { Item } from "../dto/item"

import { ValidationException } from "../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import { ContractMetadata } from "../dto/contract-metadata";
import { ImageService } from "./image-service";
import { Image } from "../dto/image";
import { NFTMetadata } from "../dto/nft-metadata";
import { ItemService } from "./item-service";
import { IpfsService } from "./core/ipfs-service";

import { ChannelRepository } from "../repository/channel-repository";
import { SchemaService } from "./core/schema-service";
import { WalletService } from "./core/wallet-service";

import { ethers, BigNumber } from "ethers";


import TYPES from "./core/types";
import { PinningService } from "./core/pinning-service";
import { PinningApi } from "../dto/pinning-api";
import { QuillService } from "./quill-service";
import { AuthorService } from "./author-service";
import { Author } from "../dto/author";


@injectable()
class ChannelService {

  constructor(
    private channelRepository:ChannelRepository,
    private imageService:ImageService,
    private itemService:ItemService,
    private ipfsService:IpfsService,
    private schemaService:SchemaService,
    private pinningService:PinningService,
    private quillService:QuillService,
    private authorService:AuthorService,
    @inject(TYPES.WalletService) private walletService:WalletService,

    @inject("contracts") private contracts,

  ) { }

  async get(_id:string): Promise<Channel> {
    return this.channelRepository.get(_id)
  }

  async put(channel: Channel) {
    
    if (!channel._id) {
      channel._id = uuidv4()
      channel.dateCreated = new Date().toJSON()
    } else {
      channel.lastUpdated = new Date().toJSON()
    }
    
    if (channel.description) {
      //Translate description content
      channel.descriptionHTML = await this.quillService.translateContent(channel.description)

      //Generate markdown
      channel.descriptionMarkdown = await this.quillService.generateMarkdown(channel.description)
    }


    //Validate
    let errors:ValidationError[] = await validate(channel, {
      forbidUnknownValues: true,
      whitelist: true
    })
    
    if (errors.length > 0) {
      throw new ValidationException(errors)
    }
    
    await this.channelRepository.put(channel)

  }

  async list(limit: number, skip:number): Promise<Channel[]> {
    
    return this.channelRepository.list(limit, skip)

  }

  async delete(channel:Channel): Promise<void> {

    await this.channelRepository.delete(channel)

    //Get all the items
    let items:Item[] =await this.itemService.listByChannel(channel._id, 100000, 0)

    for (let item of items) {
      await this.itemService.delete(item)
    }


  }

  async countItemsByChannel(channelId:string) : Promise<number> {
    return this.itemService.countByChannel(channelId)
  }

  async exportNFTMetadata(channel:Channel, items:Item[], author:Author, ownerAddress:string) : Promise<string> {

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
    let nftMetadata:NFTMetadata[] = []

    let animations:string[] = []

    let imageCids:string[] = []

    //Get contract metadata
    let contractMetadata:ContractMetadata = await this.exportContractMetadata(channel, ownerAddress)

    //Add cover image
    if (channel.coverImageId?.length > 0) {
      imageCids.push(channel.coverImageId)
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

    let images= []

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
      await this.ipfsService.ipfs.files.rm(directory, { recursive: true})  
    } catch (ex) {}

    //Save contract metadata
    let contractMetadataPath = `${directory}/contractMetadata.json`
    
    this.logPublishProgress(`Saving contract metadata to ${contractMetadataPath}`)

    await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true})

    //Save metadata for each NFT
    for (let nft of nftMetadata) {

      let nftMetadataPath = `${directory}/${nft.tokenId}.json`

      this.logPublishProgress(`Saving #${nft.tokenId} to ${nftMetadataPath}`)
      await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true})

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
    let backup = await this.schemaService.backup(channel, items, author)



    //Write initial page to file. Then iterate through rest of chunks.
    await this.ipfsService.ipfs.files.write(`${backupPath}/initial.json`, new TextEncoder().encode(JSON.stringify(backup.initial)), { create: true, parents: true})

    let counter=0
    for (let itemChunk of backup.itemChunks) {
      await this.ipfsService.ipfs.files.write(`${backupPath}/itemChunks/${counter++}.json`, new TextEncoder().encode(JSON.stringify(itemChunk)), { create: true, parents: true})
    }

    this.logPublishProgress(`Saving items to backup`)
    //Also write each row as a file so the reader can open it quickly 
    for (let item of items) {
      this.logPublishProgress(`Saving #${item.tokenId} to ${backupPath}/items/${item.tokenId}.json`)
      await this.ipfsService.ipfs.files.write(`${backupPath}/items/${item.tokenId}.json`, new TextEncoder().encode(JSON.stringify(item, Object.keys(item).sort())), { create: true, parents: true})
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

  async exportContractMetadata(channel:Channel, ownerAddress:string) : Promise<ContractMetadata> {


    let result:ContractMetadata = {
      name: channel.title,
      description: channel.descriptionMarkdown,
      external_link: channel.link,
      seller_fee_basis_points: channel.sellerFeeBasisPoints,
      fee_recipient: ownerAddress
    }

    if (channel.coverImageId) {
      let coverImage:Image = await this.imageService.get(channel.coverImageId)
      result.image = `ipfs://${coverImage.cid}`
    }

    return result

  }

  async publish(channel:Channel, items:Item[], pinningApi:PinningApi, cid:string) { 

    //Save to Pinata
    if (pinningApi) {
      let result = await this.pinningService.pinByHash(pinningApi, cid, channel.title)
      if (!result.ipfsHash) throw new Error("Problem publishing")
    }

    //Deploy contract
    let receipt = await this.deploy(channel.title, channel.symbol, cid, channel.mintPrice, items.length)

    return receipt.contractAddress

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
      channel = await this.get(channel._id)
      channel.pinJobId = result.id 
      channel.pinJobStatus = result.status 
      channel.publishedCid = result.ipfsHash

      await this.put(channel)

    }

  }

  async deployContract(channel:Channel) {

    if (!channel.publishedCid) {
      throw new Error("Not published to Pinata")
    }

    let count = await this.countItemsByChannel(channel._id)

    if (count <= 0) {
      throw new Error("No NFTs")
    }

    //Deploy contract
    let mintPriceWei = ethers.utils.parseUnits(channel.mintPrice, 'ether')
    let receipt = await this.deploy(channel.title, channel.symbol, channel.publishedCid, mintPriceWei.toString(), count)

    //Update address locally
    channel.contractAddress = receipt.contractAddress
    await this.put(channel)

  }

  async importFromIPFS(cid:string) {}

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
  ChannelService
}
