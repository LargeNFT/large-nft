import { Author } from "./author"
import { Channel } from "./channel"
import { ContractMetadata } from "./contract-metadata"
import { Item } from "./item"
import { Image } from "./image"

import { NFTMetadata } from "./nft-metadata"

interface ExportBundle {

    channel: Channel
    items: Item[]
    author: Author
    images: Image[]

    contractMetadata: ContractMetadata
    nftMetadata: NFTMetadata[]
    animations: string[]
}

export {
    ExportBundle
}