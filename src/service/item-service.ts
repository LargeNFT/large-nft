import { injectable } from "inversify";
import { Item } from "../dto/item";
import { Image } from "../dto/image";

import { NFTMetadata } from "../dto/nft-metadata";
import { DatabaseService } from "./core/database-service";
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ImageService } from "./image-service";
import { QuillService } from "./quill-service";


@injectable()
class ItemService {

    db: any

    constructor(
        private databaseService: DatabaseService,
        private imageService: ImageService,
        private quillService:QuillService
    ) { }

    async load(walletAddress: string) {

        this.db = await this.databaseService.getDatabase(walletAddress, "item", async (db) => {

            await db.createIndex({
                index: {
                    fields: ['channelId']
                }
            })

            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            })

        })
    }

    async get(_id: string): Promise<Item> {
        return Object.assign(new Item(), await this.db.get(_id))
    }

    async put(item: Item) {

        if (!item._id) {
            item._id = uuidv4()
            item.dateCreated = new Date().toJSON()
        } else {
            item.lastUpdated = new Date().toJSON()
        }

        //Translate description content
        item.descriptionHTML = await this.quillService.translateContent(item.description)

        //Validate
        let errors: ValidationError[] = await validate(item, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            console.log(errors)
            throw new ValidationException(errors)
        }


        await this.db.put(item)
    }

    async delete(item:Item): Promise<void> {
        await this.db.remove(item)
      }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'desc' }],
            limit: limit,
            skip: skip
        })


        return response.docs

    }

    async exportNFTMetadata(item:Item): Promise<NFTMetadata> {

        let coverImage: Image

        let result: NFTMetadata = {
            tokenId: item.tokenId,
            name: item.title,
            description: item.descriptionHTML,
            animation_url: `ipfs://${item.description}`, //TODO
        }

        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId)
            result.image = `ipfs://${coverImage?.cid}`
        }

        if (item.attributeSelections?.length > 0) {
            result.attributes = item.attributeSelections?.map(as => {
                return {
                    traitType: as.traitType,
                    value: as.value
                }
            })
        }

        return result

    }

    async mint(_id: string) {

    }


}

export {
    ItemService
}