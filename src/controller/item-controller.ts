import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminItemCreateComponent from '../components/admin/item/create.f7.html'
import AdminItemShowComponent from '../components/admin/item/show.f7.html'
import AdminItemEditComponent from '../components/admin/item/edit.f7.html'

import { ItemWebService } from "../service/web/item-web-service";
import { ThemeService } from "../service/theme-service";
import { SchemaService } from "../service/core/schema-service";


@injectable()
class ItemController {

    constructor(
        private itemWebService:ItemWebService,
        private themeService:ThemeService,
        private schemaService:SchemaService
    ) {}

    @routeMap("/admin/item/create/:channelId")
    async create() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId)

            let itemViewModel = await this.itemWebService.getNewViewModel(routeTo.params.channelId)

            return {
                itemViewModel: itemViewModel,
                themes: await this.themeService.listByChannel(itemViewModel.channel._id, 1000, 0)
            }

        }, AdminItemCreateComponent)
    }

    @routeMap("/admin/channel/show/:channelId/:tokenId")
    async show() : Promise<ModelView> {
        
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId)

            let itemViewModel = await this.itemWebService.getNavigation(routeTo.params.channelId, parseInt(routeTo.params.tokenId))

            return {
                itemViewModel: itemViewModel
            }

        }, AdminItemShowComponent)
    }

    @routeMap("/admin/channel/:channelId/item/edit/:id")
    async edit() : Promise<ModelView> {
        
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId)

            let itemViewModel = await this.itemWebService.get(routeTo.params.id)


            return {
                itemViewModel: itemViewModel,
                themes: await this.themeService.listByChannel(itemViewModel.channel._id, 1000, 0)
            }

        }, AdminItemEditComponent)
    }


}

export {
    ItemController
}