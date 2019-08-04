import { ModelView } from '../model-view'
import {Dom7} from "framework7";
import {SettingsService} from "../services/util/settings-service";
import {Global} from "../global";


var $$ = Dom7;

class SettingsController {

    constructor(private settingsService: SettingsService) {
        const self = this;

        $$(document).on('click', '#settings-save', function(e) {
            self.saveButtonClicked(e)
        });
    }

    async showSettingsForm(): Promise<ModelView> {

        return new ModelView(async () => {
            return this.settingsService.getSettings()
        }, 'pages/settings.html')

    }

    async saveButtonClicked(e: Event) {

        //Get the form data
        var settingsData: Settings = Global.app.form.convertToData('#settings-form');

        //Save it
        this.settingsService.saveSettings(settingsData)

        Global.navigate("/?reinit=true")

    }

}




export { SettingsController }
