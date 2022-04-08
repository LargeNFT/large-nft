import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminItemCreateComponent from '../components/admin/item/create.f7.html'
import AdminItemShowComponent from '../components/admin/item/show.f7.html'
import AdminItemEditComponent from '../components/admin/item/edit.f7.html'

import { ChannelWebService } from "../service/web/channel-web-service";
import { PinningService } from "../service/core/pinning-service";
import { ItemWebService } from "../service/web/item-web-service";


@injectable()
class ItemController {

    constructor(
        private itemWebService:ItemWebService,
        private pinningService:PinningService
    ) {}

    @routeMap("/admin/item/create/:channelId")
    async create() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let itemViewModel = await this.itemWebService.getNewViewModel(routeTo.params.channelId)

            return {
                itemViewModel: itemViewModel
            }

        }, AdminItemCreateComponent)
    }

    @routeMap("/admin/item/show/:id")
    async show() : Promise<ModelView> {
        
        return new ModelView(async (routeTo:RouteTo) => {

            let itemViewModel = await this.itemWebService.get(routeTo.params.id)

            return {
                itemViewModel: itemViewModel
            }

        }, AdminItemShowComponent)
    }

    @routeMap("/admin/item/edit/:id")
    async edit() : Promise<ModelView> {
        
        return new ModelView(async (routeTo:RouteTo) => {

            let itemViewModel = await this.itemWebService.get(routeTo.params.id)

            return {
                itemViewModel: itemViewModel
            }

        }, AdminItemEditComponent)
    }


}

export {
    ItemController
}