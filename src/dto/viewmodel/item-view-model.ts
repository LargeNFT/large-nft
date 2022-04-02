import { Author } from "../author";
import { Channel } from "../channel";
import { Item } from "../item";
import { AttributeSelectionViewModel } from "./attribute-selection-view-model";
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

    attributeSelections:AttributeSelectionViewModel[]

}

export {
    ItemViewModel
}