import { ModelView } from "../model-view";
import { WalletService } from "../services/wallet-service";
import { Global } from "../global";

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
            
            Global.wallet = await this.walletService.createWallet()
            Global.wallet = Global.wallet.connect(Global.provider)

            return {
                mnemonic: Global.wallet.mnemonic
            }

        }, 'pages/wallet/create-wallet.html')
    }

    async showEnterRecovery(): Promise<ModelView> {
        return new ModelView(async () => {
            return {}
        }, 'pages/wallet/enter-recovery.html')    }

}


export {
    WalletController
}