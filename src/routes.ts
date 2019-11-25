import { Global } from "./global"
import Web, { ModelView } from 'large-web'
import Core from 'large-core'
import { resolve } from "dns"


const routes = function (baseurl) {



    let routes = [
        {
            path: '/createWallet',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve, Global.walletController.showCreateWallet())
        },

        {
            path: '/enterRecovery',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.walletController.showEnterRecovery())
        },

        {
            path: '/admin/profile/static/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminProfileController.showStaticProfile(routeTo.params.id))
        },

        {
            path: '/admin/profile',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminProfileController.showStaticProfile(window['currentAccount']))
        },

        {
            path: '/admin/profile/edit',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminProfileController.showProfileEdit())
        },

        {
            path: '/admin/post',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPostController.showIndex())
        },

        {
            path: '/admin/post/create',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPostController.showCreate())
        },

        {
            path: '/admin/post/show/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPostController.showPost(routeTo.params.id))
        },

        {
            path: '/admin/post/edit/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPostController.showEdit(routeTo.params.id))
        },

        {
            path: '/admin/page',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPageController.showIndex())
        },

        {
            path: '/admin/page/create',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,   Global.adminPageController.showCreate())
        },

        {
            path: '/admin/page/show/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPageController.showPage(routeTo.params.id))
        },

        {
            path: '/admin/page/edit/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminPageController.showEdit(routeTo.params.id))
        },

        {
            path: '/admin/settings',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminSettingsController.showIndex())
        },

        {
            path: '/admin/user',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.adminUserController.showIndex())
        },

        {
            path: '/post/show/:id',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.postController.showPost(routeTo.params.id))
        },

        {
            path: '/connect',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.connectController.showHome())
        },

        {
            path: '/following',
            async: (routeTo, routeFrom, resolve, reject) => defaultResolve(resolve,  Global.followController.showFollowing())

        }


    ]



    const homeRoute = async function (routeTo, routeFrom, resolve, reject) {
        let promise

        if (Core.isElectron) {

            if (Core.wallet) {
                promise = Global.dashboardController.showIndex()
            } else {
                promise = Global.walletController.showLanding()
            }

        } else {
            promise = Global.dashboardController.showIndex()
        }


        try {
            Web.modelViewService.resolve(resolve, promise)
        } catch (ex) {
            Global.uiService.showExceptionPopup(ex)
        }

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
        Global.uiService.showExceptionPopup(ex)
    }
}




export default routes 
