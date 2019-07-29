import {HomeController} from "./controllers/home-controller";
import {SettingsController} from "./controllers/settings-controller";
import {ProfileController} from "./controllers/profile-controller";
import Framework7 from "framework7";
import { RouteService } from "./services/route-service";
import { TemplateService } from "./services/template-service";
import { SettingsService } from "./services/settings-service";
import { QuillService } from "./services/quill-service";
import { ProfileService } from "./services/profile-service";
import { QueueService } from "./services/queue_service";
import { PublicPostService } from "./services/public-post-service";
import { UploadService } from "./services/upload-service";
import { inherits } from "util";
import { IdentityService } from "./services/identity-service";
import { SchemaService } from "./services/schema-service";


export namespace Global {  
  
  /* These 4 are part of every app */
  export var schemaService: SchemaService
  export var identityService: IdentityService
  export var templateService: TemplateService
  export var settingsService: SettingsService
  export var queueService: QueueService
  export var routeService: RouteService

  /** Controllers */
  export var homeController: HomeController
  export var profileController: ProfileController
  export var settingsController: SettingsController

  /** App specific services */
  export var publicPostService:PublicPostService
  export var uploadService: UploadService
  export var quillService: QuillService
  export var profileService: ProfileService

  /** The Framework7 app. Note: Try to make the rest of these typed some day. */
  export var app: any

  /** Orbit db api reference */
  export var orbitDb: any
  export var orbitAccessControl: any 


  /** Orbit db tables */
  export var mainDb: any
  export var profileStore:any 
  export var postFeed: any 

  /** IPFS api client */
  export var ipfs: any  

  /** IPFS gateway */
  export var ipfsGateway

  export function navigate(url: string) {
    Global.app.view.main.router.navigate(url)
  }

  export function showExceptionPopup(ex) {

    if (ex.name == "IpfsException") {
      Global.app.dialog.alert(ex.message, "Problem connecting to IPFS")
    } else {
      Global.app.dialog.alert(ex.message, "There was an error")
    }
  }

}
