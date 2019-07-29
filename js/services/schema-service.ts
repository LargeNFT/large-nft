import { Global } from "../global";
import { Schema } from "../dto/schema";

const OrbitDB = require('orbit-db')


class SchemaService {

    constructor() {}

    async loadMainStore(storeAddress) {

        let address = OrbitDB.parseAddress(storeAddress)
        Global.mainDb = await Global.orbitDb.open(address.toString())

        await Global.mainDb.load()

    }

    async loadProfileStore(storeAddress, accessController) {

        Global.profileStore = await this.openDocstore(storeAddress, accessController)

        await Global.profileStore.load()
    }


    async loadPostFeed(storeAddress, accessController) {

        Global.postFeed = await this.openFeed(storeAddress, accessController)

        await Global.postFeed.load(100)
    }



    async getSchema(store) : Promise<Schema> {

        let results = await store.get('schema')
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