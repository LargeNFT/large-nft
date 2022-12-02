import {  injectable } from "inversify"
import { Animation } from "../../dto/animation.js"
import { MetadataRepository } from "../metadata-repository.js"
import { NFTMetadata } from "../../dto/nft-metadata.js"

@injectable()
class MetadataRepositoryNodeImpl implements MetadataRepository {
    
    constructor() {}

    animations:Animation[] = []

    async get(tokenId: string): Promise<NFTMetadata> {
        return
    }


}

export {
    MetadataRepositoryNodeImpl
}