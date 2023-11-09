import { Author } from "./author.js"
import { Channel } from "./channel.js"

import { Item } from "./item.js"
import { Theme } from "./theme.js"
import { StaticPage } from "./static-page.js"
import { ForkStatus } from "./viewmodel/fork-status.js"
import { Image } from "./image.js"
import { Animation } from "./animation.js"
import { ContractMetadata } from "./contract-metadata.js"
import { OriginalMetadata } from "./original-metadata.js"


interface ImportBundle {

    channels: Channel[]
    items: Item[]
    authors: Author[]
    themes: Theme[]
    staticPages: StaticPage[]

    images: Image[]
    animations: Animation[]
    originalMetadata:OriginalMetadata[]

    mediaDownloader:MediaDownloader
    forkStatus:ForkStatus

    contractMetadata:ContractMetadata
    tokenMetadata:any


}

interface MediaDownloader {
    basePath:string
    getAsString(filename:string) : Promise<string>
    getAsBuffer(filename:string) : Promise<Uint8Array>
}

export {
    ImportBundle, MediaDownloader
}