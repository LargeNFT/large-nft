import { Global } from "../global"

const { ethers, Wallet } = require('ethers')



class WalletService {

    private walletDao 

    constructor() {
        this.walletDao = window['remote'].getGlobal('walletDao')
    }

    async createWallet(password) {

        let wallet =  Wallet.createRandom()

        //Encrypt with entered password
        let encryptedJsonWallet = await wallet.encrypt(password)        
        this.walletDao.saveWallet(encryptedJsonWallet)
        
        this.connectWallet(wallet)

    }

    connectWallet(wallet) {
        Global.wallet = wallet
        Global.wallet = Global.wallet.connect(Global.provider)

        window['currentAccount'] = Global.wallet.address
    }



    async unlockWallet(password:string) {

        let savedWallet = this.walletDao.loadWallet()

        if (!savedWallet) throw new Error("No wallet to unlock")

        let wallet = await Wallet.fromEncryptedJson(savedWallet, password)

        this.connectWallet(wallet)

    }

    async restoreWallet(recoverySeed:string, password: string) {

        let wallet =  Wallet.fromMnemonic(recoverySeed)

        if (!wallet) throw new Error("Error restoring wallet")


        //Encrypt with entered password
        let encryptedJsonWallet = await wallet.encrypt(password)        
        this.walletDao.saveWallet(encryptedJsonWallet)

        this.connectWallet(wallet)

    }

    getWallet() {
        return this.walletDao.loadWallet()
    }

    logout() {
        Global.wallet = undefined
        window['currentAccount'] = undefined
    }


}

export {
    WalletService
}