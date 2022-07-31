import { Item } from "../item";
import { ImageViewModel } from "./image-view-model";

interface ItemListViewModel {
    
    item?:Item 
    coverImage?:ImageViewModel

}

export {
    ItemListViewModel
}