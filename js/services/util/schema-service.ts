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



    async getSchema(store) : Promise<Schema> {

        let results = await store.get('schema')
        let schema:Schema = results[0].value

        return schema 
    }

    async getSchemaByAddress(mainStoreAddress:string) : Promise<Schema> {

        let address = OrbitDB.parseAddress(mainStoreAddress)
        let remoteMainStore = await Global.orbitDb.open(address.toString())

        await remoteMainStore.load()

        let results = await remoteMainStore.get('schema')
        let schema:Schema = results[0].value

        return schema

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


}


export {
    SchemaService
}