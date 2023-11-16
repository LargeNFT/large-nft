import "regenerator-runtime/runtime"
import "reflect-metadata"


import { getMainContainer } from "./inversify.config.js"

import {Workbox} from 'workbox-window'

//Import CSS
import 'framework7/css/bundle'
import 'framework7-icons/css/framework7-icons.css'

import './html/css/quill.snow.css'
import 'material-icons/iconfont/material-icons.css'
import '@yaireo/tagify/dist/tagify.css'
import './html/css/app.css'



import { RoutingService } from "./service/core/routing-service.js"


export default async(version) => {
    
    // let pathname = globalThis.location.pathname
    // let filename = pathname.replace(/^.*[\\/]/, '')
    let rootPath = "/large"

    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${rootPath}/sw-admin-${version}.js`, {
            scope: `${rootPath}/`
        })

        startApp(version)

        wb.register()

    }

}


const startApp = (version) => {

    let container = getMainContainer(version)

    let app:any = container.get("framework7")
    let routingService:RoutingService = container.get(RoutingService)

    //Initialize routing
    app.routes.push(...routingService.buildRoutesForContainer(container))

    app.init()

}