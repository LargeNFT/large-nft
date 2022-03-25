import { injectable } from "inversify";
import { Channel } from "../../dto/channel";
import { Image } from "../../dto/image";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";

@injectable()
class ChannelWebService {

    constructor(
        private channelService:ChannelService,
        private imageService:ImageService
    ) {}

    async getViewModel(_id:string) : Promise<ChannelViewModel> {

        let channel:Channel = await this.channelService.get(_id)
        let coverImage:Image

        if (channel.coverImageId) {
            coverImage = await this.imageService.get(channel.coverImageId)
        }

        return {
            channel: channel,
            coverImage: coverImage
        }

    }

    async list(limit: number, skip:number): Promise<ChannelViewModel[]> {

        let result:ChannelViewModel[] = []

        let channels:Channel[] = await this.channelService.list(limit, skip)

        for (let channel of channels) {

            let coverImage:Image

            if (channel.coverImageId) {
                coverImage = await this.imageService.get(channel.coverImageId)
            }
            
            result.push({
                channel: channel,
                coverImage: coverImage
            })
        }

        return result
    
      }

}

export {
    ChannelWebService
}