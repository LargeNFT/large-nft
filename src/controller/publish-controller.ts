import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';

import AdminPublishIndexComponent from '../components/admin/publish/index.f7.html'
import AdminPublishExportComponent from '../components/admin/publish/export.f7.html'

import AdminPublishForkReaderComponent from '../components/admin/publish/fork-reader.f7.html'
import AdminPublishPublishReaderComponent from '../components/admin/publish/publish-reader.f7.html'
import AdminPublishContractComponent from '../components/admin/publish/contract.f7.html'

import { ChannelWebService } from "../service/web/channel-web-service";

import { SettingsService } from "../service/core/settings-service";


@injectable()
class PublishController {

    constructor(
        private channelWebService:ChannelWebService,
        private settingsService:SettingsService
    ) {}

    @routeMap("/admin/publish/:id")
    async publish() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            return {
                channelViewModel: channelViewModel
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


    
    // @routeMap("/admin/publish/pinata/:id")
    // async pinata() : Promise<ModelView> {

    //     return new ModelView(async (routeTo:RouteTo) => {

    //         let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
    //         return {
    //             channelViewModel: channelViewModel,
    //             pinningApis: await this.pinningService.list(1000,0),
    //             peerCount: this.ipfsService.peerCount,
    //             ipfsReady: this.ipfsService.ipfs != undefined 
    //         }

    //     }, AdminPublishPinataComponent)
    // }


    // @routeMap("/admin/publish/ipfs/:id")
    // async ipfs() : Promise<ModelView> {

    //     return new ModelView(async (routeTo:RouteTo) => {

    //         let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
    //         let ipfsHost

    //         try {
    //             ipfsHost = await this.ipfsHostService.get()
    //         } catch(ex) {}

    //         return {
    //             channelViewModel: channelViewModel,
    //             ipfsHost: ipfsHost
    //         }

    //     }, AdminPublishIpfsHostComponent)
    // }




    
    @routeMap("/admin/publish/fork-reader/:id")
    async forkReader() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)


            return {
                channelViewModel: channelViewModel
            }

        }, AdminPublishForkReaderComponent)
    }



    
    @routeMap("/admin/publish/publish-reader/:id")
    async publishReader() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            
            let settings

            try {
                settings = await this.settingsService.get()
            } catch(ex) {}

            return {
                channelViewModel: channelViewModel,
                settings: settings
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