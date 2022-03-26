import { Author } from "../author";
import { Channel } from "../channel";
import { Image } from "../image";
import { Item } from "../item";

interface ItemViewModel {

    channel:Channel
    
    item:Item 
    coverImage:Image
    author:Author

}

export {
    ItemViewModel
}