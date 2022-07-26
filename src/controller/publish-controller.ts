import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminPublishIndexComponent from '../components/admin/publish/index.f7.html'
import AdminPublishExportComponent from '../components/admin/publish/export.f7.html'
import AdminPublishPinataComponent from '../components/admin/publish/pinata.f7.html'
import AdminPublishIpfsHostComponent from '../components/admin/publish/ipfs-host.f7.html'

import AdminPublishForkReaderComponent from '../components/admin/publish/fork-reader.f7.html'
import AdminPublishPublishReaderComponent from '../components/admin/publish/publish-reader.f7.html'
import AdminPublishContractComponent from '../components/admin/publish/contract.f7.html'

import { ChannelWebService } from "../service/web/channel-web-service";
import { PinningService } from "../service/core/pinning-service";
import { GitlabService } from "../service/core/gitlab-service";
import { IpfsService } from "../service/core/ipfs-service";
import { IpfsHostService } from "../service/core/ipfs-host-service";


@injectable()
class PublishController {

    constructor(
        private channelWebService:ChannelWebService,
        private pinningService:PinningService,
        private gitlabService:GitlabService,
        private ipfsService:IpfsService,
        private ipfsHostService:IpfsHostService
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
            
            let ipfsHost

            try {
                ipfsHost = await this.ipfsHostService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                ipfsHost: ipfsHost
            }

        }, AdminPublishExportComponent)
    }


    
    @routeMap("/admin/publish/pinata/:id")
    async pinata() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            return {
                channelViewModel: channelViewModel,
                pinningApis: await this.pinningService.list(1000,0),
                peerCount: this.ipfsService.peerCount,
                ipfsReady: this.ipfsService.ipfs != undefined 
            }

        }, AdminPublishPinataComponent)
    }


    @routeMap("/admin/publish/ipfs/:id")
    async ipfs() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let ipfsHost

            try {
                ipfsHost = await this.ipfsHostService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                ipfsHost: ipfsHost
            }

        }, AdminPublishIpfsHostComponent)
    }




    
    @routeMap("/admin/publish/fork-reader/:id")
    async forkReader() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let gitlab

            try {
                gitlab = await this.gitlabService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                gitlab: gitlab
            }

        }, AdminPublishForkReaderComponent)
    }



    
    @routeMap("/admin/publish/publish-reader/:id")
    async publishReader() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let gitlab

            try {
                gitlab = await this.gitlabService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                gitlab: gitlab
            }

        }, AdminPublishPublishReaderComponent)
    }



    
    
    @routeMap("/admin/publish/contract/:id")
    async contract() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            return {
                channelViewModel: channelViewModel
            }

        }, AdminPublishContractComponent)
    }



}

export {
    PublishController
}