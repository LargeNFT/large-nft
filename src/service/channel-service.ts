import { injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel"
import { Item } from "../dto/item"

import { ValidationException } from "../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import { QuillService } from "./quill-service";
import { ContractMetadata } from "../dto/contract-metadata";
import { ImageService } from "./image-service";
import { Image } from "../dto/image";
import { NFTMetadata } from "../dto/nft-metadata";
import { ItemService } from "./item-service";
import { IpfsService } from "./core/ipfs-service";

import { ChannelRepository } from "../repository/channel-repository";
import { SchemaService } from "./core/schema-service";

@injectable()
class ChannelService {

  constructor(
    private channelRepository:ChannelRepository,
    private imageService:ImageService,
    private itemService:ItemService,
    private ipfsService:IpfsService,
    private quillService:QuillService,
    private schemaService:SchemaService
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

    //Translate content to HTML
    channel.contentHTML = await this.quillService.translateContent(channel.content)
    
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
  }

  async exportNFTMetadata(channel:Channel) : Promise<string> {

    //Assign  
    let nftMetadata:NFTMetadata[] = []
    let images:string[] = []
    let animationCids:string[] = []

    //Get contract metadata
    let contractMetadata:ContractMetadata = await this.exportContractMetadata(channel)

    //Add cover image
    images.push(channel.coverImageId)

    //Look up items
    let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)

    //Generate token IDs starting at 1. Save all the records
    let tokenId = 1
    for (let item of items) {

      //Look up by ID - Needs to have full document
      item = await this.itemService.get(item._id)

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
    
      //Add cover image
      if (item.coverImageId) {
        images.push(item.coverImageId)
      }

      //Get images in post content
      if (item.content?.ops) {
        for (let op of item.content.ops) {
          if (op.insert && op.insert.ipfsimage) {
            images.push(op.insert.ipfsimage.ipfsCid)
          }
        }
      }


      //Generate metadata and add to list
      nftMetadata.push(await this.itemService.exportNFTMetadata(item, animationCid, item.coverImageId))

      tokenId++
    }



    let directory = `/blogs/${channel._id}`

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
      await this.ipfsService.ipfs.files.cp(`/ipfs/${image}`, `${directory}/images/${image}`, { parents: true })
    }

    //Save animation cids
    for (let animationCid of animationCids) {
      await this.ipfsService.ipfs.files.cp(`/ipfs/${animationCid}`, `${directory}/animations/${animationCid}`, { parents: true })
    }

    //Save pouch dbs
    let backupPath = `${directory}/backup.json`
    let backup = await this.schemaService.backup(channel._id)
    await this.ipfsService.ipfs.files.write(backupPath, new TextEncoder().encode(JSON.stringify(backup)), { create: true, parents: true})


    let result = await this.ipfsService.ipfs.files.stat(`/blogs/${channel._id}/`, {
      hash: true
    })

    return result.cid.toString()

  }


  async exportContractMetadata(channel:Channel) : Promise<ContractMetadata> {


    let result:ContractMetadata = {
      name: channel.title,
      description: channel.description,
      external_link: channel.link,
      seller_fee_basis_points: channel.sellerFeeBasisPoints,
      fee_recipient: channel.feeRecipient
    }

    if (channel.coverImageId) {
      let coverImage:Image = await this.imageService.get(channel.coverImageId)
      result.image = `ipfs://${coverImage.cid}`
    }

    return result

  }




  async getJSONFeed(_id:string) {}
  async getRSSFeed(_id:string) : Promise<string> {return}
  async publish(_id:string) { 

    //Export contract metadata to IPFS

    //Save to Pinata

    //Deploy contract


  }
  async importFromIPFS(cid:string) {}

}


export {
  ChannelService
}
