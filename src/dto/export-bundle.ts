import { Author } from "./author"
import { Channel } from "./channel"
import { Animation } from "./animation"

import { ContractMetadata } from "./contract-metadata"
import { Item } from "./item"
import { Image } from "./image"


interface ExportBundle {

    channel: Channel
    items: Item[]
    author: Author
    images: Image[]
    animations: Animation[]

    contractMetadata: ContractMetadata
}

export {
    ExportBundle
}