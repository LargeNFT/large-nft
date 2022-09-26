import { Author } from "./author"
import { Channel } from "./channel"

import { Item } from "./item"
import { Theme } from "./theme"
import { StaticPage } from "./static-page"
import { ForkStatus } from "./viewmodel/fork-status"
import { Image } from "./image"
import { Animation } from "./animation"
import { ContractMetadata } from "./contract-metadata"


interface ImportBundle {

    channels: Channel[]
    items: Item[]
    authors: Author[]
    themes: Theme[]
    staticPages: StaticPage[]

    images: Image[]
    animations: Animation[]

    mediaDownloader:MediaDownloader
    forkStatus:ForkStatus

    contractMetadata:ContractMetadata


}

interface MediaDownloader {
    basePath:string
    getAsString(filename:string) : Promise<string>
    getAsBuffer(filename:string) : Promise<Uint8Array>
}

export {
    ImportBundle, MediaDownloader
}