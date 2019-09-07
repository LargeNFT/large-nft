import { SettingsService } from "./settings-service";
import { Global } from "../../global";

import { ModelView } from "../../model-view";






// const level = require('level-js')



import { IdentityService } from "./identity-service";
import { SchemaService } from "./schema-service";
import { InitService } from "./init-service";



class RouteService {

  constructor(
    private initService: InitService
  ) { }


  getRoutes(baseurl) {

    const self = this

    window['settingsController'] = Global.settingsController

    const homeRoute = async function (routeTo, routeFrom, resolve, reject) {

      self.initAndResolve(resolve, function () {

        if (Global.isElectron) {
          
          if (window['currentAccount']) {
            return Global.homeController.showHomePage()
          } else {
            return Global.walletController.showLanding()
          }

        } else {
          return Global.homeController.showHomePage()
        }

      })

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
        self.resolveController(resolve, Global.walletController.showCreateWallet())
      }
    })

    routes.push({
      path: '/enterRecovery',
      async async(routeTo, routeFrom, resolve, reject) {
        self.resolveController(resolve, Global.walletController.showEnterRecovery())
      }
    })






    routes.push({
      path: '/settings',
      async async(routeTo, routeFrom, resolve, reject) {
        self.resolveController(resolve, Global.settingsController.showSettingsForm())
      }
    })


    routes.push({
      path: '/profile/static/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve, function () {
          return Global.profileController.showStaticProfile(routeTo.params.id)
        })

      }
    })

    routes.push({
      path: '/profile/edit',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve, function () {
          return Global.profileController.showProfileEdit()
        })
      }
    })


    routes.push({
      path: '/post/show/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve, function () {
          return Global.postController.showPost(routeTo.params.id)
        })

      }
    })


    routes.push({
      path: '/connect',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve, function () {
          return Global.connectController.showHome()
        })
      }
    })

    routes.push({
      path: '/following',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve, function () {
          return Global.followController.showFollowing()
        })
      }
    })


    // routes.push({
    //   path: '/tabs/',
    //   async async(routeTo, routeFrom, resolve, reject) {
    //     self.initAndResolve(resolve, function () {
    //       return Global.homeController.showTabs()
    //     })
    //   },
    //   tabs: [
    //     {
    //       path: '/',
    //       id: 'home',
    //       async async(routeTo, routeFrom, resolve, reject) {
    //         self.initAndResolve(resolve, function () {
    //           return Global.homeController.showHomePage()
    //         })
    //       },
    //     },
    //     {
    //       path: '/profile/:id',
    //       id: 'profile',
    //       async async(routeTo, routeFrom, resolve, reject) {
    //         self.initAndResolve(resolve, function () {
    //           return Global.profileController.showStaticProfile(routeTo.params.id)
    //         })
    //       },
    //     },
    //     {
    //       path: '/connect/',
    //       id: 'connect',
    //       async async(routeTo, routeFrom, resolve, reject) {
    //         self.initAndResolve(resolve, function () {
    //           return Global.connectController.showHome()
    //         })
    //       },
    //     }
    //   ]
    // })



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



  async initAndResolve(resolve, successFunction) {
    try {
      await this.initService.initialize()
      this.resolveController(resolve, successFunction())
    } catch (ex) {
      console.log(ex)
      Global.showExceptionPopup(ex)
      // Global.navigate("/settings")
    }
  }


  //Handles routing to a controller
  async resolveController(resolve, controller_promise: Promise<ModelView>) {

    try {

      let modelView: ModelView = await controller_promise;

      if (!modelView) return

      resolve({
        componentUrl: modelView.view
      },
        {
          context: { fn: modelView.model }
        })

    } catch (ex) {
      Global.showExceptionPopup(ex)
      console.log(ex)
    }

  }



}

export { RouteService }
