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
import { Dom7 } from "framework7";
import { Template7 } from "framework7/js/framework7.bundle";
import { ConnectController } from "./controllers/connect-controller";

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
  Global.settingsController = new SettingsController(Global.settingsService, Global.schemaService)

  //Template7 helpers
  
  Template7.registerHelper('shortDate', function(date) {
    return moment(date).format('MMM D, YYYY')
  })


  //Global templates. Figure out a better place to do this. Leaving here for now because it needs to happen
  //before templates start getting rendered.


  Template7.registerPartial("profileResult", `
    <li>
      <div class="item-content" id="profile_{{_id}}">
        <div class="item-media">
          {{#if profilePic}}
            <img class="profile-pic-thumb" src="{{js "window.ipfsGateway"}}/{{profilePic}}">
          {{else}}
            <i class="f7-icons profile-pic-thumb">person</i>
          {{/if}}
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title"><span class="post-owner-display">{{name}}</span> <div class="post-owner">{{_id}}</div></div>
            <div class="item-after">
                {{#if following}}
                  <a class="button button-round button-fill button-small unfollow-link" data-id="{{_id}}" >Following</a>
                {{else}}
                  <a class="button button-round button-outline button-small follow-link" data-id="{{_id}}" >Follow</a>
                {{/if}}
            </div>
          </div>
          <div class="item-subtitle">{{aboutMe}}</div>
        </div>
      </div>
    </li>
  
`)

let postResult = `
  <li>
    <a href="/post/show/{{cid}}" class="item-link">
      <div class="item-content" id="post_{{cid}}">
        <div class="item-media">
          {{#if ownerProfilePic}}
            <img class="profile-pic-thumb" src="{{js "window.ipfsGateway"}}/{{ownerProfilePic}}">
          {{else}}
            <i class="f7-icons profile-pic-thumb">person</i>
          {{/if}}
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">
              <span class="post-owner-display">{{ownerDisplayName}}</span>
              <span class="post-owner">{{owner}}</span>
            </div>
            <div class="item-after">
              {{dateCreated}}
            </div>
          </div>
          <div class="item-subtitle post-content">{{contentTranslated}}</div>
        </div>
      </div>
    </a>
  </li>
`

Global.postResultTemplate = Template7.compile(postResult)
Template7.registerPartial("postResult", postResult)





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


  //Register global click listeners. Probably move somewhere else at some point.
  $$(document).on('click', '.follow-link', async function(e) {
    let controller:ConnectController = window['connectController']
    await controller.followClick(e)
  })
  

  $$(document).on('click', '.unfollow-link', async function(e) {
    let controller:ConnectController = window['connectController']
    await controller.unfollowClick(e)
  })
  
}
