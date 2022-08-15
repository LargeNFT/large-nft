import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminChannelIndexComponent from '../components/admin/channel/index.f7.html'

import AdminChannelCreateComponent from '../components/admin/channel/create.f7.html'
import AdminChannelShowComponent from '../components/admin/channel/show.f7.html'
import AdminChannelSplashComponent from '../components/admin/channel/splash.f7.html'

import AdminChannelEditComponent from '../components/admin/channel/edit.f7.html'
import AdminChannelCreateMenuComponent from '../components/admin/channel/create-menu.f7.html'
import AdminChannelForkComponent from '../components/admin/channel/fork.f7.html'
import AdminChannelForkContractComponent from '../components/admin/channel/fork-contract.f7.html'

import AdminChannelUpgradeComponent from '../components/admin/channel/upgrade.f7.html'


import { ChannelWebService } from "../service/web/channel-web-service";
import { PagingService } from "../service/core/paging-service";
import { ItemWebService } from "../service/web/item-web-service";



@injectable()
class ChannelController {

    constructor(
        private channelWebService:ChannelWebService
    ) {}

    @routeMap("/")
    async app() : Promise<ModelView> {
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

            return {
                cid: routeTo.query.cid
            }

        }, AdminChannelForkComponent)
    }

    @routeMap("/admin/channel/fork-contract")
    async forkContract() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            return {
                contractAddress: routeTo.query.contractAddress
            }

        }, AdminChannelForkContractComponent)
    }



    @routeMap("/admin/channel/show/:id")
    async show() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            return {
                channelViewModel: channelViewModel
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

    @routeMap("/admin/channel/upgrade/:id")
    async upgrade() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            return {
                channelViewModel: channelViewModel
            }

        }, AdminChannelUpgradeComponent)
    }


}

export {
    ChannelController
}