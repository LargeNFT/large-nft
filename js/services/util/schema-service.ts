import { Global } from "../../global";
import { Schema } from "../../dto/schema";

const OrbitDB = require('orbit-db')


class SchemaService {

    constructor() {}

    async loadMainStore(storeAddress) {

        let address = OrbitDB.parseAddress(storeAddress)
        let mainStore = await Global.orbitDb.open(address.toString())

        await mainStore.load()

        return mainStore

    }

    async loadProfileStore(storeAddress, accessController) {

        let profileStore = await this.openDocstore(storeAddress, accessController)

        await profileStore.load()

        return profileStore
    }

    async loadPostFeed(storeAddress, accessController) {

        let postFeed = await this.openFeed(storeAddress, accessController)

        await postFeed.load(100)

        return postFeed
    }


    async openDocstore(address, accessController) {

        let docstoreAddress = OrbitDB.parseAddress(address)
        return Global.orbitDb.docstore(docstoreAddress.toString(), {
          accessController: accessController
        })

    }

    async openFeed(address, accessController) {

        let feedAddress = OrbitDB.parseAddress(address)
        return Global.orbitDb.feed(feedAddress.toString(), {
          accessController: accessController
        })

    }


    async getSchema(store) : Promise<Schema> {

        let schema:Schema 

        let results = await store.get('schema')

        if (results && results[0] && results[0].value) {
            schema = results[0].value
        }

        return schema 
    }


    // async getSchemaByWalletAddress(walletAddress:string) : Promise<Schema> {

    //     let mainStore = await this.getMainStoreByWalletAddress(walletAddress)

    //     return this.getSchema(mainStore)

    // }

    async getMainStoreByWalletAddress(walletAddress:string) {

        let mainStoreName = this._getMainStoreNameSeed(walletAddress)


        let mainStore = await Global.orbitDb.docstore(mainStoreName, {
          indexBy: 'name',
          accessController: Global.orbitAccessControl
        })

        await mainStore.load()

        return mainStore

    }






    getOrbitAddress(orbitCid:string, walletAddress:string) : string {
        return `/orbitdb/${orbitCid}/mainStore-${walletAddress.toLowerCase()}`
    }



    private _getMainStoreNameSeed(walletAddress:string ) {
        return `mainStore-${walletAddress.toLowerCase()}` 
    }

    private _getProfileStoreNameSeed(walletAddress:string ) {
        return `profile-${walletAddress.toLowerCase()}` 
    }
    private _getPostFeedNameSeed(walletAddress:string ) {
        return `post-${walletAddress.toLowerCase()}` 
    }


    async generateSchema(orbitdb, accessController, mainStore) {

        console.log('Generating schema')

        let profileStoreName = this._getProfileStoreNameSeed(window['currentAccount'])
        let profileStore = await orbitdb.docstore(profileStoreName, {
          create: true,
          indexBy: 'name',
          accessController: accessController
        })
    
    
        console.log('Created profile store')
    
        let postFeedName = this._getPostFeedNameSeed(window['currentAccount'])
        let postFeed = await orbitdb.feed(postFeedName, {
          create: true,
          accessController: accessController
        })
    
        console.log('Created post feed')
    
        let schema:Schema = {
          profileStore: profileStore.address.toString(),
          postFeed: postFeed.address.toString()
        }
    
        await mainStore.put({
          name: "schema",
          value: schema
        })
    
        console.log('Inserted schema into mainStore')
    
    }



}


export {
    SchemaService
}