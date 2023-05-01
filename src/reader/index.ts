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
import { RoutingService } from "../admin/service/core/routing-service.js"


let initReader = async (baseURI:string, hostname:string, version:string, routablePages:StaticPage[]) => {

    console.log("Initializing Reader")


    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}${baseURI}sw-${version}.js?baseURI=${baseURI}`, {
            scope: `${hostname}${baseURI}`
        })

        let container:Container = new Container()
    

        let routes = getRoutes(baseURI, routablePages)
    

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

let getRoutes = (baseURI, routablePages) => {


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


    routes.push(...[
      {
        path: `${baseURI}`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'index.html')
        }
      },
      {
        path: `${baseURI}index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'index.html')
        }
      },


      {
        path: `${baseURI}mint.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'mint.html')
        }
      },

      {
        path: `${baseURI}search.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'search.html')
        }
      },



      {
        path: `${baseURI}explore.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'explore.html')
        }
      },


      {
        path: `${baseURI}activity`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'activity/index.html')
        }
      },

      {
        path: `${baseURI}activity/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'activity/index.html')
        }
      },


      {
        path: `${baseURI}leaderboard`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'leaderboard/index.html')
        }
      },

      {
        path: `${baseURI}leaderboard/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'leaderboard/index.html')
        }
      },


      {
        path: `${baseURI}sales`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'sales/index.html')
        }
      },

      {
        path: `${baseURI}sales/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'sales/index.html')
        }
      },



      {
        path: `${baseURI}attributes`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'attributes/index.html')
        }
      },

      {
        path: `${baseURI}attributes/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'attributes/index.html')
        }
      },


      {
        path: `${baseURI}attribute`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'attribute/index.html')
        }
      },


      {
        path: `${baseURI}attribute/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'attribute/index.html')
        }
      },



      {
        path: `${baseURI}u`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'u/index.html')
        }
      },

      {
        path: `${baseURI}u/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'u/index.html')
        }
      },


      {
        path: `${baseURI}u/activity`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'u/activity/index.html')
        }
      },

      {
        path: `${baseURI}u/activity/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'u/activity/index.html')
        }
      },


      {
        path: `${baseURI}list-:page.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, 'list-{{page}}.html')
        }
      },

      {
        path: `${baseURI}t/:tokenId`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, `t/{{tokenId}}/index.html`, { force: true })
        }
      },


      {
        path: `${baseURI}t/:tokenId/index.html`,
        async async({ resolve, reject }) {
          await RoutingService.resolveWithSpinner(resolve, `t/{{tokenId}}/index.html`, { force: true })
        }
      }

    ])

        
    if (routablePages?.length > 0) {
    
        for (let routablePage of routablePages) {
          
          routes.push({
            path: `${baseURI}${routablePage.slug}.html`,
            async async({ resolve, reject }) {
              await RoutingService.resolveWithSpinner(resolve, `${routablePage.slug}.html`)
            }
          })
  
        }
  
      }
  
      routes.push({
        path: '(.*)',
        //@ts-ignore
        async async({ resolve, reject, to }) {
          console.log(`404 error: ${to.path}`)
          await RoutingService.resolveWithSpinner(resolve, '404.html')
        }
      })

      return routes

}

export { initReader }

