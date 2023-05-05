import { Channel } from "../dto/channel.js"
import { ChannelValue } from "./node/library-channel-repository-impl.js"

interface LibraryChannelRepository {
    get(_id:string, options?:any): Promise<Channel>
    put(channel:Channel, options?:any) : Promise<Channel>
    remove(channel:Channel, options?:any) : Promise<void> 
    listByValue(options?:any) : Promise<ChannelValue[]>
}



export {
    LibraryChannelRepository
}
