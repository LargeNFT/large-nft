class SettingsController {

    constructor(settingsService) {
        const self = this;

        this.settingsService = settingsService

        $$(document).on('click', '#settings-save', function(e) {
            self.saveButtonClicked(e)
        });
    }

    async showSettingsForm() {

        const settings = settingsService.getSettings()

        return new ModelView(settings, 'pages/settings.html')

    }

    async saveButtonClicked(e) {

        //Get the form data
        var settingsData = app.form.convertToData('#settings-form');

        //Save it
        settingsService.saveSettings(settingsData)

        //Update global
        Template7.global = {
            settings: settingsData,
            ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
        }

        //Re-init the freedom object
        freedom = await Freedom({
            ipfsHost: settingsData.ipfsHost,
            ipfsPort: settingsData.ipfsApiPort,
            recordContractAddress: settingsData.recordContractAddress,
            recordContractTransactionHash: settingsData.recordContractTransactionHash
        });

        app.methods.navigate("/");

    }

}
