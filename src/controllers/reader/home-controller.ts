import Web, { ModelView } from "large-web"
import Core, { BlogPostService, Page, SiteSettingsService, PageService } from "large-core"
import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { ReaderGlobal } from "../../reader-global"
var $$ = Dom7



class HomeController {

    constructor(
        private pageService:PageService,
        private settingsService:SiteSettingsService
    ){}

    async showIndex(): Promise<ModelView> {

        let view:string 

        if (ReaderGlobal.loadedWallet) {
            view = 'pages/reader/loaded.html'
        } else {
            view = 'pages/reader/index.html'
        }

        return new ModelView(async () => {

            let homePage:Page

            if (ReaderGlobal.loadedWallet) {
                homePage = await this.pageService.readPermalink("home")
                console.log(homePage)
            } 

            return {
                page: homePage
            }

        }, view)
    }

    async loadWalletSubmit(e:Event) {

        $$('#not-found').hide()

        Web.uiService.showSpinner()

        let walletAddress = $$('#walletAddress').val()

        if (walletAddress) {
            try {
                await ReaderGlobal.loadSiteForWallet(walletAddress)
                Web.uiService.navigate("/")
            } catch(ex) {
                console.log(ex)
                $$('#not-found').show()
            }

        }

        Web.uiService.hideSpinner()

    }



}

export {
    HomeController
}