import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Image } from "../../dto/image";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model";
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

    async getViewModel(channel:Channel) : Promise<ChannelViewModel> {

        let coverImage:Image
        let coverBanner:Image 

        let author:Author

        if (channel.coverImageId) {
            coverImage = await this.imageService.get(channel.coverImageId)
        }

        if (channel.coverBannerId) {
            coverBanner = await this.imageService.get(channel.coverBannerId)
        }

        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId)
        }

        return {
            channel: channel,
            coverImage: coverImage,
            coverBanner:coverBanner,
            author: author
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