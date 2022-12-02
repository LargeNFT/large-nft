import { NFTMetadata } from "../dto/nft-metadata.js"


interface MetadataRepository {
    get(tokenId:string): Promise<NFTMetadata>
}

export {
    MetadataRepository
}
