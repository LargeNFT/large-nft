class SettingsController {

    constructor(settingsService) {
        const self = this;

        this.settingsService = settingsService

        $$(document).on('click', '#settings-save', function(e) {
            self.saveButtonClicked(e)
        });
    }

    async showSettingsForm() {

        const settings = this.settingsService.getSettings()

        return new ModelView(settings, 'pages/settings.html')

    }

    async saveButtonClicked(e) {

        //Get the form data
        var settingsData = app.form.convertToData('#settings-form');

        //Save it
        settingsService.saveSettings(settingsData)

        app.methods.navigate("/?reinit=true");

    }

}
