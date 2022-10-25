import { Channel } from "../channel";
import { Item } from "../item";
import { ImageViewModel } from "./image-view-model";

interface ItemListViewModel {
    
    item?:Item 
    channel?:Channel
    coverImage?:ImageViewModel

}

export {
    ItemListViewModel
}