import { injectable } from "inversify";
import { Author } from "../../dto/author";
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
        return this.getViewModel(await this.itemService.get(_id))
    }

    async getViewModel(item: Item): Promise<ItemViewModel> {

        let coverImage: ImageViewModel

        let author: Author

        if (item.coverImageId) {

            let image:Image = await this.imageService.get(item.coverImageId)
            
            coverImage = {
                cid: image.cid,
                url: await this.imageService.getUrl(image)
            }
        }


        return {
            item: item,
            channel: await this.channelService.get(item.channelId),
            coverImage: coverImage,
            author: author,
            images: this.getImagesFromPostContentOps(item.content?.ops)
        }

    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<ItemViewModel[]> {

        let result: ItemViewModel[] = []

        let items: Item[] = await this.itemService.listByChannel(channelId, limit, skip)

        for (let item of items) {
            result.push(await this.getViewModel(item))
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


}

export {
    ItemWebService
}