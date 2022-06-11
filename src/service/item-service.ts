import { injectable } from "inversify";
import { Item } from "../dto/item";

import { NFTMetadata } from "../dto/nft-metadata";
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ItemRepository } from "../repository/item-repository";

import { Channel } from "../dto/channel";
import { ImageService } from "./image-service";

import excerptHtml from 'excerpt-html'
import { Image } from "../dto/image";

@injectable()
class ItemService {

    constructor(
        private itemRepository: ItemRepository,
        private imageService:ImageService
    ) { }

    async get(_id: string): Promise<Item> {
        return this.itemRepository.get(_id)
    }

    async getByTokenId(channelId: string, tokenId:string) : Promise<Item> {
        return this.itemRepository.getByTokenId(channelId, tokenId)
    }


    async put(item: Item) {

        if (!item._id) {
            
            item._id = uuidv4()
            item.dateCreated = new Date().toJSON()

            //Get next token ID
            item.tokenId = await this.itemRepository.getMaxTokenId(item.channelId) + 1

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

    async countByChannel(channelId:string) : Promise<number> {
        return this.itemRepository.countByChannel(channelId)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {
        return this.itemRepository.listByChannel(channelId, limit, skip)
    }

    async getMaxTokenId(channelId:string) : Promise<number> {
        return this.itemRepository.getMaxTokenId(channelId)
    }

    async getNext(item:Item) : Promise<Item> {
        return this.itemRepository.getNext(item)
    }

    async getPrevious(item:Item) : Promise<Item> {
        return this.itemRepository.getPrevious(item)
    }

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
                    traitType: ao.traitType,
                    value: selections?.length > 0 ? selections[0].value : '' 
                }

            })
        }

        return result

    }

    

    async setDefaultCoverImage(item:Item) {

        let generated = await this.imageService.newFromText(excerptHtml(item.contentHTML, {
            pruneLength: 500
        }))

        //Save it if it doesn't exist
        let existing = await this.get(generated.cid)

        if (existing) {

            item.coverImageId = existing._id

        } else {

            await this.imageService.put(generated)
            item.coverImageId = generated._id
            
        }
    }


}

export {
    ItemService
}