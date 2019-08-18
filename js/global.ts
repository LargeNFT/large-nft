import {HomeController} from "./controllers/home-controller";
import {SettingsController} from "./controllers/settings-controller";
import {ProfileController} from "./controllers/profile-controller";
import Framework7 from "framework7";
import { RouteService } from "./services/util/route-service";
import { TemplateService } from "./services/template-service";
import { SettingsService } from "./services/util/settings-service";
import { QuillService } from "./services/util/quill-service";
import { ProfileService } from "./services/profile-service";
import { QueueService } from "./services/util/queue_service";
import { PublicPostService } from "./services/public-post-service";
import { UploadService } from "./services/util/upload-service";
import { inherits } from "util";
import { IdentityService } from "./services/util/identity-service";
import { SchemaService } from "./services/util/schema-service";
import { WhitepagesService } from "./services/whitepages-service";
import { ConnectController } from "./controllers/connect-controller";
import { ListingService } from "./services/listing-service";
import { PostController } from "./controllers/post-controller";
import { FriendService } from "./services/friend-service";


export namespace Global {  
  
  /* These 4 are part of every app */
  export var listingService: ListingService
  export var whitepagesService: WhitepagesService
  export var schemaService: SchemaService
  export var identityService: IdentityService
  export var templateService: TemplateService
  export var settingsService: SettingsService
  export var queueService: QueueService
  export var routeService: RouteService

  /** Controllers */
  export var homeController: HomeController
  export var postController:PostController
  export var profileController: ProfileController
  export var settingsController: SettingsController
  export var connectController: ConnectController

  /** App specific services */
  // export var publicPostService:PublicPostService
  export var uploadService: UploadService
  export var quillService: QuillService
  // export var profileService: ProfileService

  /** The Framework7 app. Note: Try to make the rest of these typed some day. */
  export var app: any

  /** Orbit db api reference */
  export var orbitDb: any
  export var orbitAccessControl: any  //this is temporary. This will need to be refactored. Remove it and actually create access control


  /** Orbit db tables */
  export var mainStore: any
  // export var profileStore:any 
  // export var postFeed: any 

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

  export async function loadComponentState(component, showSpinner=true) {
    
    if (showSpinner) Global.app.preloader.show() 
    

    let context = component.$route.context

    //Get promise from component and await it. Then set the state to the result.
    let model = await context.fn() 

    component.$setState(model)
    
    if (showSpinner) Global.app.preloader.hide()
  }


}
