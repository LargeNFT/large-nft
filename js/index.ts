import {Global} from "./global";
const Framework7: any = require('framework7')

const Freedom: any = require('freedom-for-data')

const moment = require('moment')


import {PostService} from './services/post-service'
import {ProfileService} from './services/profile-service'
import {SettingsService} from './services/settings-service'
import {QuillService} from './services/quill-service'
import {UploadService} from './services/upload-service'
import {TemplateService} from './services/template-service'
import {RouteService} from './services/route-service'

import {HomeController} from './controllers/home-controller'
import {SettingsController} from './controllers/settings-controller'
import {ProfileController} from './controllers/profile-controller'
import {PostController}  from './controllers/post-controller'
import {Template7} from "framework7";



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

  //Make controllers available in window so framework7 components can access them
  window['settingsController'] = Global.settingsController
  window['homeController'] = Global.homeController
  window['profileController'] = Global.profileController
  window['postController'] = Global.postController


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
  })




}
