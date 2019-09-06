import { ModelView } from "../model-view";
import { WalletService } from "../services/wallet-service";
import { Global } from "../global";
import { Dom7 } from "framework7";
import { globalAgent } from "https";

var $$ = Dom7

class WalletController {

    constructor(
        private walletService:WalletService
    ) {
    }

    async showLanding(): Promise<ModelView> {
        return new ModelView(async () => {

            let existingWallet = await this.walletService.getWallet()

            return {
                showUnlock: (existingWallet)
            }

        }, 'pages/wallet/landing.html')
    }

    async showCreateWallet(): Promise<ModelView> {
        return new ModelView(async () => {
        }, 'pages/wallet/create-wallet.html')
    }

    async createWalletClick(e:Event, component) {

        component.$setState({})

        var formData = Global.app.form.convertToData('#create-wallet-form');

        //Validate
        if (formData.password != formData.confirmPassword) {

            component.$setState({
                errorMessage: "Passwords must match"
            })
        
            return
        }

        //Create new wallet
        await this.walletService.createWallet(formData.password)


        component.$setState({
            mnemonic: Global.wallet.mnemonic
        })



    }


    async unlockButtonClick(e:Event, component) {

        component.$setState({})

        var formData = Global.app.form.convertToData('#unlock-wallet-form');

        try {
            await this.walletService.unlockWallet(formData.password)
            console.log('Navigating to')
            Global.navigate("/")
        } catch(ex) {
            console.log(ex)
            component.$setState({
                errorMessage: "Error unlocking wallet"
            })
        }

    }



    async showEnterRecovery(): Promise<ModelView> {
        return new ModelView(async () => {
            return {}
        }, 'pages/wallet/enter-recovery.html')    
 
    }


    async restoreButtonClick(e:Event, component) {

        component.$setState({})

        var formData = Global.app.form.convertToData('#restore-account-form')

        //Validate
        if (formData.password != formData.confirmPassword) {

            component.$setState({
                errorMessage: "Passwords must match"
            })
        
            return
        }



        try {
            await this.walletService.restoreWallet(formData.recoverySeed, formData.password)
            console.log('Navigating to')
            Global.navigate("/")
        } catch(ex) {
            console.log(ex)
            component.$setState({
                errorMessage: ex.message
            })
        }



    }

}


export {
    WalletController
}