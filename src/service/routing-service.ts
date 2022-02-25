import { ModelView } from "../util/model-view";
import { injectable, inject, Container } from "inversify";
import { Router } from "framework7/modules/router/router";
import { UiService } from "./ui-service";
import { container } from "../inversify.config"


@injectable()
class RoutingService {

    constructor(
        private uiService:UiService,
        @inject("framework7") public app
     ) {}


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

    public static buildRoutesForContainer(container:Container, uiService:UiService) : Router.RouteParameters[]  {

        let routes:Router.RouteParameters[] = []

        //Look up requestMappings 
        for (let mappedRoute of globalThis.mappedRoutes) {

            //Look up matching bean
            let controllerBean = container.get(mappedRoute.controllerClass)

            routes.push( {
                path: mappedRoute.path,
                async: async (ctx: Router.RouteCallbackCtx) => {
                    try {
                        await RoutingService.resolveRoute(ctx.to, ctx.resolve, controllerBean[mappedRoute.action](), mappedRoute.showSpinner, uiService)
                    } catch (ex) {
                        uiService.showExceptionPopup(ex)
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

    public submitForm(e: Event, formId: string, $) {

        e.preventDefault()

        let data = this.app.form.convertToData(formId)

        //@ts-ignore
        let form = $(formId)[0]

        //@ts-ignore
        if (!form.checkValidity()) return
        
        //@ts-ignore
        let action: string = $(form).attr('action')


        return this.navigate({
            path: action,
            query: data
        },
            {
                ignoreCache: true,
                browserHistory: false
            }
        )


    }


    static async resolveRoute(routeTo, resolve, controller_promise: Promise<ModelView>, showSpinner=true, uiService:UiService) {

        if (showSpinner) {
            uiService.showSpinner()
        }

        let modelView: ModelView = await controller_promise;
        if (!modelView) return

        let model:Function = await modelView.model
        let modelResult:any = await model(routeTo)


        // //Attach container to props.
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
            uiService.hideSpinner()
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