import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import { getMainContainer } from "./inversify.config.js"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'
// import 'material-icons/iconfont/material-icons.css'


import Framework7 from "framework7"
import {Workbox} from 'workbox-window'
import { StaticPage } from "./dto/static-page.js"
import { Container } from "inversify"
import { SchemaService } from "./service/core/schema-service.js"

import axios from "axios"

import './html/css/app.css'


let initReader = async (baseURI:string, hostname:string, version:string, routablePages:StaticPage[], channelId:string) => {

    console.log("Initializing Reader")


    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}${baseURI}sw-${version}.js?baseURI=${baseURI}`, {
            scope: `${hostname}${baseURI}`
        })

        let container:Container = new Container()
    
        container.bind("channelId").toConstantValue(() => {
            return channelId
        })

        container = await getMainContainer(container, baseURI, hostname, version, routablePages)


        if (navigator.serviceWorker.controller) {
            startApp(container, baseURI, version, hostname, routablePages)
        } else {
            wb.addEventListener('controlling', e => {
                startApp(container, baseURI, version, hostname, routablePages)
            })
        }

        wb.register()

    }


} 

let startApp = async (container:Container, baseURI:string, version:string, hostname:string, routablePages:StaticPage[]) => {

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


export { initReader }

