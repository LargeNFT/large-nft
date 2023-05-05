import axios from "axios"
import { inject, injectable } from "inversify"
import { NFTMetadata } from "../../dto/nft-metadata.js"
import { MetadataRepository } from "../metadata-repository.js"

@injectable()
class MetadataRepositoryBrowserImpl implements MetadataRepository {

    static CHUNK_SIZE = 10

    constructor(
        @inject('baseURI') private baseURI:Function,
        @inject('hostname') private hostname:Function
    ) {}

    async get(tokenId: string): Promise<NFTMetadata> {
        const response = await axios.get(`${this.hostname()}${this.baseURI()}backup/metadata/${tokenId}.json`)
        return Object.assign(new NFTMetadata(), response.data)
    }

}

export {
    MetadataRepositoryBrowserImpl
}


