import { Author } from "../author";
import { Channel } from "../channel";
import { Image } from "../image";
import { Theme } from "../theme";
import { ImageViewModel } from "../viewmodel/image-view-model";

interface ChannelViewModel {

    channel:Channel
    coverImage:ImageViewModel
    coverBanner:ImageViewModel


    author:Author
    authorDisplayName:string 
    authorPhoto:ImageViewModel

    themes:Theme[]

    itemCount:number

    editable:boolean

}

export {
    ChannelViewModel
}