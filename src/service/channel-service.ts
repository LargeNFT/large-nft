import { inject, injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel"
import { Item } from "../dto/item"

import { ValidationException } from "../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import { ContractMetadata } from "../dto/contract-metadata";
import { ImageService } from "./image-service";
import { Image } from "../dto/image";
import { ItemService } from "./item-service";

import { ChannelRepository } from "../repository/channel-repository";

import { PinningService } from "./core/pinning-service";
import { PinningApi } from "../dto/pinning-api";
import { QuillService } from "./quill-service";


@injectable()
class ChannelService {

  constructor(
    private channelRepository:ChannelRepository,
    private imageService:ImageService,
    private itemService:ItemService,
    private pinningService:PinningService,
    private quillService:QuillService,

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

    if (channel.license) {

      //Translate description content
      channel.licenseHTML = await this.quillService.translateContent(channel.license)

      //Generate markdown
      channel.licenseMarkdown = await this.quillService.generateMarkdown(channel.license)

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

  async exportContractMetadata(channel:Channel, ownerAddress:string) : Promise<ContractMetadata> {


    let result:ContractMetadata = {
      name: channel.title,
      description: channel.descriptionMarkdown,
      external_link: channel.link,
      seller_fee_basis_points: channel.sellerFeeBasisPoints,
      fee_recipient: ownerAddress,
      license: channel.license
    }

    if (channel.coverImageId) {
      let coverImage:Image = await this.imageService.get(channel.coverImageId)
      result.image = `ipfs://${coverImage.cid}`
    }

    return result

  }

  async pin(pinningApi:PinningApi, channel:Channel) {

    let result = await this.pinningService.pinByHash(pinningApi, channel)
    if (!result.ipfsHash) throw new Error("Problem publishing")

    //Get the ID of the Pinata deploy job and update the channel
    channel = await this.get(channel._id)
    channel.pinJobId = result.id 
    channel.pinJobStatus = result.status 
    channel.publishedCid = result.ipfsHash

    await this.put(channel)
  }


}


export {
  ChannelService
}
