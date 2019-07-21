const Keystore = require('orbit-db-keystore')
const Identities = require('orbit-db-identity-provider')

const ethers = require('ethers')

const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')

class IdentityService {

    private identity

    
    async getIdentity(keypath) {

        if (this.identity) return this.identity

        Identities.addIdentityProvider(EthIdentityProvider)


        //@ts-ignore
        let provider = new ethers.providers.Web3Provider(web3.currentProvider)
        let signer = provider.getSigner(0)


        let keystore = Keystore.create(keypath)


        const type = EthIdentityProvider.type


        const options = {
            type: type,
            keystore: keystore,
            signer: signer
        }

        this.identity = await Identities.createIdentity(options)

        return this.identity
    }


    getAccessController(orbitdb) {
        return {
            write: [orbitdb.identity.publicKey]
        }
    }


}


export {
    IdentityService
}