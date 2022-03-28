import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Image } from "../../dto/image";
import { Item } from "../../dto/item";

import { ItemViewModel } from "../../dto/viewmodel/item-view-model";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";

@injectable()
class ItemWebService {

    constructor(
        private itemService:ItemService,
        private channelService:ChannelService,
        private imageService:ImageService,
        private authorService:AuthorService
    ) {}

    async get(_id:string) : Promise<ItemViewModel> {
        return this.getViewModel(await this.itemService.get(_id))
    }

    async getViewModel(item:Item) : Promise<ItemViewModel> {

        let coverImage:Image

        let author:Author

        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId)
        }
        

        return {
            item: item,
            channel: await this.channelService.get(item.channelId),
            coverImage: coverImage,
            author: author
        }

    }

    async listByChannel(channelId:string, limit: number, skip:number): Promise<ItemViewModel[]> {

        let result:ItemViewModel[] = []
        
        let items:Item[] = await this.itemService.listByChannel(channelId, limit, skip)
        
        for (let item of items) {
            result.push(await this.getViewModel(item))
        }

        return result
    
      }

}

export {
    ItemWebService
}