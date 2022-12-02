import { Author } from "../author.js";
import { Channel } from "../channel.js";
import { Image } from "../image.js";
import { Item } from "../item.js";
import { Animation } from "../animation.js";

import { AttributeSelectionViewModel } from "./attribute-selection-view-model.js";

interface ItemViewModel {

    channel?:Channel
    
    item?:Item 
    dateDisplay?:string

    coverImage?:Image
    animation?:Animation
    
    
    contentHTML?:string
    animationContentHTML?:string

    author?:Author
    authorDisplayName?:string 

    attributeSelections:AttributeSelectionViewModel[]

    //For previous/next navigation
    next?:Item
    previous?:Item 


}

export {
    ItemViewModel
}