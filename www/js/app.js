
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
let templateService = new TemplateService()
let settingsService = new SettingsService()
let homeService = new HomeService(settingsService)
let quillService = new QuillService()
let profileService = new ProfileService()
let postService = new PostService(profileService, templateService)

let uploadService = new UploadService()


//Page Controllers
let settingsController = new SettingsController(settingsService)
let homeController = new HomeController(postService)
let profileController = new ProfileController(profileService, uploadService, postService)
let postController = new PostController(postService, profileService, quillService, uploadService)



//Template7 helpers
Template7.registerHelper('shortDate', function(date) {
  return moment(date).format('MMM D, YYYY')
})


// Framework7 App main instance
const app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'freedom-for-data Demo', // App name
  theme: 'auto', // Automatic theme detection



  on: {
    init: function () {
    }
  },

  methods: {
    navigate: function (url) {
      this.view.main.router.navigate(url);
    },

    showExceptionPopup: function(ex) {
      if (ex.name == "IpfsException") {
        app.dialog.alert(ex.message, "Problem connecting to IPFS")
      } else {
        app.dialog.alert(ex.message, "There was an error")
      }

    }

},

  // App routes
  routes: [
    {
      path: '/',
      async async(routeTo, routeFrom, resolve, reject) {

        let settings = settingsService.getSettings()

        if (!settings) {
          resolveController(resolve, settingsController.showSettingsForm())
          return
        }

        initAndResolve(resolve,function() {
          return homeController.showHomePage()
        })

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
        initAndResolve(resolve,function() {
          return profileController.showProfile()
        })
      }
    },

    {
      path: '/profile/static/:id',
      async async(routeTo, routeFrom, resolve, reject) {

        initAndResolve(resolve,function() {
          return profileController.showStaticProfile(routeTo.params.id)
        })

      }
    },

    {
      path: '/profile/edit',
      async async(routeTo, routeFrom, resolve, reject) {
        initAndResolve(resolve,function() {
          return profileController.showProfileEdit()
        })
      }
    },
    {
      path: '/profile/create',
      async async(routeTo, routeFrom, resolve, reject) {

        initAndResolve(resolve,function() {
          return profileController.showCreateProfile()
        })

      }
    },

    {
      path: '/post/show/:id',
      async async(routeTo, routeFrom, resolve, reject) {

        initAndResolve(resolve,function() {
          return postController.showPost(routeTo.params.id)
        })

      }
    },

    {
      path: '/post/edit/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        initAndResolve(resolve,function() {
          return postController.showPostEdit(routeTo.params.id)
        })
      }
    },

    {
      path: '/post/list',
      async async(routeTo, routeFrom, resolve, reject) {

        initAndResolve(resolve,function() {
          return postController.showPostList()
        })
      }
    },

    {
      path: '/post/create',
      async async(routeTo, routeFrom, resolve, reject) {
        initAndResolve(resolve,function() {
          return postController.showCreatePost()
        })
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
  url: '/',
  pushState: true
});


async function initAndResolve(resolve, successFunction) {
  try {
    await homeService.initialize()
    resolveController(resolve, successFunction())
  } catch(ex) {
    console.log(ex)
    app.methods.navigate("/settings")
  }
}


//Handles routing to a controller
async function resolveController(resolve, controller_promise) {

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

