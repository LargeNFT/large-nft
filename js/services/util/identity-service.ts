import { Global } from "../../global";

const Identities = require('orbit-db-identity-provider')

// const ethers = require('ethers')
const { utils, providers } = require('ethers')

const { Wallet } = require('ethers/wallet.js')

const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')

class IdentityService {

    private identity

    constructor(
    ){}
    

    async getIdentity(keystore) {

        if (this.identity) return this.identity

        Identities.addIdentityProvider(EthIdentityProvider)

        const type = EthIdentityProvider.type


        const options = {
            type: type,
            keystore: keystore,
            wallet: Global.wallet
        }

        this.identity = await Identities.createIdentity(options)

        return this.identity
    }


    getAccessController(orbitdb) {
        return {
            write: ['*']//[orbitdb.identity.id]
        }
    }


}


export {
    IdentityService
}