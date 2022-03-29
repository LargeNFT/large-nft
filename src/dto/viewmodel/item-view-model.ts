import { Author } from "../author";
import { Channel } from "../channel";
import { Image } from "../image";
import { Item } from "../item";
import { ImageViewModel } from "./image-view-model";

interface ItemViewModel {

    channel:Channel
    
    item:Item 
    coverImage:ImageViewModel
    author:Author

    images:ImageViewModel[]

}

export {
    ItemViewModel
}