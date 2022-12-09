import { inject, injectable } from "inversify";
import { AttributeTotal } from "../../dto/attribute-total.js";
import { ItemPage, ItemResults, RowItemViewModel } from "../../dto/item-page.js";
import { StaticPage } from "../../dto/static-page.js";
import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model.js";
import { ItemViewModel } from "../../dto/viewmodel/item-view-model.js";
import { StaticPageService } from "../static-page-service.js";
import { ChannelWebService } from "../web/channel-web-service.js";
import { ItemWebService } from "../web/item-web-service.js";

const PER_PAGE = 35

@injectable()
class GenerateService {

    constructor(
        @inject("ChannelWebService") private channelWebService: ChannelWebService,
        @inject("ItemWebService") private itemWebService: ItemWebService,
        @inject("StaticPageService") private staticPageService: StaticPageService
    ) { }


    async getGenerateViewModel(config, itemViewModels:ItemViewModel[]): Promise<GenerateViewModel> {

        //Get first page of items for explore page
        let itemResults: ItemResults = await this.itemWebService.exploreList({}, 0, PER_PAGE)


        let generateViewModel: GenerateViewModel = {
            firstPageExploreItems: itemResults.items,
            svgItems: itemViewModels.filter(i => i.coverImage.generated),
            routablePages: await this.staticPageService.listRoutablePages(),
            base64Version: Buffer.from(JSON.stringify(config.VERSION)).toString('base64'),
            headContents: `
                <script defer src="${config.baseURL}large/reader/browser/js/runtime.reader.js"></script>
                <script defer src="${config.baseURL}large/reader/browser/js/vendors.reader.js"></script>
                <script defer src="${config.baseURL}large/reader/browser/js/main.reader.js"></script>
            `,
            bodyContents: ``

        }

        return generateViewModel

    }


}


interface GenerateViewModel {
    firstPageExploreItems: RowItemViewModel[],
    svgItems: ItemViewModel[],
    routablePages: StaticPage[],
    base64Version: string,
    headContents: string,
    bodyContents: string
}

export {
    GenerateService, GenerateViewModel
}