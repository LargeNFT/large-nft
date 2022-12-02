import { inject, injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel.js"
import { Item } from "../dto/item.js"

import { ValidationException } from "../util/validation-exception.js";
import { v4 as uuidv4 } from 'uuid';

import { ContractMetadata } from "../dto/contract-metadata.js";
import { ImageService } from "./image-service.js";
import { Image } from "../dto/image.js";
import { ItemService } from "./item-service.js";

import { ChannelRepository } from "../repository/channel-repository.js";

import { PinningService } from "./core/pinning-service.js";
import { PinningApi } from "../dto/pinning-api.js";
import { QuillService } from "./quill-service.js";
import { Theme } from "../dto/theme.js";
import { ThemeService } from "./theme-service.js";
import { StaticPageService } from "./static-page-service.js";
import { StaticPage } from "../dto/static-page.js";
import { QueryCacheService } from "./core/query-cache-service.js";
import { QueryCache } from "../dto/query-cache.js";
import { AttributeCount } from "../dto/attribute.js";
import { AttributeCountService } from "./attribute-count-service.js";

@injectable()
class ChannelService {

  constructor(
    private channelRepository:ChannelRepository,
    private imageService:ImageService,
    private itemService:ItemService,
    private pinningService:PinningService,
    private quillService:QuillService,
    private themeService:ThemeService,
    private staticPageService:StaticPageService,
    private queryCacheService:QueryCacheService,
    private attributeCountService:AttributeCountService

  ) { }

  async get(_id:string): Promise<Channel> {
    return this.channelRepository.get(_id)
  }

  async getLatestRevision(_id:string) : Promise<Channel> {
    return this.channelRepository.getLatestRevision(_id)
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



    //Delete themes
    let themes:Theme[] = await this.themeService.listByChannel(channel._id, 100000, 0)

    for (let theme of themes) {
      await this.themeService.delete(theme)
    }

    //Delete static pages
    let staticPages:StaticPage[] = await this.staticPageService.listByChannel(channel._id, 100000, 0)

    for (let staticPage of staticPages) {
      await this.staticPageService.delete(staticPage)
    }

    //

    //Leave images and animations because they might be used by multiple projects. Maybe not ideal. 




  }

  async countItemsByChannel(channelId:string) : Promise<number> {

    let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channelId}`)
    let tokenIdStats = queryCache?.result
    
    return tokenIdStats?.count ? tokenIdStats.count : 0
  }

  async exportContractMetadata(channel:Channel, ownerAddress:string, imageDirectoryCid:string) : Promise<ContractMetadata> {

    let result:ContractMetadata = {
      name: channel.title,
      description: channel.descriptionMarkdown,
      external_link: channel.link,
      seller_fee_basis_points: 0, //channel.sellerFeeBasisPoints, //TODO: Setting this to anything other than zero ruins OpenSea. Investigate.
      fee_recipient:ownerAddress,
      license: channel.license
    }

    if (channel.coverImageId) {
      let coverImage:Image = await this.imageService.get(channel.coverImageId)
      result.image = `ipfs://${imageDirectoryCid}/${coverImage.cid}.${coverImage.buffer ? 'jpg' : 'svg'}`
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


  async buildAttributeCounts(channelId:string) {

    let attributeCounts:AttributeCount[] = await this.itemService.getAttributeCountByChannel(channelId)

    for (let at of attributeCounts) {
      await this.attributeCountService.put(Object.assign(new AttributeCount(), at))
    }


  }


}


export {
  ChannelService
}
