import { injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel"
import { Item } from "../dto/item"

import { DatabaseService } from "./core/database-service"
import { ValidationException } from "../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import { QuillService } from "./quill-service";
import { ContractMetadata } from "../dto/contract-metadata";
import { ImageService } from "./image-service";
import { Image } from "../dto/image";
import { NFTMetadata } from "../dto/nft-metadata";
import { ItemService } from "./item-service";
import { IpfsService } from "./core/ipfs-service";

@injectable()
class ChannelService {

  db:any

  constructor(
    private databaseService:DatabaseService,
    private imageService:ImageService,
    private itemService:ItemService,
    private ipfsService:IpfsService,
    private quillService:QuillService
  ) { }

  async load(walletAddress:string) {

    this.db = await this.databaseService.getDatabase(walletAddress, "channel", async (db) => {

      //Create indexes
      await db.createIndex({index: { fields: ['dateCreated']}})
      await db.createIndex({index: { fields: ['lastUpdated']}})

    })

  }

  async get(_id:string): Promise<Channel> {
    return Object.assign(new Channel(), await this.db.get(_id))
  }

  async put(channel: Channel) {
    
    if (!channel._id) {
      channel._id = uuidv4()
      channel.dateCreated = new Date().toJSON()
    } else {
      channel.lastUpdated = new Date().toJSON()
    }

    //Translate description content
    channel.descriptionHTML = await this.quillService.translateContent(channel.description)
    
    //Validate
    let errors:ValidationError[] = await validate(channel, {
      forbidUnknownValues: true,
      whitelist: true
    })
    
    if (errors.length > 0) {
      throw new ValidationException(errors)
    }
    
    await this.db.put(channel)

  }

  async list(limit: number, skip:number): Promise<Channel[]> {

    let response = await this.db.find({
      selector: { "dateCreated": { $exists: true } },
      sort: [{ 'dateCreated': 'desc'}],
      limit: limit,
      skip: skip
    })

    return response.docs

  }

  async delete(channel:Channel): Promise<void> {
    await this.db.remove(channel)
  }

  async exportNFTMetadata(channel:Channel) : Promise<string> {

    //Write contract metadata
    let contractMetadata:ContractMetadata = await this.exportContractMetadata(channel)
    

    //Assign  
    let nftMetadata:NFTMetadata[] = []

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

      //Generate metadata and add to list
      nftMetadata.push(await this.itemService.exportNFTMetadata(item))

      tokenId++
    }

    //Save contract metadata
    let contractMetadataPath = `/blogs/${channel._id}/contractMetadata.json`
    
    console.log(`Saving contract metadata to ${contractMetadataPath}`)

    await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true})

    //Save metadata for each NFT
    for (let nft of nftMetadata) {
      let nftMetadataPath = `/blogs/${channel._id}/${nft.tokenId}.json`

      console.log(`Saving #${nft.tokenId} to ${nftMetadataPath}`)
      await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true})

    }

    let result = await this.ipfsService.ipfs.files.stat(`/blogs/${channel._id}/`, {
      hash: true
    })

    return result.cid.toString()

  }


  async exportContractMetadata(channel:Channel) : Promise<ContractMetadata> {


    let result:ContractMetadata = {
      name: channel.title,
      description: channel.descriptionHTML,
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

    //Generate token IDs starting at 1. 

    //Set published date for all items

    //Save them.



  }
  async importFromIPFS(cid:string) {}

}


export {
  ChannelService
}
