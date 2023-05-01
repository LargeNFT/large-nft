import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Container } from "inversify"


import { getMainContainer } from "../reader/inversify.config.js"


//Import CSS
import '../reader/html/css/framework7-bundle.css'
import '../reader/html/css/framework7-icons.css'
// import 'material-icons/iconfont/material-icons.css'


import Framework7 from "framework7"
import {Workbox} from 'workbox-window'
import { StaticPage } from "../reader/dto/static-page.js"
import { SchemaService } from "../reader/service/core/schema-service.js"


import '../reader/html/css/app.css'
import { RoutingService } from "../admin/service/core/routing-service.js"


let initLibrary = async (libraryURL:string, baseURI:string, hostname:string, version:string, routablePages:StaticPage[]) => {

    console.log("Initializing Library")
    
    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${libraryURL}/sw-library-${version}.js?baseURI=${libraryURL}`, {
            scope: `${libraryURL}/`
        })
    
        let container:Container = new Container()


        let routes = await getRoutes(baseURI)


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

let getRoutes = (baseURI) => {


    const routes = []

    //Map the base route without a slash if it's longer than just a slash
    if (baseURI != "/" && baseURI.endsWith("/")) {

      routes.push({
        path: `${baseURI.substring(0, baseURI.length -1)}`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'index.html')
        }
      })

    }


    return routes

}



export { initLibrary }

