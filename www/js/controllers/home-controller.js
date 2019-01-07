class HomeController {

    async init() {

        //Initialize freedom-for-data
        if (!freedom) {
            let settings = localStorage.getObject("settings");

            freedom = await Freedom({
                ipfsHost: settings.ipfsHost,
                ipfsPort: settings.ipfsPort,
                recordContractAddress: settings.recordContractAddress,
                recordContractTransactionHash: settings.recordContractTransactionHash
            });
        }
    }
}