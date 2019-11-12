import { Global } from "./global"
import Web from 'large-web'
import Core from 'large-core'


const routes = function (baseurl) {

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
        path: '/admin/profile/static/:id',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.adminProfileController.showStaticProfile(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })

    routes.push({
        path: '/admin/profile',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.adminProfileController.showProfileEdit())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/admin/post',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPostController.showIndex())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }
        }
    })

    routes.push({
        path: '/admin/post/create',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPostController.showCreate())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }
        }
    })


    routes.push({
        path: '/admin/post/show/:id',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPostController.showPost(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/admin/post/edit/:id',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPostController.showEdit(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })



    routes.push({
        path: '/admin/page',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPageController.showIndex())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }
        }
    })



    routes.push({
        path: '/admin/page/create',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPageController.showCreate())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }
        }
    })


    routes.push({
        path: '/admin/page/show/:id',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPageController.showPage(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })


    routes.push({
        path: '/admin/page/edit/:id',
        async async(routeTo, routeFrom, resolve, reject) {
            try {
                Web.modelViewService.resolve(resolve, Global.adminPageController.showEdit(routeTo.params.id))
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })



    routes.push({
        path: '/admin/settings',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.adminSettingsController.showIndex())
            } catch (ex) {
                Global.uiService.showExceptionPopup(ex)
            }

        }
    })









    routes.push({
        path: '/admin/user',
        async async(routeTo, routeFrom, resolve, reject) {

            try {
                Web.modelViewService.resolve(resolve, Global.adminUserController.showIndex())
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
