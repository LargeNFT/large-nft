import { HomeController } from "./controllers/home-controller"
import { ProfileController } from "./controllers/profile-controller"
import { ConnectController } from "./controllers/connect-controller"
import { PostController } from "./controllers/post-controller"
import { FollowController } from "./controllers/follow-controller"
import { WalletController } from "./controllers/wallet-controller"

import { Dom7, Template7 } from "framework7/js/framework7.bundle"


import { UiService } from "./services/ui-service"
import { UploadService } from "./services/upload-service"
import { PostUIService } from "./services/post-ui-service"
import { QuillService } from "./services/quill-service"

import Core from "large-core"
import { DashboardController } from "./controllers/admin/dashboard-controller"
import { AdminPostController } from "./controllers/admin/admin-post-controller"
import { AdminPageController } from "./controllers/admin/admin-page-controller"
import { AdminUserController } from "./controllers/admin/admin-user-controller"
import { PagingService } from "./services/page-service"


var $$ = Dom7

export namespace Global {

  /** Controllers */
  export var homeController: HomeController

  export var postController: PostController
  export var profileController: ProfileController
  export var connectController: ConnectController
  export var followController: FollowController
  export var walletController: WalletController

  /** Admin */
  export var dashboardController: DashboardController 
  export var adminPostController: AdminPostController
  export var adminPageController: AdminPageController
  export var adminUserController: AdminUserController

  export var uiService: UiService
  export var quillService:QuillService
  export var uploadService:UploadService = new UploadService()
  export var postUiService:PostUIService

  /** Template7 Templates */
  export var postResultTemplate
  export var adminPostResultTemplate
  export var profileResultTemplate

  export var app

  export function getCore() {
    return Core
  }

  export async function loadComponentState(component, showSpinner = true) {
    return Global.uiService.loadComponentState(component, showSpinner)
  }

  export function initializeControllers() {

    Global.walletController = new WalletController(Core.walletService, Global.uiService)
    Global.homeController = new HomeController(Global.quillService, Global.postUiService, Core.profileService, Core.imageService, Core.feedMonitorService, Global.uiService)
    Global.profileController = new ProfileController(Global.uploadService, Core.profileService, Global.postUiService, Global.uiService, Core.imageService)
    Global.followController = new FollowController(Core.friendService, Core.profileService, Core.imageService, Global.uiService)
    Global.connectController = new ConnectController(Core.ipfs, Core.schemaService)
    Global.postController = new PostController(Global.quillService, Global.postUiService, Core.profileService, Core.imageService)


    Global.dashboardController = new DashboardController()
    Global.adminPostController = new AdminPostController(Global.quillService, Core.blogPostService, Global.uiService, Core.imageService, Core.profileService, Global.postUiService)
    Global.adminPageController = new AdminPageController()
    Global.adminUserController = new AdminUserController()

    window['walletController'] = Global.walletController
    window['homeController'] = Global.homeController
    window['profileController'] = Global.profileController
    window['followController'] = Global.followController
    window['connectController'] = Global.connectController
    window['postController'] = Global.postController

    window['dashboardController'] = Global.dashboardController
    window['adminPostController'] = Global.adminPostController
    window['adminPageController'] = Global.adminPageController

  }

  export async function init() {
    
    await Core.initialize()

    Global.postUiService = new PostUIService(Core.readOnlyPostService, Core.profileService, Core.schemaService, Core.imageService)
    Global.quillService = new QuillService(Global.uploadService, Core.imageService)

    Core.eventEmitter.on("unread-posts-updated", function (unreadPosts) {
      $$('.new-message-badge').html(unreadPosts)
      $$('.new-message-badge').removeClass('hide')
    })
  }

}
