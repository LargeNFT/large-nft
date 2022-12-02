import { Channel } from "../channel.js";
import { Item } from "../item.js";
import { ImageViewModel } from "./image-view-model.js";

interface ItemListViewModel {
    
    item?:Item 
    channel?:Channel
    coverImage?:ImageViewModel

}

export {
    ItemListViewModel
}