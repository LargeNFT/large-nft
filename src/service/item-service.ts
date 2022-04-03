import { injectable } from "inversify";
import { Item } from "../dto/item";

import { NFTMetadata } from "../dto/nft-metadata";
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { QuillService } from "./quill-service";
import { IpfsService } from "./core/ipfs-service";
import { ItemRepository } from "../repository/item-repository";

import excerptHtml from 'excerpt-html'
import { Channel } from "../dto/channel";


@injectable()
class ItemService {

    constructor(
        private itemRepository: ItemRepository,
        private quillService:QuillService,
        private ipfsService:IpfsService,
    ) { }

    async get(_id: string): Promise<Item> {
        return this.itemRepository.get(_id)
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

        //Generate excerpt
        if (item.contentHTML?.length > 0) {
            item.excerpt = excerptHtml(item.contentHTML, {
                pruneLength: 500
            })
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

    async exportNFTMetadata(channel:Channel, item:Item, animationCid:string, coverImageCid:string): Promise<NFTMetadata> {

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

        // if (item.attributeSelections?.length > 0) {

        //     //TODO: Remove attributes that are not listed as part of the category any more.
        //     result.attributes = item.attributeSelections?.map(as => {
        //         return {
        //             traitType: as.traitType,
        //             value: as.value,
        //             id: as.id
        //         }
        //     })
        // }

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