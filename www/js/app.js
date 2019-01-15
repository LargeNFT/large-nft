
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

Buffer = Buffer.Buffer;



let freedom;


//Services
let profileService = new ProfileService();
let postService = new PostService(profileService);

let settingsService = new SettingsService();

//Page Controllers
let settingsController = new SettingsController(settingsService);
let homeController = new HomeController(postService);
let profileController = new ProfileController(profileService);
let postController = new PostController(postService, profileService);










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
    },

    appendFromTemplate: function (appendTo, templateSelector, viewModel) {
      var template = $$(templateSelector).html();
      var compiledTemplate = Template7.compile(template);

      var html = compiledTemplate(viewModel);

      $$(appendTo).append(html);
    }
  },

  // App routes
  routes: [
    {
      path: '/',
      async async(routeTo, routeFrom, resolve, reject) {

        //Load settings or home page
        let settings = settingsService.getSettings()

        if (!settings) {
          resolveController(resolve, settingsController.showSettingsForm())
        } else {

          Template7.global = {
            settings: settings,
            ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
          }

          if (!freedom) {
            freedom = await Freedom({
              ipfsHost: settings.ipfsHost,
              ipfsPort: settings.ipfsApiPort,
              recordContractAddress: settings.recordContractAddress,
              recordContractTransactionHash: settings.recordContractTransactionHash
            });
          }

          resolveController(resolve, homeController.showHomePage())

          // resolve({ url: 'pages/home.html' })

          //If the query param "url" is set that means we want to forward to that page instead
          //A way to make permalinks
          const url = routeTo.query.url;

          if (url) {
            app.router.navigate(url)
          }

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
    console.log(ex)
  }

}


