import { inject, injectable } from "inversify"

import { Channel } from "../dto/channel.js";
import { LibraryChannelRepository } from "../repository/library-channel-repository.js";
import { ChannelValue } from "../repository/node/library-channel-repository-impl.js";


@injectable()
class LibraryChannelService {

    @inject("LibraryChannelRepository")
    private libraryChannelRepository: LibraryChannelRepository


    constructor() { }

    async get(_id: string, options?: any): Promise<Channel> {
        return this.libraryChannelRepository.get(_id, options)
    }

    async put(channel: Channel, options?: any) {
        return this.libraryChannelRepository.put(channel, options)
    }

    async remove(channel: Channel, options?: any): Promise<void> {
        return this.libraryChannelRepository.remove(channel, options)
    }

    async getOrCreate(channelKey: string, options?: any) : Promise<Channel> {

        //Make sure we snag the lastSynced date for each of the files.
        let channel: Channel = await this.libraryChannelRepository.get(channelKey, options)

        if (!channel) {

            channel = Object.assign(new Channel(), {
                _id: channelKey
            })

        }

        return channel

    }

    async listByValue(options?:any) : Promise<ChannelValue[]> {
        return this.libraryChannelRepository.listByValue(options)
    }
}



export {
    LibraryChannelService
}

