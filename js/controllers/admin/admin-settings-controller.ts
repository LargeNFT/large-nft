import { ModelView } from "large-web"
import { SiteSettingsService } from "large-core/dist/services/site-settings-service"
import { SiteSettings } from "large-core/dist/dto/site-settings"
import { Global } from "../../global"
import { UiService } from "../../services/ui-service"

class AdminSettingsController {

    constructor(
        private siteSettingsService: SiteSettingsService,
        private uiService: UiService
    ) {}

    async showIndex(): Promise<ModelView> {

        return new ModelView( async () => {

            let siteSettings:SiteSettings = await SiteSettingsService.getForWallet(window['currentAccount'])
            return siteSettings

        }, 'pages/admin/settings/index.html')
    
    }

    async settingsSave(e) {

        var siteSettings: SiteSettings = Global.app.form.convertToData('#edit-settings-form')

        await this.siteSettingsService.put(window['currentAccount'], siteSettings)

        this.uiService.navigate("/", false, false)


    }


}

export {
    AdminSettingsController
}