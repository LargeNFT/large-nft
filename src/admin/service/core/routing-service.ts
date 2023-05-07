import { ModelView } from "../../util/model-view.js";
import { injectable, inject, Container } from "inversify";
import { Router } from "framework7";
import { UiService } from "./ui-service.js";
import { container } from "../../inversify.config.js"


@injectable()
class RoutingService {

    constructor(
        private uiService:UiService,
        @inject("framework7") public app,
        @inject("baseURI") public baseURI:Function

     ) {}

    static resolveWithSpinner(resolve, url, options?) {

        if (!globalThis.app) return 

        globalThis.app.preloader.show()

        resolve({ 
          componentUrl: url, 
          options: options
        })
  
        globalThis.app.preloader.hide()

    }

    static getReaderRoutes (baseURI) {

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
    
        RoutingService.addSharedRoutes(routes, baseURI)
    
      
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

    static getLibraryRoutes (libraryURL) {


        const routes = [
          {
            path: `${libraryURL}`,
            async async({ resolve, reject }) {
              await RoutingService.resolveWithSpinner(resolve, `${libraryURL}/index.html`)
            }
          },

          {
            path: `${libraryURL}/`,
            async async({ resolve, reject }) {
              await RoutingService.resolveWithSpinner(resolve, `${libraryURL}/index.html`)
            }
          },


          {
            path: `${libraryURL}/index.html`,
            async async({ resolve, reject }) {
              await RoutingService.resolveWithSpinner(resolve, `${libraryURL}/index.html`)
            }
          }

        ]
    
        RoutingService.addSharedRoutes(routes, "/r/:reader_slug/")
    
        routes.push({
          path: '(.*)',
          //@ts-ignore
          async async({ resolve, reject, to }) {
            console.log(`404 error: ${to.path}`)
            await RoutingService.resolveWithSpinner(resolve, 'l/404.html')
          }
        })

        console.log(routes)

        return routes
    }

    private static addSharedRoutes(routes, baseURI) {
            
        let resolvedBaseURI

        if (baseURI.indexOf(':reader_slug') > 0) {
          resolvedBaseURI = baseURI.replace(":reader_slug", "{{reader_slug}}")
        } else {
          resolvedBaseURI = baseURI
        }


        routes.push(...[
            {
              path: `${baseURI}`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`)
              }
            },
            {
              path: `${baseURI}index.html`,
              async async({ resolve, reject }) {
                console.log()
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`)
              }
            },
      
      
            {
              path: `${baseURI}mint.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}mint.html`)
              }
            },
      
            {
              path: `${baseURI}search.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}search.html`)
              }
            },      
            {
              path: `${baseURI}explore.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}explore.html`)
              }
            },
            {
              path: `${baseURI}activity`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`)
              }
            },
            {
              path: `${baseURI}activity/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`)
              }
            },
            {
              path: `${baseURI}leaderboard`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}leaderboard/index.html`)
              }
            },
            {
              path: `${baseURI}leaderboard/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}leaderboard/index.html`)
              }
            },
            {
              path: `${baseURI}sales`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`)
              }
            },
            {
              path: `${baseURI}sales/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`)
              }
            },
            {
              path: `${baseURI}attributes`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`)
              }
            },
            {
              path: `${baseURI}attributes/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`)
              }
            },
            {
              path: `${baseURI}attribute`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`)
              }
            },
            {
              path: `${baseURI}attribute/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`)
              }
            },
            {
              path: `${baseURI}u`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`)
              }
            },
            {
              path: `${baseURI}u/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`)
              }
            },
            {
              path: `${baseURI}u/activity`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`)
              }
            },
            {
              path: `${baseURI}u/activity/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`)
              }
            },
            {
              path: `${baseURI}list-:page.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}list-{{page}}.html`)
              }
            },
            {
              path: `${baseURI}t/:tokenId`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true })
              }
            },
            {
              path: `${baseURI}t/:tokenId/index.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true })
              }
            },
            {
              path: `${baseURI}s/:slug.html`,
              async async({ resolve, reject }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}s/{{slug}}.html`)
              }
            }
      
        ])

    }

    public navigate(navigateParams:Router.NavigateParameters, routeOptions?: Router.RouteOptions, viewName:string='main') {

        console.log(`${viewName}: navigating to ${navigateParams.path}`)

        if (!routeOptions) routeOptions = {
            reloadCurrent: true,
            ignoreCache: false,
            browserHistory: true
        }

        let view = this.app.view[viewName]

        if (view) {
            view.router.navigate( navigateParams, routeOptions)
        } else {
            console.log(`Could not find view ${viewName}`)
        }

    }

    public navigateUrl(url:string, routeOptions?:Router.RouteOptions, viewName:string='main') {

        console.log(`${viewName}: navigating to ${url}`)

        let view = this.app.view[viewName]

        if (view) {
            view.router.navigate( url, routeOptions)
        } else {
            console.log(`Could not find view ${viewName}`)
        }

    }

    public buildRoutesForContainer(container:Container) : Router.RouteParameters[]  {

        let routes:Router.RouteParameters[] = []

        //Look up requestMappings 
        for (let mappedRoute of globalThis.mappedRoutes) {

            //Look up matching bean
            let controllerBean = container.get(mappedRoute.controllerClass)

            routes.push( {
                path: mappedRoute.path,
                async: async (ctx: Router.RouteCallbackCtx) => {
                    try {
                        await this.resolveRoute(ctx.to, ctx.resolve, controllerBean[mappedRoute.action](), mappedRoute.showSpinner)
                    } catch (ex) {
                        this.uiService.showExceptionPopup(ex)
                    }
                }
            })

        
        }


        //Needs to be last
        routes.push({
            path: '(.*)',
            // url: 'pages/404.html',
            async async(ctx: Router.RouteCallbackCtx) {
                // this.uiService.showPopup("Page was not found")
                console.log(`404 error: ${ctx.to.path}`)
            }
        })

        return routes

    }

    public async resolveRoute(routeTo, resolve, controller_promise: Promise<ModelView>, showSpinner=true) {

        if (showSpinner) {
            this.uiService.showSpinner("Loading...")
        }

        let modelView: ModelView = await controller_promise;
        if (!modelView) return

        let model:Function = await modelView.model
        let modelResult:any = await model(routeTo)


        //Attach container to props.
        let props = Object.assign({}, modelResult)
        props.container = container

        if (modelView.view) {
            
            //Load the new component if it's given to us. 
            resolve({
                component: modelView.view
            },
                {
                    props: props,
                    history: true,
                    browserHistory: true
                })    

        } 

        if (showSpinner) {
            this.uiService.hideSpinner()
        }

    }


}

interface RouteTo {
    context: any 
    params: any 
    url: string 
    path: string 
    query: any 
    name: string 
    hash: string 
    route: any 

}


interface Route {
    path: string 
    method: string 
}


export {
    RoutingService, Route, RouteTo
}
