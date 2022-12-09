import { inject, injectable } from "inversify";
import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Item } from "../../dto/item.js";
import { AttributeTotal } from "../../dto/attribute-total.js";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model.js";
import { CHUNK_SIZE, ItemRepository } from "../../repository/item-repository.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { PagingService } from "../core/paging-service.js";
import { WalletService } from "../core/wallet-service.js";
import { ItemService } from "../item-service.js";
import { StaticPageService } from "../static-page-service.js";
import { AttributeTotalService } from "../attribute-total-service.js";

@injectable()
class ChannelWebService {

    @inject("ChannelService")
    private channelService:ChannelService

    @inject("AuthorService")
    private authorService:AuthorService

    @inject("PagingService")
    private pagingService:PagingService
    
    @inject("ItemService")
    private itemService:ItemService

    @inject("WalletService")
    private walletService:WalletService

    @inject("StaticPageService")
    private staticPageService:StaticPageService

    @inject("AttributeTotalService")
    private attributeTotalService:AttributeTotalService

    constructor() {}

    async get(offset:number) : Promise<ChannelViewModel> {
        return this.getViewModel(await this.channelService.get(), offset)
    }

    async getViewModel(channel:Channel, offset:number) : Promise<ChannelViewModel> {
 
        let author:Author

        if (channel.authorId) {            
            author = await this.authorService.get(channel.authorId)
        }

        let itemCount = channel.itemCount

        let pagingViewModel = this.pagingService.buildPagingViewModel(offset, CHUNK_SIZE, itemCount, 5)

        // let items = await this.itemWebService.list(offset)

        
        let locations = ["navbar", "links", "index"]

        let staticPagesViewModel = {}

        for (let location of locations) {
            staticPagesViewModel[location] = await this.staticPageService.listByLocation(location, 0)
        }

        return {
            channelContractAbbrev: channel.contractAddress ? this.walletService.truncateEthAddress(channel.contractAddress) : undefined,
            channel: channel,
            staticPagesViewModel: staticPagesViewModel,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            itemCount: itemCount,
            pagingViewModel: pagingViewModel
        }

    }


}

export {
    ChannelWebService
}