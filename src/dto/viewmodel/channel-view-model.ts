import { Author } from "../author";
import { Channel } from "../channel";
import { Image } from "../image";

interface ChannelViewModel {

    channel:Channel
    coverImage:Image
    coverBanner:Image


    author:Author
    authorDisplayName:string 

}

export {
    ChannelViewModel
}