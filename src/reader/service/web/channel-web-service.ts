import { inject, injectable } from "inversify";
import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Image } from "../../dto/image.js";
import { StaticPage } from "../../dto/static-page.js";


import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model.js";
import { CHUNK_SIZE } from "../../repository/item-repository.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { PagingService } from "../core/paging-service.js";
import { WalletService } from "../core/wallet-service.js";
import { ImageService } from "../image-service.js";
import { ItemService } from "../item-service.js";
import { StaticPageService } from "../static-page-service.js";

@injectable()
class ChannelWebService {

    @inject("ChannelService")
    private channelService:ChannelService

    @inject("AuthorService")
    private authorService:AuthorService

    @inject("ImageService")
    private imageService:ImageService

    @inject("PagingService")
    private pagingService:PagingService
    
    @inject("ItemService")
    private itemService:ItemService

    @inject("WalletService")
    private walletService:WalletService

    @inject("StaticPageService")
    private staticPageService:StaticPageService

    constructor() {}

    async get(offset:number, additionalStaticPages?:StaticPage[]) : Promise<ChannelViewModel> {
        return this.getViewModel(await this.channelService.get(), offset, additionalStaticPages)
    }

    async getViewModel(channel:Channel, offset:number, additionalStaticPages?:StaticPage[]) : Promise<ChannelViewModel> {
 
        let author:Author
        let coverImage:Image

        if (channel.authorId) {            
            author = await this.authorService.get(channel.authorId)
        }

        let itemCount = channel.itemCount

        let pagingViewModel = this.pagingService.buildPagingViewModel(offset, CHUNK_SIZE, itemCount, 5)

        // let items = await this.itemWebService.list(offset)

        
        let locations = ["navbar", "links", "index", "none"]

        let staticPagesViewModel = {}

        for (let location of locations) {
            staticPagesViewModel[location] = await this.staticPageService.listByLocation(location, 0)
        }


        if (additionalStaticPages?.length > 0) {
            for (let staticPage of additionalStaticPages) {
                for (let location of staticPage?.locations) {
                    staticPagesViewModel[location].push(staticPage)
                }
            }
        }


        if (channel.coverImageId) {
            coverImage = await this.imageService.get(channel.coverImageId)
        }

        return {
            channelContractAbbrev: channel.contractAddress ? this.walletService.truncateEthAddress(channel.contractAddress) : undefined,
            channel: channel,
            staticPagesViewModel: staticPagesViewModel,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            itemCount: itemCount,
            pagingViewModel: pagingViewModel,
            coverImage: coverImage
        }

    }


}

export {
    ChannelWebService
}