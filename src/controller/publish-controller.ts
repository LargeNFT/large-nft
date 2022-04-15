import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminPublishIndexComponent from '../components/admin/publish/index.f7.html'
import AdminPublishExportComponent from '../components/admin/publish/export.f7.html'
import AdminPublishPinataComponent from '../components/admin/publish/pinata.f7.html'

import { ChannelWebService } from "../service/web/channel-web-service";
import { PinningService } from "../service/core/pinning-service";
import { GitlabService } from "../service/core/gitlab-service";
import { IpfsService } from "../service/core/ipfs-service";


@injectable()
class PublishController {

    constructor(
        private channelWebService:ChannelWebService,
        private pinningService:PinningService,
        private gitlabService:GitlabService,
        private ipfsService:IpfsService
    ) {}

    @routeMap("/admin/publish/:id")
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


    @routeMap("/admin/publish/export/:id")
    async export() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            return {
                channelViewModel: channelViewModel
            }

        }, AdminPublishExportComponent)
    }


    
    @routeMap("/admin/publish/pinata/:id")
    async pinata() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let pinningApi

            try {
                pinningApi = await this.pinningService.getPinata()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                pinningApi: pinningApi,
                peerCount: this.ipfsService.peerCount,
                ipfsReady: this.ipfsService.ipfs != undefined 
            }

        }, AdminPublishPinataComponent)
    }

}

export {
    PublishController
}