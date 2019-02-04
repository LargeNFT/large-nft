import {Global} from "./global";
import Framework7, {Template7} from "framework7";

const Freedom: any = require('freedom-for-data')

const moment = require('moment')


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



  //Services
  let templateService = new TemplateService()
  let settingsService = new SettingsService()
  let quillService = new QuillService()
  let profileService = new ProfileService()
  let postService = new PostService(profileService, templateService)
  let routeService = new RouteService(settingsService)

  let uploadService = new UploadService()


  //Page Controllers
  Global.settingsController = new SettingsController(settingsService)
  Global.homeController = new HomeController(postService)
  Global.profileController = new ProfileController(profileService, uploadService, postService)
  Global.postController = new PostController(postService, profileService, quillService, uploadService)



  //Template7 helpers
  Template7.registerHelper('shortDate', function(date) {
    return moment(date).format('MMM D, YYYY')
  })


  //Detect page root
  // @ts-ignore
  const rootUrl = new URL(window.location)



  // Framework7 App main instance
  Global.app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'freedom-for-data Demo', // App name
    theme: 'auto', // Automatic theme detection



    on: {
      init: function () {
      }
    },

    methods: {

      // @ts-ignore
      navigate: function (url) {
        this.view.main.router.navigate(url);
      },

      // @ts-ignore
      showExceptionPopup: function(ex) : void {
        if (ex.name == "IpfsException") {
          Global.app.dialog.alert(ex.message, "Problem connecting to IPFS")
        } else {
          Global.app.dialog.alert(ex.message, "There was an error")
        }

      }

    },

    // App routes
    routes: routeService.getRoutes(rootUrl.pathname)

  });


// Init/Create main view
  const mainView = Global.app.views.create('.view-main', {
    pushState: true
  });




}
