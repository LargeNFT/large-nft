const { ethers, Wallet } = require('ethers')

class WalletService {

    constructor() {

    }

    async createWallet() {
        return Wallet.createRandom()
    }

}

export {
    WalletService
}