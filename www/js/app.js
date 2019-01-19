
/** Shortcut methods for localStorage access */
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}
/*********************************************/

// Dom7
const $$ = Dom7;

//Probably because I don't know how to properly include this library. but this works
Buffer = Buffer.Buffer;



let freedom;


//Services
let homeService = new HomeService()
let profileService = new ProfileService()
let postService = new PostService(profileService)
let settingsService = new SettingsService()

//Page Controllers
let settingsController = new SettingsController(settingsService)
let homeController = new HomeController(postService)
let profileController = new ProfileController(profileService)
let postController = new PostController(postService, profileService)





// Framework7 App main instance
const app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'freedom-for-data Demo', // App name
  theme: 'auto', // Automatic theme detection

  on: {
    init: function () { }
  },

  methods: {
    navigate: function (url) {
      this.view.main.router.navigate(url);
    }
  },

  // App routes
  routes: [
    {
      path: '/',
      async async(routeTo, routeFrom, resolve, reject) {

        //Load settings. If they don't exist show the settings form
        let settings = settingsService.getSettings()

        if (!settings) {
          resolveController(resolve, settingsController.showSettingsForm())
          return
        }

        const reinit = routeTo.query.reinit;

        if (!freedom || reinit) {
          try {
            await homeService.initialize(settings)
          } catch (ex) {
            showExceptionPopup(ex)
            resolveController(resolve, settingsController.showSettingsForm())
            return
          }
        }

        resolveController(resolve, homeController.showHomePage())

        //If the query param "url" is set that means we want to forward to that page instead
        //A way to make permalinks
        const url = routeTo.query.url;

        if (url) {
          app.router.navigate(url)
        }


      }
    },
    {
      path: '/settings',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, settingsController.showSettingsForm())
      }
    },

    {
      path: '/profile/show',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, profileController.showProfile())
      }
    },

    {
      path: '/profile/static/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, profileController.showStaticProfile(routeTo.params.id))
      }
    },

    {
      path: '/profile/edit',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, profileController.showProfileEdit())
      }
    },
    {
      path: '/profile/create',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, profileController.showCreateProfile())
      }
    },

    {
      path: '/post/show/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, postController.showPost(routeTo.params.id))
      }
    },

    {
      path: '/post/edit/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve, postController.showPostEdit(routeTo.params.id))
      }
    },

    {
      path: '/post/list',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve,postController.showPostList())
      }
    },

    {
      path: '/post/create',
      async async(routeTo, routeFrom, resolve, reject) {
        resolveController(resolve,postController.showCreatePost())
      }
    },

    // Default route (404 page). MUST BE THE LAST
    {
      path: '(.*)',
      url: 'pages/404.html',
    },
  ],

});



// Init/Create main view
const mainView = app.views.create('.view-main', {
  url: '/'
});


//Handles routing to a controller
async function resolveController(resolve, controller_promise) {

  try {

    let modelView = await controller_promise;


    resolve({
        componentUrl: modelView.view
      },
      {
        context: modelView.model
      })

  } catch (ex) {
    showExceptionPopup(ex)
    console.log(ex)
  }

}


async function showExceptionPopup(ex) {

  app.dialog.alert(ex.message, "There was an error")

}
