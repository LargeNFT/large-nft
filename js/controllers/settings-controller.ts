import { ModelView } from '../model-view'
import {Dom7} from "framework7";
import {SettingsService} from "../services/util/settings-service";
import {Global} from "../global";
import { SchemaService } from '../services/util/schema-service';
import { Schema } from '../dto/schema';


var $$ = Dom7;

class SettingsController {

    constructor(
        private settingsService: SettingsService,
        private schemaService:SchemaService
    ) {
        const self = this;


    }

    async showSettingsForm(): Promise<ModelView> {

        return new ModelView(async () => {

            let model = {
                settings: this.settingsService.getSettings(),
            }

            let mainStore = Global.mainStore
            
            if (mainStore) {
                model['schema'] = await this.schemaService.getSchema(mainStore, window['currentAccount'])
                model['mainStoreAddress'] = mainStore.address.toString()
            }


            return model 

        }, 'pages/settings.html')

    }

    async saveButtonClicked(e: Event) {

        //Get the form data
        var settingsData: Settings = Global.app.form.convertToData('#settings-form');

        //Save it
        this.settingsService.saveSettings(settingsData)

        Global.navigate("/?reinit=true")

    }


    async dropStoreClicked(e:Event) {

        let id = $$(e.target).data('id')

        await this.schemaService.dropStore(id)

        // Create bottom toast
        var toastBottom = Global.app.toast.create({
            text: 'Store dropped'
        })

        toastBottom.open()

    }

}




export { SettingsController }
