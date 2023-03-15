import { PagingViewModel } from "../../service/core/paging-service.js";
import { Author } from "../author.js";
import { Channel } from "../channel.js";
import { Image } from "../image.js";


interface ChannelViewModel {

    channel:Channel

    author:Author
    authorDisplayName:string 

    itemCount:number
    channelContractAbbrev:string

    pagingViewModel:PagingViewModel

    // items:ItemViewModel[]

    //Get static pages
    staticPagesViewModel: any

    coverImage:Image

}

export {
    ChannelViewModel
}