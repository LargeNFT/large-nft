import {Global} from "./global";

const Framework7: any = require('framework7/js/framework7.bundle')
import {Template7} from 'framework7/js/framework7.bundle'

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
import {QueueService} from "./services/queue_service";


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



  //Services/Controllers
  Global.init()


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

    // App routes
    routes: routeService.getRoutes(rootUrl.pathname)

  });


// Init/Create main view
  const mainView = Global.app.views.create('.view-main', {
    pushState: true
  })




}
