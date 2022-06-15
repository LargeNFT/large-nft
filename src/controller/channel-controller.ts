import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminChannelIndexComponent from '../components/admin/channel/index.f7.html'
import AdminChannelCreateComponent from '../components/admin/channel/create.f7.html'
import AdminChannelShowComponent from '../components/admin/channel/show.f7.html'
import AdminChannelEditComponent from '../components/admin/channel/edit.f7.html'
import AdminChannelCreateMenuComponent from '../components/admin/channel/create-menu.f7.html'
import AdminChannelForkComponent from '../components/admin/channel/fork.f7.html'


import { ChannelWebService } from "../service/web/channel-web-service";
import { PagingService } from "../service/core/paging-service";
import { ItemWebService } from "../service/web/item-web-service";
import { ItemRepository } from "../repository/item-repository";



@injectable()
class ChannelController {

    constructor(
        private channelWebService:ChannelWebService,
        private itemWebService:ItemWebService,
        private pagingService:PagingService
    ) {}

    @routeMap("/")
    async index() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelIndexComponent)
    }


    @routeMap("/admin/channel/create")
    async create() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelCreateComponent)
    }

    @routeMap("/admin/channel/create-menu")
    async createMenu() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelCreateMenuComponent)
    }

    @routeMap("/admin/channel/fork")
    async fork() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {



        }, AdminChannelForkComponent)
    }


    @routeMap("/admin/channel/show/:id/:offset?")
    async show() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            const offset = parseInt(routeTo.params.offset)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            let pagingViewModel = this.pagingService.buildPagingViewModel(offset, ItemRepository.CHUNK_SIZE, channelViewModel.itemCount, 5)

            let items = await this.itemWebService.listByChannel(routeTo.params.id, ItemRepository.CHUNK_SIZE, offset)

            return {
                channelViewModel: channelViewModel,
                pagingViewModel: pagingViewModel,
                items: items
            }

        }, AdminChannelShowComponent)
    }


    @routeMap("/admin/channel/edit/:id")
    async edit() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            return {
                channelViewModel: channelViewModel
            }

        }, AdminChannelEditComponent)
    }

}

export {
    ChannelController
}