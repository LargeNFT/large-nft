class RouteService {

  constructor(settingsService, homeService) {
    this.settingsService = settingsService
    this.homeService = homeService
  }


  getRoutes(pathPrefix) {

    const self = this

    const routes = [
      {
        path: pathPrefix,
        async async(routeTo, routeFrom, resolve, reject) {

          let settings = self.settingsService.getSettings()

          if (!settings) {
            self.resolveController(resolve, settingsController.showSettingsForm())
            return
          }

          self.initAndResolve(resolve,function() {
            return homeController.showHomePage()
          })

        }
      },
      {
        path: pathPrefix + 'settings',
        async async(routeTo, routeFrom, resolve, reject) {

          self.resolveController(resolve, settingsController.showSettingsForm())

        }
      },

      {
        path: pathPrefix + 'profile/show',
        async async(routeTo, routeFrom, resolve, reject) {
          self.initAndResolve(resolve,function() {
            return profileController.showProfile()
          })
        }
      },

      {
        path: pathPrefix + 'profile/static/:id',
        async async(routeTo, routeFrom, resolve, reject) {

          self.initAndResolve(resolve,function() {
            return profileController.showStaticProfile(routeTo.params.id)
          })

        }
      },

      {
        path: pathPrefix + 'profile/edit',
        async async(routeTo, routeFrom, resolve, reject) {
          self.initAndResolve(resolve,function() {
            return profileController.showProfileEdit()
          })
        }
      },
      {
        path: pathPrefix + 'profile/create',
        async async(routeTo, routeFrom, resolve, reject) {

          self.initAndResolve(resolve,function() {
            return profileController.showCreateProfile()
          })

        }
      },

      {
        path: pathPrefix + 'post/show/:id',
        async async(routeTo, routeFrom, resolve, reject) {

          self.initAndResolve(resolve,function() {
            return postController.showPost(routeTo.params.id)
          })

        }
      },

      {
        path: pathPrefix + 'post/edit/:id',
        async async(routeTo, routeFrom, resolve, reject) {
          self.initAndResolve(resolve,function() {
            return postController.showPostEdit(routeTo.params.id)
          })
        }
      },

      {
        path: pathPrefix + 'post/list',
        async async(routeTo, routeFrom, resolve, reject) {

          self.initAndResolve(resolve,function() {
            return postController.showPostList()
          })
        }
      },

      {
        path: pathPrefix + 'post/create',
        async async(routeTo, routeFrom, resolve, reject) {
          self.initAndResolve(resolve,function() {
            return postController.showCreatePost()
          })
        }
      },

      // Default route (404 page). MUST BE THE LAST
      {
        path: '(.*)',
        // url: 'pages/404.html',
        async async(routeTo, routeFrom, resolve, reject) {
          console.log(routeTo)
        }
      },
    ]

    console.log(routes)

    return routes
  }



  async initAndResolve(resolve, successFunction) {
    try {
      await this.homeService.initialize()
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
