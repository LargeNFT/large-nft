import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { HomeController } from "./controllers/reader/home-controller"


import Web, { UiService } from "large-web"
import { UploadService } from "./services/upload-service"
import { PostUIService } from "./services/post-ui-service"
import { QuillService } from "./services/quill-service"

import Core, { Profile, timeout } from "large-core"



var $$ = Dom7

export namespace ReaderGlobal {

  export var loadedWallet:string 

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
        ReaderGlobal.homeController = new HomeController(Core.pageService, Core.siteSettingsService)
        window['homeController'] = ReaderGlobal.homeController
  }


  export async function init() {

    await Web.init(ReaderGlobal.app)
    await Core.initReader()

    ReaderGlobal.postUiService = new PostUIService(Core.readOnlyPostService, Core.profileService, Core.schemaService, Core.imageService)
    ReaderGlobal.quillService = new QuillService(ReaderGlobal.uploadService, Core.imageService)
  }

  
  export async function loadSiteForWallet(walletAddress:string) {

    class TimeoutLoader {  
      @timeout(5000)
      async load(walletAddress:string) {
        ReaderGlobal.loadedWallet = walletAddress
        return Core.loadSiteForWallet(walletAddress)
      }
    }

    let loader = new TimeoutLoader()

    return loader.load(walletAddress)

  }



}




