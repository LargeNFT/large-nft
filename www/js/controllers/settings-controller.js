class SettingsController {

    constructor(settingsService) {
        const self = this;

        this.settingsService = settingsService

        $$(document).on('click', '#settings-save', function(e) {
            self.saveButtonClicked(e)
        });
    }

    async showSettingsForm(resolve) {

        const settings = settingsService.getSettings()
        resolve({
            componentUrl: 'pages/settings.html'
        },
        {
            context: settings
        })

    }

    async saveButtonClicked(e) {

        //Get the form data
        var settingsData = app.form.convertToData('#settings-form');

        //Save it
        settingsService.saveSettings(settingsData)

        //Update global
        Template7.global = {
            settings: settingsData
        }

        //Re-init the freedom object
        freedom = await Freedom({
            ipfsHost: settingsData.ipfsHost,
            ipfsPort: settingsData.ipfsPort,
            recordContractAddress: settingsData.recordContractAddress,
            recordContractTransactionHash: settingsData.recordContractTransactionHash
        });

        app.methods.navigate("/");

    }

}
