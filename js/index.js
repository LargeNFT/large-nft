global.Framework7 = require('framework7')
global.Freedom = require('freedom-for-data')




const buffer = require('./lib/buffer.min.js')
const moment = require('./lib/moment.min.js')



const HomeService = require('./services/home-service.js')
const PostService = require('./services/post-service.js')
const ProfileService = require('./services/profile-service.js')
const SettingsService = require('./services/settings-service.js')
const QuillService = require('./services/quill-service.js')
const UploadService = require('./services/upload-service.js')
const TemplateService = require('./services/template-service.js')
const RouteService = require('./services/route-service.js')

const HomeController = require('./controllers/home-controller.js')
const SettingsController = require('./controllers/settings-controller.js')
const ProfileController = require('./controllers/profile-controller.js')
const PostController = require('./controllers/post-controller.js')

// Dom7
global.$$ = Dom7;


module.exports = function() {

  /** Shortcut methods for localStorage access */
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
  }

  Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  }
  /*********************************************/



//Probably because I don't know how to properly include this library. but this works
  Buffer = Buffer.Buffer;


  //Services
  let templateService = new TemplateService()
  let settingsService = new SettingsService()
  let quillService = new QuillService()
  let profileService = new ProfileService()
  let postService = new PostService(profileService, templateService)
  let routeService = new RouteService(settingsService)

  let uploadService = new UploadService()


  //Page Controllers
  global.settingsController = new SettingsController(settingsService)
  global.homeController = new HomeController(postService)
  global.profileController = new ProfileController(profileService, uploadService, postService)
  global.postController = new PostController(postService, profileService, quillService, uploadService)



  //Template7 helpers
  Template7.registerHelper('shortDate', function(date) {
    return moment(date).format('MMM D, YYYY')
  })


  //Detect page root
  const rootUrl = new URL(window.location)



  // Framework7 App main instance
  global.app = new Framework7({
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
    routes: routeService.getRoutes(rootUrl.pathname)

  });


// Init/Create main view
  const mainView = app.views.create('.view-main', {
    pushState: true
  });




}
