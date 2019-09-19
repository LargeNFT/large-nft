import { Global } from "./global"
import Web from 'large-web'
import Core from 'large-core'


const routes = function (baseurl) {

    const homeRoute = async function (routeTo, routeFrom, resolve, reject) {

        let promise

        if (Core.isElectron) {

            if (Core.wallet) {
                promise = Global.homeController.showHomePage()
            } else {
                promise = Global.walletController.showLanding()
            }

        } else {
            promise = Global.homeController.showHomePage()
        }


        try {
            Web.modelViewService.resolve(resolve, promise)
        } catch (ex) {
            Global.uiService.showExceptionPopup(ex)
        }

    }

    let routes = []

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


    routes.push({
        path: '/createWallet',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.walletController.showCreateWallet())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })

    routes.push({
        path: '/enterRecovery',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.walletController.showEnterRecovery())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/profile/static/:id',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.profileController.showStaticProfile(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })

    routes.push({
        path: '/profile/edit',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.profileController.showProfileEdit())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/post/show/:id',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.postController.showPost(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/connect',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.connectController.showHome())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })

    routes.push({
        path: '/following',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.followController.showFollowing())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
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

export default routes 
