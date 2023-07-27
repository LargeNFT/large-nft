// import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Container } from "inversify"

import { getMainContainer } from "../reader/inversify.config.js"

import {Workbox} from 'workbox-window'

//Import CSS
import 'framework7/css/bundle'
import 'framework7-icons/css/framework7-icons.css'

import '../reader/html/css/app.css'
import './html/css/app.css'

import { HomeWebService } from "./service/web/home-web-service.js"
import { HomeRepository } from "./repository/home-repository.js"
import { HomeRepositoryBrowserImpl } from "./repository/web/home-repository-impl.js"
import { RoutingService } from "../reader/service/core/routing-service.js"

let initLibrary = async (libraryURL:string, baseURI:string, hostname:string, version:string, channelId:string) => {

    console.log("Initializing Library")
    
    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}/sw-library-${version}.js`, {
            scope: `/`
        })
    
        let container:Container = new Container()

        container.bind("libraryURL").toConstantValue(libraryURL)
        container.bind<HomeWebService>("HomeWebService").to(HomeWebService).inSingletonScope()
        container.bind<HomeRepository>("HomeRepository").to(HomeRepositoryBrowserImpl).inSingletonScope()


        let routes = RoutingService.getLibraryRoutes(libraryURL)

        container = await getMainContainer(container, baseURI, hostname, version, routes, channelId)

        if (navigator.serviceWorker.controller) {
            startApp(container, hostname)
        } else {
            wb.addEventListener('controlling', e => {
                startApp(container, hostname)
            })
        }

        wb.register()

    }


} 

let startApp = async (container:Container, hostname:string) => {

    // let container = getMainContainer(baseURI, version, routablePages)            
    let app:any = container.get("framework7")
    
    //Create the main view

    //Get URL
    let internalUrl = window.location.toString().replace(`${hostname}`, '')

    // console.log(`internal URL ${internalUrl}`)

    const mainView = app.views.create('.view-main', {
        url: internalUrl
    })


    mainView.on("init", async (view) => {

        console.log(`Navigating to ${internalUrl}`)
        //When the view loads lets reload the initial page so that we fire the component logic. 
        view.router.navigate(internalUrl, { reloadCurrent: true, animate: false })
    })
    
    app.init()


}

export { initLibrary }

