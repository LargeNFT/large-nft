import { Author } from "./author"
import { Channel } from "./channel"
import { Animation } from "./animation"

import { Item } from "./item"
import { Image } from "./image"
import { Theme } from "./theme"
import { StaticPage } from "./static-page"


interface ExportBundle {

    channel: Channel
    items: Item[]
    author: Author
    themes: Theme[]
    staticPages: StaticPage[]

    images: Image[]
    animations: Animation[]

    ownerAddress:string

}


interface BackupBundle {
    channels: Channel[],
    authors: Author[],
    items: Item[],
    themes: Theme[],
    staticPages: StaticPage[],
    images:Image[],
    animations:Animation[] 

}

export {
    ExportBundle, 
    BackupBundle
}