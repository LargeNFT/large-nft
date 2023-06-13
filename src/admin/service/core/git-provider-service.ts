import { Channel } from "../../dto/channel.js";



interface GitProviderService {
    createFork(channel:Channel) : Promise<ForkInfo>
    commit(channel:Channel, actions:any[], gitProvider) : Promise<string>
    getIPFSActionStatus(channel: Channel) : Promise<string>
    getIPFSActionResult(channel: Channel) : Promise<any>
    getForkRepoStatus(channel:Channel) : Promise<string>
}

interface ForkInfo {
    id: string
    httpUrlToRepo?:string
    path:string
    branch:string
}



export {
    GitProviderService, ForkInfo//, ExistingForkInfo
}