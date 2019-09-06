import { ModelView } from "../model-view";
import { WalletService } from "../services/wallet-service";
import { Global } from "../global";
import { Dom7 } from "framework7";

var $$ = Dom7

class WalletController {

    constructor(
        private walletService:WalletService
    ) {
    }

    async showLanding(): Promise<ModelView> {
        return new ModelView(async () => {
            return {}
        }, 'pages/wallet/landing.html')
    }

    async showCreateWallet(): Promise<ModelView> {
        return new ModelView(async () => {
        }, 'pages/wallet/create-wallet.html')
    }

    async createWalletClick(e:Event, component) {

        //@ts-ignore
        document.getElementById("confirm-password").setCustomValidity("")

        var formData = Global.app.form.convertToData('#create-wallet-form');

        console.log(formData)

        if (formData.password != formData.confirmPassword) {
            console.log('here')
            //@ts-ignore
            document.getElementById("confirm-password").setCustomValidity("Passwords don't match")
        } else {
            Global.wallet = await this.walletService.createWallet()
            Global.wallet = Global.wallet.connect(Global.provider)
    
            component.$setState({
                mnemonic: Global.wallet.mnemonic
            })
        }



    }


    async showEnterRecovery(): Promise<ModelView> {
        return new ModelView(async () => {
            return {}
        }, 'pages/wallet/enter-recovery.html')    }

}


export {
    WalletController
}