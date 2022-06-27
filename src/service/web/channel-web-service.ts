import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Item } from "../../dto/item";
import { Theme } from "../../dto/theme";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model";
import { ItemViewModel } from "../../dto/viewmodel/item-view-model";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";
import { QuillService } from "../quill-service";
import { ThemeService } from "../theme-service";
import { ItemWebService } from "./item-web-service";

@injectable()
class ChannelWebService {

    constructor(
        private channelService: ChannelService,
        private imageService: ImageService,
        private authorService: AuthorService,
        private itemService:ItemService,
        private itemWebService:ItemWebService,
        private quillService:QuillService,
        private themeService:ThemeService
    ) { }

    async get(_id: string): Promise<ChannelViewModel> {
        return this.getViewModel(await this.channelService.get(_id))
    }

    async getViewModel(channel: Channel): Promise<ChannelViewModel> {

        let coverImage: ImageViewModel
        let coverBanner: ImageViewModel
        let authorPhoto: ImageViewModel

        let author: Author

        let editable = !channel.contractAddress

        if (channel.coverImageId) {

            let cImage = await this.imageService.get(channel.coverImageId)

            coverImage = {
                cid: cImage.cid,
                url: await this.imageService.getUrl(cImage)
            }

        }

        if (channel.coverBannerId) {

            let cBanner = await this.imageService.get(channel.coverBannerId)

            coverBanner = {
                cid: cBanner.cid,
                url: await this.imageService.getUrl(cBanner)
            }
        }

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

        let themes:Theme[] = await this.themeService.listByChannel(channel._id, 1000, 0)


        let itemCount = await this.channelService.countItemsByChannel(channel._id)

        return {
            channel: channel,
            themes: themes,
            coverImage: coverImage,
            coverBanner: coverBanner,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            authorPhoto: authorPhoto,
            itemCount: itemCount,
            editable: editable
        }

    }

    async list(limit: number, skip: number): Promise<ChannelViewModel[]> {

        let result: ChannelViewModel[] = []

        let channels: Channel[] = await this.channelService.list(limit, skip)

        for (let channel of channels) {
            result.push(await this.getViewModel(channel))
        }

        return result

    }


    async upgrade(channel:Channel) {

        //Loop through each item. 
        let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)


        for (let item of items) {

            //Build contentHTML for searching
            item.contentHTML = await this.quillService.translateContent(item.content, true)



            //Resave
            let updated = Object.assign(new Item(), item)
            await this.itemService.put(updated)

        }

    }

    async regenerateItemMedia(channel:Channel) {

        //Loop through each item. 
        let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)


        for (let item of items) {

            //Save the cover image 
            await this.itemWebService.updateGeneratedCoverImage(item)

            //And the animation
            await this.itemWebService.saveAnimation(item)

            //Resave
            let updated = Object.assign(new Item(), item)
            await this.itemService.put(updated)

            console.log(updated)

        }
    }


}

export {
    ChannelWebService
}