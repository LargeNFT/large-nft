class RouteService {

  constructor(settingsService) {
    this.settingsService = settingsService
  }


  getRoutes(baseurl) {

    const self = this


    const homeRoute = async function(routeTo, routeFrom, resolve, reject) {

      let settings = self.settingsService.getSettings()

      if (!settings) {
        self.resolveController(resolve, settingsController.showSettingsForm())
        return
      }

      self.initAndResolve(resolve,function() {
        return homeController.showHomePage()
      })

    }

    let routes = []

    if (baseurl != '/') {
      routes.push(      {
        path: baseurl,
        async: homeRoute
      })
    }

    routes.push(      {
      path: '/',
      async: homeRoute
    })



    routes.push({
      path: '/settings',
      async async(routeTo, routeFrom, resolve, reject) {
        self.resolveController(resolve, settingsController.showSettingsForm())
      }
    })


    routes.push({
      path: '/profile/show',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return profileController.showProfile()
        })
      }
    })


    routes.push({
      path: '/profile/static/:id',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return profileController.showStaticProfile(routeTo.params.id)
        })

      }
    })

    routes.push({
      path: '/profile/edit',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return profileController.showProfileEdit()
        })
      }
    })


    routes.push({
      path: '/profile/create',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return profileController.showCreateProfile()
        })

      }
    })

    routes.push({
      path: '/post/show/:id',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return postController.showPost(routeTo.params.id)
        })

      }
    })

    routes.push({
      path: '/post/edit/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return postController.showPostEdit(routeTo.params.id)
        })
      }
    })


    routes.push({
      path: '/post/list',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return postController.showPostList()
        })
      }
    })


    routes.push({
      path: '/post/create',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return postController.showCreatePost()
        })
      }
    })


    routes.push({
      path: '(.*)',
      // url: 'pages/404.html',
      async async(routeTo, routeFrom, resolve, reject) {
        console.log(routeTo)
      }
    })


    console.log(routes)

    return routes
  }


  async initialize() {

    const settings = this.settingsService.getSettings()
    if (!settings) {
      throw 'No settings found'
    }

    Template7.global = {
      settings: settings,
      ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
    }

    global.freedom = await Freedom({
      ipfsHost: settings.ipfsHost,
      ipfsPort: settings.ipfsApiPort,
      recordContractAddress: settings.recordContractAddress,
      recordContractTransactionHash: settings.recordContractTransactionHash
    });

  }

  async initAndResolve(resolve, successFunction) {
    try {
      await initialize()
      this.resolveController(resolve, successFunction())
    } catch(ex) {
      console.log(ex)
      app.methods.showExceptionPopup(ex)
      app.methods.navigate("/settings")
    }
  }


  //Handles routing to a controller
  async resolveController(resolve, controller_promise) {

    try {

      let modelView = await controller_promise;

      if (!modelView) return

      resolve({
          componentUrl: modelView.view
        },
        {
          context: modelView.model
        })

    } catch (ex) {
      app.methods.showExceptionPopup(ex)
      console.log(ex)
    }

  }



}

module.exports = RouteService
