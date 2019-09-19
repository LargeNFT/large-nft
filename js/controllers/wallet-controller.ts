import { Global } from "../global";
import { globalAgent } from "https";
import Core, { WalletService } from "large-core";
import Web, { ModelView, Dom7 } from "large-web";
import { UiService } from "../services/ui-service";

var $$ = Dom7

class WalletController {

    constructor(
        private walletService:WalletService,
        private uiService:UiService
    ) {
    }

    async initApp() {
        this.uiService.showSpinner()

        await Global.init()
        Global.initializeControllers()

        console.log('Wallet unlocked. Initializing and redirecting to home screen')

        this.uiService.hideSpinner()

        this.uiService.navigate("/")
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
            mnemonic: Core.wallet.mnemonic
        })



    }

    async createWalletFinishedClick(e:Event, component) {
        await this.initApp()
    }


    async unlockButtonClick(e:Event, component) {

        component.$setState({})

        var formData = Global.app.form.convertToData('#unlock-wallet-form');

        try {
            this.uiService.showSpinner()
            await this.walletService.unlockWallet(formData.password)
            await this.initApp()
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

            await this.initApp()
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