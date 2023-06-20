import { injectable } from "inversify";
import { ModelView } from "../util/model-view.js";
import { routeMap } from "../util/route-map.js";
import { RouteTo } from '../service/core/routing-service.js';


import { AuthorWebService } from "../service/web/author-web-service.js";

import AdminAuthorShowComponent from '../components/admin/author/show.f7.html'
import AdminAuthorEditComponent from '../components/admin/author/edit.f7.html'
import { Author } from "../dto/author.js";
import { SchemaService } from "../service/core/schema-service.js";

@injectable()
class AuthorController {

    constructor(
        private authorWebService:AuthorWebService,
        private schemaService:SchemaService
    ) {}

    @routeMap("/admin/:channelId/author/show/:id")
    async show() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId)


            let authorViewModel

            try {
              authorViewModel = await this.authorWebService.get(routeTo.params.id)
            } catch(ex) {
              console.log(ex)
            } //might be missing


            //If it doesn't exist create an empty one
            if (!authorViewModel) {
              authorViewModel = Object.assign(new Author(), {
                author: {
                  walletAddress: routeTo.params.id
                }
              })
            }

            return {
                authorViewModel: authorViewModel
            }

        }, AdminAuthorShowComponent)
    }


    @routeMap("/admin/:channelId/author/edit/:id")
    async edit() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId)

            let authorViewModel

            try {
              authorViewModel = await this.authorWebService.get(routeTo.params.id)
            } catch(ex) {}
            
            //If it doesn't exist create an empty one
            if (!authorViewModel) {
              authorViewModel = Object.assign(new Author(), {
                author: {
                  walletAddress: routeTo.params.id
                }
              })
            }

            return {
                authorViewModel: authorViewModel
            }

        }, AdminAuthorEditComponent)
    }

}

export {
    AuthorController
}