import { injectable } from "inversify";
import { Item } from "../dto/item.js";

import { NFTMetadata } from "../dto/nft-metadata.js";
import { ValidationException } from "../util/validation-exception.js";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ItemRepository } from "../repository/item-repository.js";

import { Channel } from "../dto/channel.js";
import { ImageService } from "./image-service.js";

import { Image } from "../dto/image.js";
import { QueryCacheService } from "./core/query-cache-service.js";
import { QueryCache } from "../dto/query-cache.js";
import { AttributeCount, AttributeSelection } from "../dto/attribute.js";
import { OriginalMetadataService } from "./original-metadata-service.js";

@injectable()
class ItemService {

    constructor(
        private itemRepository: ItemRepository,
        private imageService:ImageService,
        private queryCacheService:QueryCacheService,
        private originalMetadataService:OriginalMetadataService
    ) { }

    async get(_id: string): Promise<Item> {
        return this.itemRepository.get(_id)
    }
    
    async getIds() : Promise<string[]> {
        return this.itemRepository.getIds()
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

    async getByImageId(imageId:string) : Promise<Item[]> {
        return this.itemRepository.getByImageId(imageId)
    }

    async getByAnimationId(animationId:string) : Promise<Item[]> {
        return this.itemRepository.getByAnimationId(animationId)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {
        return this.itemRepository.listByChannel(channelId, limit, skip)
    }

    async exportNFTMetadata(channel:Channel, item:Item, coverImage:Image): Promise<NFTMetadata> {

        //We are publishing an existing collection that we are not editing then export the original metadata
        if (channel.forkType == "existing") {
            
            console.log(`Exporting original metadata for token #${item.tokenId}`)

            let originalMetadata = await this.originalMetadataService.get(item.originalJSONMetadataId)
            return JSON.parse(originalMetadata.content)
        }



        let result: NFTMetadata = {
            tokenId: item.tokenId,
            name: item.title,
            description: item.description,
            
        }

        if (item.animationId && !item.coverImageAsAnimation) {
            result.animation_url = `ipfs://${item.animationId}`
        }

        if (item.coverImageId) {
            result.image = `ipfs://${coverImage.cid}`
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

        let queryCache:QueryCache

        try {
            queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channelId}`)

            let tokenIdStats = queryCache?.result
            return tokenIdStats?.max ? tokenIdStats.max + 1 : 1

        } catch(ex) {}

        //If we had problems just return 1
        return 1

    }

    async getAttributeCountByChannel(channelId:string) : Promise<AttributeCount[]> {
        return this.itemRepository.getAttributeCountByChannel(channelId)
    }

    async getAttributeInfoBySelections(channelId:string, attributeSelections:AttributeSelection[]) : Promise<AttributeCount[]> {
        return this.itemRepository.getAttributeInfoBySelections(channelId, attributeSelections)
    }


}

export {
    ItemService
}