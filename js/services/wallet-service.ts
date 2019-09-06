import { Global } from "../global"

const { ethers, Wallet } = require('ethers')



class WalletService {

    private walletDao 

    constructor() {
        
    }

    init() {
        if (this.walletDao) return
        this.walletDao = window['remote'].getGlobal('walletDao')
    }

    async createWallet(password) {

        this.init()

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

        this.init()

        let savedWallet = this.walletDao.loadWallet()

        if (!savedWallet) throw new Error("No wallet to unlock")

        let wallet = await Wallet.fromEncryptedJson(savedWallet, password)

        this.connectWallet(wallet)

    }

    async restoreWallet(recoverySeed:string, password: string) {

        this.init()

        let wallet =  Wallet.fromMnemonic(recoverySeed)

        if (!wallet) throw new Error("Error restoring wallet")


        //Encrypt with entered password
        let encryptedJsonWallet = await wallet.encrypt(password)        
        this.walletDao.saveWallet(encryptedJsonWallet)

        this.connectWallet(wallet)

    }

    getWallet() {
        this.init()
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