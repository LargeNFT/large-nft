import { Channel } from "../dto/channel.js"

interface ChannelRepository {
    get(): Promise<Channel>
}

export {
    ChannelRepository
}
