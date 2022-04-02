import { Author } from "../author";
import { Channel } from "../channel";
import { Image } from "../image";
import { Item } from "../item";
import { ImageViewModel } from "./image-view-model";

interface ItemViewModel {

    channel?:Channel
    
    item?:Item 
    dateDisplay?:string
    coverImage?:ImageViewModel

    author?:Author
    authorDisplayName?:string 
    authorPhoto?:ImageViewModel

    images?:ImageViewModel[]

}

export {
    ItemViewModel
}