import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";

@injectable()
class ChannelWebService {

    constructor(
        private channelService:ChannelService,
        private imageService:ImageService,
        private authorService:AuthorService
    ) {}

    async get(_id:string) : Promise<ChannelViewModel> {
        return this.getViewModel(await this.channelService.get(_id))
    }

    async getViewModel(channel:Channel) : Promise<ChannelViewModel> {

        let coverImage:ImageViewModel
        let coverBanner:ImageViewModel 
        let authorPhoto:ImageViewModel

        let author:Author

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

        let itemCount = await this.channelService.countItemsByChannel(channel._id)

        return {
            channel: channel,
            coverImage: coverImage,
            coverBanner:coverBanner,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            authorPhoto: authorPhoto,
            itemCount: itemCount
        }

    }

    async list(limit: number, skip:number): Promise<ChannelViewModel[]> {

        let result:ChannelViewModel[] = []

        let channels:Channel[] = await this.channelService.list(limit, skip)

        for (let channel of channels) {
            result.push(await this.getViewModel(channel))
        }

        return result
    
      }

}

export {
    ChannelWebService
}