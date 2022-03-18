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
import { IpfsService } from "./core/ipfs-service";


@injectable()
class ItemService {

    db: any

    constructor(
        private databaseService: DatabaseService,
        private imageService: ImageService,
        private quillService:QuillService,
        private ipfsService:IpfsService
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
        item.contentHTML = await this.quillService.translateContent(item.content)

        //Validate
        let errors: ValidationError[] = await validate(item, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
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
            sort: [{ 'dateCreated': 'asc' }],
            limit: limit,
            skip: skip
        })


        return response.docs

    }

    async exportNFTMetadata(item:Item, animationCid:string, coverImageCid:string): Promise<NFTMetadata> {

        let result: NFTMetadata = {
            tokenId: item.tokenId,
            name: item.title,
            description: item.description,
            
        }

        if (animationCid) {
            result.animation_url = `ipfs://${animationCid}`
        }

        if (item.coverImageId) {
            result.image = `ipfs://${coverImageCid}`
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


    public async buildAnimationPage(item:Item) : Promise<string> {

        let html = `
            <!DOCTYPE html>
            <html>
            
            <head>
                <meta charset="utf-8">
                <title>${item.title}></title>
            </head>

            <body style="margin: 0px;">
                <script type="module">
                    document.body.innerHTML = '
                        <main>
                            <div>
                                ${item.contentHTML}
                            </div>
                        </main>
                    '
                </script>
            </body>
            </html>
        `

        let result = await this.ipfsService.ipfs.add({
            content: html
        })

        return result.cid.toString()
    }

}

export {
    ItemService
}