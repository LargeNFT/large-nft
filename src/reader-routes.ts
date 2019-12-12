import { Global } from "./global"
import Web, { ModelView } from 'large-web'
import Core from 'large-core'
import { resolve } from "dns"
import { ReaderGlobal } from "./reader-global"


const routes = function (baseurl) {

    let routes = [
    ]

    const homeRoute = async function (routeTo, routeFrom, resolve, reject) {
        defaultResolve(resolve,  ReaderGlobal.homeController.showIndex())
    }

    if (baseurl != '/') {
        routes.push({
            path: baseurl,
            async: homeRoute
        })
    }

    routes.push({
        path: '/',
        async: homeRoute
    })





    //Needs to be last
    routes.push({
        path: '(.*)',
        // url: 'pages/404.html',
        async async(routeTo, routeFrom, resolve, reject) {
            console.log(routeTo)
        }
    })

    return routes
}

function defaultResolve(resolve, promise: Promise<ModelView>) {
    try {
        Web.modelViewService.resolve(resolve, promise)
    } catch (ex) {
        Web.uiService.showExceptionPopup(ex)
    }
}




export default routes 
