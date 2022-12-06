import { injectable } from "inversify";
import { ModelView } from "../util/model-view.js";
import { routeMap } from "../util/route-map.js";
import { RouteTo } from '../service/core/routing-service.js';

import AdminPublishIndexComponent from '../components/admin/publish/index.f7.html'
import AdminPublishExportComponent from '../components/admin/publish/export.f7.html'

import AdminPublishForkReaderComponent from '../components/admin/publish/fork-reader.f7.html'
import AdminPublishPublishReaderComponent from '../components/admin/publish/publish-reader.f7.html'
import AdminPublishContractComponent from '../components/admin/publish/contract.f7.html'

import { ChannelWebService } from "../service/web/channel-web-service.js";

import { SettingsService } from "../service/core/settings-service.js";
import { SchemaService } from "../service/core/schema-service.js";
import { GitlabService } from "../service/core/gitlab-service.js";


@injectable()
class PublishController {

    constructor(
        private channelWebService:ChannelWebService,
        private settingsService:SettingsService,
        private schemaService:SchemaService,
        private gitlabService:GitlabService
    ) {}

    @routeMap("/admin/publish/:id")
    async publish() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            

            return {
                channelViewModel: channelViewModel,
            }

        }, AdminPublishIndexComponent)
    }


    @routeMap("/admin/publish/export/:id")
    async export() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {
            
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)
            

            let settings

            try {
                settings = await this.settingsService.get()
            } catch(ex) {}


            return {
                channelViewModel: channelViewModel,
                settings:settings
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

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            let settings

            try {
                settings = await this.settingsService.get()
            } catch(ex) {}


            let existingForkResult = await this.gitlabService.getExistingFork(channelViewModel.channel)

            
            return {
                channelViewModel: channelViewModel,
                settings: settings,
                repoURI: existingForkResult?.http_url_to_repo

            }

        }, AdminPublishForkReaderComponent)
    }



    
    @routeMap("/admin/publish/publish-reader/:id")
    async publishReader() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

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

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

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