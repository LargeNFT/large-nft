import {HomeController} from "./controllers/home-controller";
import {PostController} from "./controllers/post-controller";
import {SettingsController} from "./controllers/settings-controller";
import {ProfileController} from "./controllers/profile-controller";
import Framework7 from "framework7";
import { RouteService } from "./services/route-service";
import { TemplateService } from "./services/template-service";
import { SettingsService } from "./services/settings-service";
import { QuillService } from "./services/quill-service";
import { ProfileService } from "./services/profile-service";
import { QueueService } from "./services/queue_service";
import { PostService } from "./services/post-service";
import { UploadService } from "./services/upload-service";
import { inherits } from "util";


export namespace Global {  
  export var homeController: HomeController
  export var postController: PostController
  export var profileController: ProfileController
  export var settingsController: SettingsController

  export var templateService: TemplateService
  export var settingsService: SettingsService
  export var quillService: QuillService
  export var profileService: ProfileService
  export var queueService: QueueService
  export var postService: PostService
  export var routeService: RouteService
  export var uploadService: UploadService

  export var app: any

  export var freedom: any

  export function init() {

    Global.templateService = new TemplateService()
    Global.settingsService = new SettingsService()
    Global.quillService = new QuillService()
    Global.profileService = new ProfileService()
    Global.queueService = new QueueService(Global.templateService)
    Global.postService = new PostService(Global.profileService, Global.templateService)
    Global.routeService = new RouteService(Global.settingsService)
    Global.uploadService = new UploadService()


    //Page Controllers
    Global.settingsController = new SettingsController(Global.settingsService)
    Global.homeController = new HomeController(Global.postService)
    Global.profileController = new ProfileController(Global.profileService, Global.uploadService, Global.postService, Global.queueService)
    Global.postController = new PostController(Global.queueService, Global.postService, Global.profileService, Global.quillService, Global.uploadService)

    //Make controllers available in window so framework7 components can access them
    window['settingsController'] = Global.settingsController
    window['homeController'] = Global.homeController
    window['profileController'] = Global.profileController
    window['postController'] = Global.postController
  }

  export function setFreedom(freedom: any) {
    Global.postService.freedom = freedom
    Global.profileService.freedom = freedom
    Global.routeService.freedom = freedom
    Global.freedom = freedom
  }


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
