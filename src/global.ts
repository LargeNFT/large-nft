import { AdminProfileController } from "./controllers/admin/admin-profile-controller"
import { ConnectController } from "./controllers/admin/connect-controller"
import { PostController } from "./controllers/post-controller"
import { FollowController } from "./controllers/follow-controller"
import { WalletController } from "./controllers/wallet-controller"

import { Dom7, Template7 } from "framework7/js/framework7.bundle"


import Web, { UiService } from "large-web"
import { UploadService } from "./services/upload-service"
import { PostUIService } from "./services/post-ui-service"
import { QuillService } from "./services/quill-service"

import Core, { Profile } from "large-core"
import { DashboardController } from "./controllers/admin/dashboard-controller"
import { AdminPostController } from "./controllers/admin/admin-post-controller"
import { AdminPageController } from "./controllers/admin/admin-page-controller"
import { AdminUserController } from "./controllers/admin/admin-user-controller"
import { PagingService } from "./services/page-service"
import { AdminSettingsController } from "./controllers/admin/admin-settings-controller"


var $$ = Dom7

export namespace Global {

  /** Controllers */
  export var postController: PostController
  // export var profileController: ProfileController
  export var connectController: ConnectController
  export var followController: FollowController
  export var walletController: WalletController

  /** Admin */
  export var dashboardController: DashboardController
  export var adminPostController: AdminPostController
  export var adminPageController: AdminPageController
  export var adminUserController: AdminUserController
  export var adminProfileController: AdminProfileController
  export var adminSettingsController: AdminSettingsController

  // export var uiService: UiService
  export var quillService: QuillService
  export var uploadService: UploadService = new UploadService()
  export var postUiService: PostUIService

  /** Template7 Templates */
  // export var postResultTemplate
  // export var adminPostResultTemplate
  export var profileResultTemplate
  // export var adminPageResultTemplate

  export var app

  export function getCore() {
    return Core
  }


  export function initializeControllers() {

    Global.walletController = new WalletController(Core.walletService, Web.uiService)
    // Global.homeController = new HomeController(Global.quillService, Global.postUiService, Core.profileService, Core.imageService, Core.feedMonitorService, Web.uiService)
    // Global.profileController = new ProfileController(Global.uploadService, Core.profileService, Global.postUiService, Global.uiService, Core.imageService)
    Global.followController = new FollowController(Core.friendService, Core.profileService, Core.imageService, Web.uiService)
    Global.connectController = new ConnectController(Core.ipfs, Core.schemaService)
    Global.postController = new PostController(Global.quillService, Global.postUiService, Core.profileService, Core.imageService)


    Global.dashboardController = new DashboardController()
    Global.adminPostController = new AdminPostController(Global.quillService, Core.blogPostService, Web.uiService, Core.imageService, Core.profileService, Global.postUiService)
    Global.adminPageController = new AdminPageController(Global.quillService, Web.uiService, Core.imageService, Core.profileService, Core.pageService)
    Global.adminUserController = new AdminUserController()
    Global.adminProfileController = new AdminProfileController(Global.uploadService, Core.profileService, Global.postUiService, Web.uiService, Core.imageService)
    Global.adminSettingsController = new AdminSettingsController(Core.siteSettingsService, Web.uiService, Core.schemaService)

    window['walletController'] = Global.walletController
    window['followController'] = Global.followController
    window['connectController'] = Global.connectController
    window['postController'] = Global.postController

    window['dashboardController'] = Global.dashboardController
    window['adminPostController'] = Global.adminPostController
    window['adminPageController'] = Global.adminPageController
    window['adminProfileController'] = Global.adminProfileController
    window['adminSettingsController'] = Global.adminSettingsController

  }

  export async function init() {

    await Web.init(Global.app)
    await Core.init()

    Global.postUiService = new PostUIService(Core.readOnlyPostService, Core.profileService, Core.schemaService, Core.imageService)
    Global.quillService = new QuillService(Global.uploadService, Core.imageService)

    Web.uiService.showSpinner()

    await Core.loadSiteForWallet(window['currentAccount'])
    await Global.setWalletInfo()

    Web.uiService.hideSpinner()

    Core.ipfs.libp2p.on('peer:discovery', async (peer) => {
      let peers = await Core.ipfs.swarm.peers()
      $$('.peers-badge').text(peers.length)
    })

  }


  export async function setWalletInfo() {

    let profile: Profile = await Core.profileService.getProfileByWallet(window['currentAccount'])

    let displayName: string
    let imageUrl: string

    if (profile && profile.name) {
      displayName = profile.name
    } else {
      displayName = window['currentAccount']
    }

    if (profile && profile.profilePic) {
      imageUrl = await Core.imageService.cidToUrl(profile.profilePic)
    }

    $$('#wallet-address').text(displayName)

    if (imageUrl) {
      $$('#wallet-image').attr("src", imageUrl)
      $$('#wallet-image').show()
      $$('#wallet-icon').hide()
    }

    $$('#wallet-list-item').show()

  }


}
