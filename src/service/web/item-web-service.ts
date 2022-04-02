import { injectable } from "inversify";
import moment from "moment";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Image } from "../../dto/image";
import { Item } from "../../dto/item";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model";

import { ItemViewModel } from "../../dto/viewmodel/item-view-model";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";

@injectable()
class ItemWebService {

    constructor(
        private itemService: ItemService,
        private channelService: ChannelService,
        private imageService: ImageService,
        private authorService: AuthorService
    ) { }

    async get(_id: string): Promise<ItemViewModel> {

        let item:Item = await this.itemService.get(_id)

        //Get channel
        const channel:Channel = await this.channelService.get(item.channelId)

        return this.getViewModel(item, channel)
    }

    async getViewModel(item: Item, channel:Channel): Promise<ItemViewModel> {

        let coverImage: ImageViewModel
        let authorPhoto:ImageViewModel

        let author: Author

        if (item.coverImageId) {

            let image:Image = await this.imageService.get(item.coverImageId)
            
            coverImage = {
                cid: image.cid,
                url: await this.imageService.getUrl(image)
            }
        }

        //Get author
        if (channel.authorId) {
            
            author = await this.authorService.get(channel.authorId)

            //Load cover photo if there is one.
            if (author.coverPhotoId) {
                let aImage = await this.imageService.get(author.coverPhotoId)

                authorPhoto = {
                    cid: aImage.cid,
                    url: await this.imageService.getUrl(aImage)
                }
            }

        }

        return {
            item: item,
            dateDisplay: moment(item.dateCreated).format("MMM Do YYYY"),
            channel: channel,
            coverImage: coverImage,
            author: author,
            authorPhoto: authorPhoto,
            authorDisplayName: this.authorService.getDisplayName(author),
            images: this.getImagesFromPostContentOps(item.content?.ops)
        }

    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<ItemViewModel[]> {

        let result: ItemViewModel[] = []

        let items: Item[] = await this.itemService.listByChannel(channelId, limit, skip)

        //Get channel
        const channel:Channel = await this.channelService.get(channelId)

        for (let item of items) {
            result.push(await this.getViewModel(item, channel))
        }

        return result

    }

    getImagesFromPostContentOps(ops) : ImageViewModel[] {

        const images = []

        if (ops?.length > 0) {

            for (let op of ops) {
                if (op.insert && op.insert.ipfsimage) {
                    images.push({
                        cid: op.insert.ipfsimage.cid,
                        url: op.insert.ipfsimage.src
                    })
                }
            }

        }

        return images
    }

    async getNewViewModel(channelId:string) : Promise<ItemViewModel> {
        
        let channel = await this.channelService.get(channelId)

        let itemViewModel:ItemViewModel = {
            item: {
            },
            channel: channel
        }

        return itemViewModel

    }


}

export {
    ItemWebService
}