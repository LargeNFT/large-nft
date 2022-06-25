import { Author } from "../author";
import { Channel } from "../channel";
import { Item } from "../item";
import { Theme } from "../theme";
import { AnimationViewModel } from "./animation-view-model";
import { AttributeSelectionViewModel } from "./attribute-selection-view-model";
import { ImageViewModel } from "./image-view-model";

interface ItemViewModel {

    channel?:Channel
    
    item?:Item 
    dateDisplay?:string
    coverImage?:ImageViewModel
    animation?:AnimationViewModel
    contentHTML?:string
    animationContentHTML?:string

    theme?:Theme

    author?:Author
    authorDisplayName?:string 
    authorPhoto?:ImageViewModel

    images?:ImageViewModel[]

    attributeSelections:AttributeSelectionViewModel[]

    editable:boolean
    canDelete:boolean

    //For previous/next navigation
    next?:Item
    previous?:Item 

}

export {
    ItemViewModel
}