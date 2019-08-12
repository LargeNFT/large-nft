import { Global } from "../../global";
import { Schema } from "../../dto/schema";
import { Post } from "../../dto/post";

const OrbitDB = require('orbit-db')
const sha256 = require('js-sha256');

class SchemaService {

    constructor() {}

    async loadMainStore(storeAddress) {

        let address = OrbitDB.parseAddress(storeAddress)
        let mainStore = await Global.orbitDb.open(address.toString())

        await mainStore.load()

        return mainStore

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

    async openCounter(address, accessController) {
        let feedAddress = OrbitDB.parseAddress(address)
        return Global.orbitDb.counter(feedAddress.toString(), {
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


    async getSchemaByWalletAddress(walletAddress:string) : Promise<Schema> {
        let mainStore = await this.getMainStoreByWalletAddress(walletAddress)
        return this.getSchema(mainStore)
    }

    async getMainStoreByWalletAddress(walletAddress:string) {

        let mainStoreName = this._getMainStoreNameSeed(walletAddress)


        let mainStore = await Global.orbitDb.docstore(mainStoreName, {
          indexBy: 'name',
          accessController: Global.orbitAccessControl
        })

        await mainStore.load()

        return mainStore

    }


    async getProfileStoreByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.openDocstore(schema.profileStore, Global.orbitAccessControl)
    }

    // async getPostFeedCounterByWalletAddress(walletAddress: string) {
    //     let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
    //     return this.openCounter(schema.postFeedCounter, Global.orbitAccessControl) 
    // }


    async getPostFeedByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.openFeed(schema.postFeed, Global.orbitAccessControl)
    }


    // async getPostKeyValueByWalletAddress(walletAddress: string) {
    //     let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
    //     return this.openFeed(schema.postKeyValue, Global.orbitAccessControl)
    // }


    async getRepliesPostFeed(post:Post, translatedContent: string) {

        let repliesFeedName = this._getRepliesFeedNameSeed(post, translatedContent)

        let repliesFeed = await Global.orbitDb.feed(repliesFeedName, {
            accessController: Global.orbitAccessControl
          })

        return repliesFeed

    }

    async getRepliesPostFeedAddress(post:Post, translatedContent: string) : Promise<string> {
        let feed = await this.getRepliesPostFeed(post, translatedContent)

        let address: string = feed.address.toString()

        return address
    }



    getOrbitAddress(orbitCid:string, walletAddress:string) : string {
        return `/orbitdb/${orbitCid}/mainStore-${walletAddress.toLowerCase()}`
    }



    private _getMainStoreNameSeed(walletAddress:string ): string  {
        return `mainStore-${walletAddress.toLowerCase()}` 
    }

    private _getProfileStoreNameSeed(walletAddress:string ): string  {
        return `profile-${walletAddress.toLowerCase()}` 
    }

    private _getPostFeedNameSeed(walletAddress:string ) : string {
        return `post-${walletAddress.toLowerCase()}` 
    }

    private _getPostFeedCounterNameSeed(walletAddress:string ) : string {
        return `post-counter-${walletAddress.toLowerCase()}` 
    }

    private _getRepliesFeedNameSeed(post:Post, translatedContent: string) : string {
        let hash = sha256(`${post.owner}-${post.dateCreated}-${translatedContent}`)

        return `post-${hash}`
    }


    async generateSchema(orbitdb, accessController, mainStore, walletAddress:string) {

        console.log('Generating schema')
    
        let profileStore = await this.generateProfileStore(orbitdb, accessController, walletAddress)
        let postFeed = await this.generatePostFeed(orbitdb, accessController, walletAddress)

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


    async updateSchema(mainStore, schema:Schema, walletAddress:string) {
        
        //Make sure schema has all fields
        let schemaUpdated:boolean = false

        if (!schema.profileStore) {
            let profileStore = await this.generateProfileStore(Global.orbitDb, Global.orbitAccessControl, walletAddress)
            schema.profileStore = profileStore.address.toString()
            schemaUpdated = true
        }

        if (!schema.postFeed) {
            let postFeed = await this.generatePostFeed(Global.orbitDb, Global.orbitAccessControl, walletAddress)
            schema.postFeed = postFeed.address.toString()
            schemaUpdated = true
        }


        if (schemaUpdated) {

            console.log("Updating schema")

            await mainStore.put({
                name: "schema",
                value: schema
            })
        }

    }


    async generateProfileStore(orbitdb, accessController, walletAddress:string) {
        
        console.log("Generating profile store")

        //Create profile store
        let profileStoreName = this._getProfileStoreNameSeed(walletAddress)
        
        return orbitdb.docstore(profileStoreName, {
          create: true,
          indexBy: 'name',
          accessController: accessController
        })
    
    }




    async generatePostFeed(orbitdb, accessController, walletAddress:string) {

        console.log("Generating post feed")

        let postFeedName = this._getPostFeedNameSeed(walletAddress)

        return orbitdb.feed(postFeedName, {
          create: true,
          accessController: accessController
        })

    }

    // async generatePostFeedCounter(orbitdb, accessController, walletAddress:string) {

    //     console.log("Generating post feed counter")

    //     let postFeedCounterName = this._getPostFeedCounterNameSeed(walletAddress)

    //     return orbitdb.counter(postFeedCounterName, {
    //         create: true,
    //         accessController: accessController
    //     })
    // }


}


export {
    SchemaService
}