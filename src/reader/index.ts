import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import {Workbox} from 'workbox-window'
import { Container } from "inversify"


import { getMainContainer } from "./inversify.config.js"
import { RoutingService } from "./service/core/routing-service.js"



let initReader = async (baseURI:string, hostname:string, version:string, channelId:string) => {

    console.log("Initializing Reader")

    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}${baseURI}sw-${version}.js?baseURI=${baseURI}`, {
            scope: `${hostname}${baseURI}`
        })

        let container:Container = new Container()
    
        let routes = RoutingService.getReaderRoutes(baseURI)

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

    let app:any = container.get("framework7")
    
    //Create the main view

    //Get URL
    let internalUrl = window.location.toString().replace(`${hostname}`, '')

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


export { initReader }

