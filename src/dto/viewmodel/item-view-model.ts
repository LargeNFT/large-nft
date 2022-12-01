import { Author } from "../author.js";
import { Channel } from "../channel.js";
import { Item } from "../item.js";
import { Theme } from "../theme.js";
import { AnimationViewModel } from "./animation-view-model.js";
import { AttributeSelectionViewModel } from "./attribute-selection-view-model.js";
import { ImageViewModel } from "./image-view-model.js";

interface ItemViewModel {

    channel?:Channel
    
    item?:Item 
    dateDisplay?:string
    coverImage?:ImageViewModel
    animation?:AnimationViewModel
    contentHTML?:string
    animationContentHTML?:string

    themes?:Theme[]

    author?:Author
    authorDisplayName?:string 
    authorPhoto?:ImageViewModel

    images?:ImageViewModel[]

    attributeSelections:AttributeSelectionViewModel[]

    editable:boolean
    canDelete:boolean

    //For previous/next navigation
    next?:number
    previous?:number

}

export {
    ItemViewModel
}