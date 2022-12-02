import { injectable } from "inversify";
import { ModelView } from "../util/model-view.js";
import { routeMap } from "../util/route-map.js";
import { RouteTo } from '../service/core/routing-service.js';

import AdminChannelIndexComponent from '../components/admin/channel/index.f7.html'

import AdminChannelCreateComponent from '../components/admin/channel/create.f7.html'
import AdminChannelShowComponent from '../components/admin/channel/show.f7.html'
import AdminChannelThemesComponent from '../components/admin/channel/themes.f7.html'
import AdminChannelStaticPagesComponent from '../components/admin/channel/static-pages.f7.html'

import AdminChannelEditComponent from '../components/admin/channel/edit.f7.html'
import AdminChannelCreateMenuComponent from '../components/admin/channel/create-menu.f7.html'
import AdminChannelForkComponent from '../components/admin/channel/fork.f7.html'
import AdminChannelForkContractComponent from '../components/admin/channel/fork-contract.f7.html'
import AdminChannelForkReaderComponent from '../components/admin/channel/fork-reader.f7.html'

import AdminChannelUpgradeComponent from '../components/admin/channel/upgrade.f7.html'


import { ChannelWebService } from "../service/web/channel-web-service.js";
import { ItemWebService } from "../service/web/item-web-service.js";
import { ItemRepository } from "../repository/item-repository.js";
import { SchemaService } from "../service/core/schema-service.js";
import { Theme } from "../dto/theme.js";
import { ThemeService } from "../service/theme-service.js";
import { StaticPage } from "../dto/static-page.js";
import { StaticPageService } from "../service/static-page-service.js";


@injectable()
class ChannelController {

    constructor(
        private channelWebService:ChannelWebService,
        private itemWebService:ItemWebService,
        private schemaService:SchemaService,
        private themeService:ThemeService,
        private staticPageService:StaticPageService
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

    @routeMap("/admin/channel/fork-reader")
    async forkReader() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

        }, AdminChannelForkReaderComponent)
    }



    @routeMap("/admin/channel/show/:id")
    async show() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            let firstPageItems = await this.itemWebService.listByChannel(channelViewModel.channel._id, ItemRepository.CHUNK_SIZE, 0)

            return {
                channelViewModel: channelViewModel,
                firstPageItems: firstPageItems
            }

        }, AdminChannelShowComponent)
    }


    @routeMap("/admin/channel/themes/:id")
    async themes() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            let themes:Theme[] = await this.themeService.listByChannel(channelViewModel.channel._id, 1000, 0)


            return {
                channelViewModel: channelViewModel,
                themes: themes
            }

        }, AdminChannelThemesComponent)
    }


    @routeMap("/admin/channel/static-pages/:id")
    async staticPages() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            let staticPages:StaticPage[] = await this.staticPageService.listByChannel(channelViewModel.channel._id, 1000, 0)


            return {
                channelViewModel: channelViewModel,
                staticPages: staticPages
            }

        }, AdminChannelStaticPagesComponent)
    }


    @routeMap("/admin/channel/edit/:id")
    async edit() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

            let channelViewModel = await this.channelWebService.get(routeTo.params.id)

            return {
                channelViewModel: channelViewModel
            }

        }, AdminChannelEditComponent)
    }

    @routeMap("/admin/channel/upgrade/:id")
    async upgrade() : Promise<ModelView> {
        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id)

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