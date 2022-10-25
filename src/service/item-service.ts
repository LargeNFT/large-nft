import { injectable } from "inversify";
import { Item } from "../dto/item";

import { NFTMetadata } from "../dto/nft-metadata";
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { AttributeInfo, ItemRepository } from "../repository/item-repository";

import { Channel } from "../dto/channel";
import { ImageService } from "./image-service";

import excerptHtml from 'excerpt-html'
import { Image } from "../dto/image";
import { QuillService } from "./quill-service";
import { AggregateStats } from "../dto/aggregate-stats";

@injectable()
class ItemService {

    constructor(
        private itemRepository: ItemRepository,
        private imageService:ImageService,
        private quillService:QuillService
    ) { }

    async get(_id: string): Promise<Item> {
        return this.itemRepository.get(_id)
    }

    async getLatestRevision(_id:string) : Promise<Item> {
        return this.itemRepository.getLatestRevision(_id)
    }

    async getByTokenId(channelId: string, tokenId:number) : Promise<Item> {
        return this.itemRepository.getByTokenId(channelId, tokenId)
    }


    async put(item: Item) {

        if (!item._id) {
            
            item._id = uuidv4()
            item.dateCreated = new Date().toJSON()

            //Get next token ID
            if (item.tokenId == undefined) {
                item.tokenId = await this.getNextTokenId(item.channelId)
            }

        } else {
            item.lastUpdated = new Date().toJSON()
        }

        //Validate
        let errors: ValidationError[] = await validate(item, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        await this.itemRepository.put(item)
    }

    async delete(item:Item): Promise<void> {
        await this.itemRepository.delete(item)
    }



    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {
        return this.itemRepository.listByChannel(channelId, limit, skip)
    }

    async getTokenIdStatsByChannel(channelId:string) : Promise<AggregateStats> {
        return this.itemRepository.getTokenIdStatsByChannel(channelId)
    }

    // async getNext(item:Item) : Promise<Item> {
    //     return this.itemRepository.getNext(item)
    // }

    // async getPrevious(item:Item) : Promise<Item> {
    //     return this.itemRepository.getPrevious(item)
    // }

    async exportNFTMetadata(channel:Channel, item:Item, coverImage:Image, animationDirectoryCid:string, imageDirectoryCid:string): Promise<NFTMetadata> {

        let result: NFTMetadata = {
            tokenId: item.tokenId,
            name: item.title,
            description: item.description,
            
        }

        if (item.animationId) {
            result.animation_url = `ipfs://${animationDirectoryCid}/${item.animationId}.html`
        }

        if (item.coverImageId) {
            result.image = `ipfs://${imageDirectoryCid}/${coverImage.cid}.${coverImage.buffer ? 'jpg' : 'svg'}`
        }

        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {

            result.attributes = channel.attributeOptions.map( ao => {

                //find the one selected by this item
                let selections = item?.attributeSelections?.filter( as => ao.traitType == as.traitType)

                return {
                    trait_type: ao.traitType,
                    value: selections?.length > 0 ? selections[0].value : '' 
                }

            })
        }

        return result

    }

    

    async setDefaultCoverImage(item:Item) {

        let generated = await this.imageService.newFromItem(item)

        //Save it if it doesn't exist
        let existing = await this.get(generated.cid)

        if (existing) {

            item.coverImageId = existing._id

        } else {

            await this.imageService.put(generated)
            item.coverImageId = generated._id
            
        }
    }

    async getNextTokenId(channelId:string) {

        let tokenIdStats = await this.itemRepository.getTokenIdStatsByChannel(channelId)

        return tokenIdStats.max + 1
    }

    async getAttributeInfo(channelId:string, traitType:string, value:string) : Promise<AttributeInfo> {
        return this.itemRepository.getAttributeInfo(channelId, traitType, value)
       
    }
}

export {
    ItemService
}