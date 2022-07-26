
import { injectable } from "inversify";
import { IpfsHostRepository } from "../../repository/ipfs-host-repository";
import { IpfsHost } from "../../dto/ipfs-host";
import { Channel } from "../../dto/channel";


@injectable()
class IpfsHostService {

    constructor(
        private ipfsHostRepository:IpfsHostRepository,
    ) {}

    async get(): Promise<IpfsHost> {
        return this.ipfsHostRepository.get()
    }

    async put(ipfsHost: IpfsHost) {
        await this.ipfsHostRepository.put(ipfsHost)    
    }



}

export {
    IpfsHostService
}