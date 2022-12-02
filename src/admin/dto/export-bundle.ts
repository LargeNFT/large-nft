import { Author } from "./author.js"
import { Channel } from "./channel.js"
import { Animation } from "./animation.js"

import { Item } from "./item.js"
import { Image } from "./image.js"
import { Theme } from "./theme.js"
import { StaticPage } from "./static-page.js"


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