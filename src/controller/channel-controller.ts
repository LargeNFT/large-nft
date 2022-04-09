import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminChannelIndexComponent from '../components/admin/channel/index.f7.html'
import AdminPublishIndexComponent from '../components/admin/publish/index.f7.html'
import AdminChannelCreateComponent from '../components/admin/channel/create.f7.html'
import AdminChannelShowComponent from '../components/admin/channel/show.f7.html'
import AdminChannelEditComponent from '../components/admin/channel/edit.f7.html'


import { ChannelWebService } from "../service/web/channel-web-service";
import { PinningService } from "../service/core/pinning-service";
import { GitlabService } from "../service/core/gitlab-service";


@injectable()
class ChannelController {

    constructor(
        private channelWebService:ChannelWebService,
        private pinningService:PinningService,
        private gitlabService:GitlabService
    ) {}

    @routeMap("/")
    async index() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelIndexComponent)
    }

    @routeMap("/admin/channel/publish/:id")
    async publish() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let pinningApi
            let gitlab

            try {
                pinningApi = await this.pinningService.getPinata()
                gitlab = await this.gitlabService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                pinningApi: pinningApi,
                gitlab: gitlab
            }

        }, AdminPublishIndexComponent)
    }


    @routeMap("/admin/channel/create")
    async create() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelCreateComponent)
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

}

export {
    ChannelController
}