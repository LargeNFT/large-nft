import { Channel } from "../../dto/channel.js";



interface GitProviderService {
    createFork(channel:Channel) : Promise<ForkInfo>
    getExistingFork(channel:Channel) : Promise<ExistingForkInfo>
    getForkRepoStatus(channel:Channel) : Promise<string>
}

interface ForkInfo {
    id: string
    path:string
}

interface ExistingForkInfo {
    httpUrlToRepo:string
    id:string
    path:string
    defaultBranch:string
}

export {
    GitProviderService, ForkInfo, ExistingForkInfo
}