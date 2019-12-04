import { ModelView } from "large-web"
import { SiteSettingsService } from "large-core/dist/services/site-settings-service"
import { SiteSettings } from "large-core/dist/dto/site-settings"
import { Global } from "../../global"
import { UiService } from "large-web"
import { SchemaService } from "large-core"
import { Dom7, Template7 } from "framework7/js/framework7.bundle"



var $$ = Dom7;


class AdminSettingsController {

    constructor(
        private siteSettingsService: SiteSettingsService,
        private uiService: UiService,
        private schemaService: SchemaService
    ) {}

    async showIndex(): Promise<ModelView> {

        return new ModelView( async () => {

            let siteSettings:SiteSettings = await SiteSettingsService.getForWallet(window['currentAccount'])



            let mainStore = await this.schemaService.getMainStoreByWalletAddress(window['currentAccount'])
            let schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])
            let mainStoreAddress = mainStore.address.toString()

            let stores = []

            //Add main store
            stores.push({
                name: "Main Store",
                address: mainStoreAddress,
                type: "drop-store"
            })

            //Collect info about the stores. Should probably move to a service.
            for (let field in schema) {

                let store = {
                    name: field,
                    address: schema[field],
                    type: "drop-store"
                }

                stores.push(store)
            }


            return {
                schema: schema,
                stores: stores,
                settings: siteSettings
            }

        }, 'pages/admin/settings/index.html')
    
    }

    async settingsSave(e) {

        var siteSettings: SiteSettings = Global.app.form.convertToData('#edit-settings-form')

        await this.siteSettingsService.put(window['currentAccount'], siteSettings)

        console.log(siteSettings)

        this.uiService.navigate("/", false, false)


    }


    async dropStoreClicked(e:Event) {

        console.log('Drop store clicked!')

        let id = $$(e.target).data('id')

        await this.schemaService.dropStore(id)

        // Create bottom toast
        var toastBottom = Global.app.toast.create({
            text: 'Store dropped'
        })

        toastBottom.open()

    }

}

export {
    AdminSettingsController
}