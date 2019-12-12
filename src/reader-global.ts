import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { HomeController } from "./controllers/reader/home-controller"


import Web, { UiService } from "large-web"
import { UploadService } from "./services/upload-service"
import { PostUIService } from "./services/post-ui-service"
import { QuillService } from "./services/quill-service"

import Core, { Profile } from "large-core"



var $$ = Dom7

export namespace ReaderGlobal {

  /** Controllers */
  export var homeController: HomeController

  // export var uiService: UiService
  export var quillService: QuillService
  export var uploadService: UploadService = new UploadService()
  export var postUiService: PostUIService


  export var app

  export function getCore() {
    return Core
  }


  export function initializeControllers() {
        ReaderGlobal.homeController = new HomeController()
        window['homeController'] = ReaderGlobal.homeController
  }


  export async function init() {

    await Web.init(ReaderGlobal.app)
    await Core.initReader()

    ReaderGlobal.postUiService = new PostUIService(Core.readOnlyPostService, Core.profileService, Core.schemaService, Core.imageService)
    ReaderGlobal.quillService = new QuillService(ReaderGlobal.uploadService, Core.imageService)
  }





}
