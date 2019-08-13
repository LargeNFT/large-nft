import {Global} from "./global";

const Framework7: any = require('framework7/js/framework7.bundle')
import { RouteService } from "./services/util/route-service";
import { SettingsService } from "./services/util/settings-service";
import { QueueService } from "./services/util/queue_service";
import { TemplateService } from "./services/template-service";
import { SettingsController } from "./controllers/settings-controller";
import { IdentityService } from "./services/util/identity-service";
import { SchemaService } from "./services/util/schema-service";
import { WhitepagesService } from "./services/whitepages-service";
import { Dom7, Template7 } from "framework7";

const moment = require('moment')
var $$ = Dom7;

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
  Global.identityService = new IdentityService()
  Global.settingsService = new SettingsService()
  Global.templateService = new TemplateService()
  Global.schemaService = new SchemaService()
  Global.queueService = new QueueService(Global.templateService)
  Global.routeService = new RouteService(Global.settingsService, Global.identityService, Global.schemaService)
  Global.settingsController = new SettingsController(Global.settingsService)

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
    routes: Global.routeService.getRoutes(rootUrl.pathname)

  });


// Init/Create main view
  const mainView = Global.app.views.create('.view-main', {
    pushState: true
  })


  window['Global'] = Global;

}
