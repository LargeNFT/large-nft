const Identities = require('orbit-db-identity-provider')

// const ethers = require('ethers')
const { utils, providers } = require('ethers')

const { Wallet } = require('ethers/wallet.js')

const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')

class IdentityService {

    private identity

    
    async getIdentity(keystore) {

        if (this.identity) return this.identity

        Identities.addIdentityProvider(EthIdentityProvider)

        //@ts-ignore
        let provider = new providers.Web3Provider(web3.currentProvider)
        let signer = provider.getSigner()

        signer.address = await signer.getAddress()



        const type = EthIdentityProvider.type


        const options = {
            type: type,
            keystore: keystore,
            wallet: signer
        }

        this.identity = await Identities.createIdentity(options)

        return this.identity
    }


    getAccessController(orbitdb) {
        return {
            write: [orbitdb.identity.id]
        }
    }


}


export {
    IdentityService
}