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

  async exportNFTMetadata(channel:Channel, items:Item[], ownerAddress:string) : Promise<string> {

    //Assign  
    let nftMetadata:NFTMetadata[] = []
    let animationCids:string[] = []

    let images:Image[] = await this.imageService.listByChannel(channel._id, 100000, 0)


    //Get contract metadata
    let contractMetadata:ContractMetadata = await this.exportContractMetadata(channel, ownerAddress)

    //Generate token IDs starting at 1. Save all the records
    let tokenId = 1
    for (let item of items) {

      //Look up by ID - Needs to have full document
      Object.assign(item, await this.itemService.get(item._id))

      //Set the tokenID
      item.tokenId = tokenId.toString()

      //Save it
      await this.itemService.put(item)

      //Build animation URL if we have content
      let animationCid 
      if (item.contentHTML) {
        animationCid = await this.itemService.buildAnimationPage(item)
        animationCids.push(animationCid)
      }

      //Generate metadata and add to list
      nftMetadata.push(await this.itemService.exportNFTMetadata(channel, item, animationCid, item.coverImageId))

      tokenId++
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

    }


    let directory = `/blogs/${channel._id}`

    //Clear 
    try {
      await this.ipfsService.ipfs.files.read(directory)
      await this.ipfsService.ipfs.files.rm(directory, { recursive: true})  
    } catch (ex) {}

    //Save contract metadata
    let contractMetadataPath = `${directory}/contractMetadata.json`
    
    console.log(`Saving contract metadata to ${contractMetadataPath}`)

    await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true})

    //Save metadata for each NFT
    for (let nft of nftMetadata) {
      let nftMetadataPath = `${directory}/${nft.tokenId}.json`

      console.log(`Saving #${nft.tokenId} to ${nftMetadataPath}`)
      await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true})

    }

    //Save images 
    for (let image of images) {
      console.log(`Saving image #${image._id} to ${directory}/images/${image._id}`)
      await this.ipfsService.ipfs.files.cp(`/ipfs/${image._id}`, `${directory}/images/${image._id}`, { parents: true })
    }

    //Save animation cids
    for (let animationCid of animationCids) {
      console.log(`Saving animation #${animationCid} to ${directory}/images/${animationCid}`)
      await this.ipfsService.ipfs.files.cp(`/ipfs/${animationCid}`, `${directory}/animations/${animationCid}`, { parents: true })
    }


    /**
     * BACKUP FOR READER
     */

    //Save pouch dbs
    console.log(`Starting backup`)
    let backupPath = `${directory}/backup`
    let backup = await this.schemaService.backup(channel._id)

    //Write initial page to file. Then iterage through rest of chunks.
    await this.ipfsService.ipfs.files.write(`${backupPath}/initial.json`, new TextEncoder().encode(JSON.stringify(backup.initial)), { create: true, parents: true})

    let counter=0
    for (let itemChunk of backup.itemChunks) {
      await this.ipfsService.ipfs.files.write(`${backupPath}/itemChunks/${counter++}.json`, new TextEncoder().encode(JSON.stringify(itemChunk)), { create: true, parents: true})
    }

    console.log(`Saving items to backup`)
    //Also write each row as a file so the reader can open it quickly 
    for (let item of items) {
      console.log(`Saving #${item.tokenId} to ${backupPath}/items/${item.tokenId}.json`)
      await this.ipfsService.ipfs.files.write(`${backupPath}/items/${item.tokenId}.json`, new TextEncoder().encode(JSON.stringify(item)), { create: true, parents: true})
    }

    console.log(`Saving images to backup`)
    //Write image backups.
    for (let image of images) {
      console.log(`Saving #${image._id} to ${backupPath}/images/${image._id}.json`)
      await this.ipfsService.ipfs.files.write(`${backupPath}/images/${image._id}.json`, new TextEncoder().encode(JSON.stringify(image)), { create: true, parents: true})
    }

    let result = await this.ipfsService.ipfs.files.stat(`/blogs/${channel._id}/`, {
      hash: true
    })

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
    let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)

    //Export metadata
    let cid:string = await this.exportNFTMetadata(channel, items, this.walletService.address)

    //Save to Pinata
    if (pinningApi) {
      let result = await this.pinningService.pinByHash(pinningApi, cid, channel.title)
      if (!result.ipfsHash) throw new Error("Problem publishing")

      //Get the ID of the Pinata deploy job and update the channel
      channel.pinJobId = result.id 
      channel.pinJobStatus = result.status 
      channel.publishedCid = result.ipfsHash

      await this.channelRepository.put(channel)

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


}


export {
  ChannelService
}
