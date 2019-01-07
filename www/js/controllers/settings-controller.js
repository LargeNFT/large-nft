class SettingsController {

    constructor() {
        const self = this;
        $$(document).on('click', '#settings-save', self.saveButtonClicked);
    }

    showSettingsForm() {
        const settings = localStorage.getObject("settings");
        
        app.form.fillFromData('#settings-form', settings);
    }

    async saveButtonClicked(e) {

        //Get the form data
        var settings = app.form.convertToData('#settings-form');

        //Save it
        localStorage.setObject("settings", settings);

        //Re-init the freedom object
        freedom = await Freedom({
            ipfsHost: settings.ipfsHost,
            ipfsPort: settings.ipfsPort,
            recordContractAddress: settings.recordContractAddress,
            recordContractTransactionHash: settings.recordContractTransactionHash
        });

        app.methods.navigate("/");

    }

}