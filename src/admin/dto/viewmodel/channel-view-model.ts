import { Author } from "../author.js";
import { Channel } from "../channel.js";
import { Image } from "../image.js";
import { StaticPage } from "../static-page.js";
import { Theme } from "../theme.js";
import { ImageViewModel } from "../viewmodel/image-view-model.js";

interface ChannelViewModel {

    channel:Channel
    coverImage:ImageViewModel
    coverBanner:ImageViewModel


    author:Author
    authorDisplayName:string 
    authorPhoto:ImageViewModel

    // themes:Theme[]
    // staticPages:StaticPage[]

    itemCount:number

    gitProvider:{}

    editable:boolean

    dateCreated:string

}

export {
    ChannelViewModel
}