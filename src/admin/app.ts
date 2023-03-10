import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"


import { getMainContainer } from "./inversify.config.js"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'

import './html/css/quill.snow.css'
import 'material-icons/iconfont/material-icons.css'
import '@yaireo/tagify/dist/tagify.css'
import './html/css/app.css'


import { RoutingService } from "./service/core/routing-service.js"



export default async(version) => {
                
    let container = getMainContainer(version)

    let app:any = container.get("framework7")
    let routingService:RoutingService = container.get(RoutingService)

    //Initialize routing
    app.routes.push(...routingService.buildRoutesForContainer(container))


    app.init()

}
