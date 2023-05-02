import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Container } from "inversify"


import { getMainContainer } from "../reader/inversify.config.js"


import Framework7 from "framework7"
import {Workbox} from 'workbox-window'
import { SchemaService } from "../reader/service/core/schema-service.js"
import { RoutingService } from "../admin/service/core/routing-service.js"


//Import CSS
import '../reader/html/css/framework7-bundle.css'
import '../reader/html/css/framework7-icons.css'
import '../reader/html/css/app.css'



let initLibrary = async (libraryURL:string, baseURI:string, hostname:string, version:string) => {

    console.log("Initializing Library")
    
    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}/sw-library-${version}.js?baseURI=${libraryURL}`, {
            scope: `/`
        })
    
        let container:Container = new Container()


        let routes = RoutingService.getLibraryRoutes(libraryURL)


        container = await getMainContainer(container, baseURI, hostname, version, routes)

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
    let app:Framework7 = container.get("framework7")
    
    //Create the main view

    //Get URL
    let internalUrl = window.location.toString().replace(`${hostname}`, '')

    console.log(`internal URL ${internalUrl}`)

    const mainView = app.views.create('.view-main', {
        url: internalUrl
    })


    mainView.on("init", async (view) => {

        let schemaService:SchemaService = await container.get("SchemaService")
        await schemaService.load(['component-state'])

        console.log(`Navigating to ${internalUrl}`)
        //When the view loads lets reload the initial page so that we fire the component logic. 
        view.router.navigate(internalUrl, { reloadCurrent: true })
    })
    
    app.init()


}


export { initLibrary }

