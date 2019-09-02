import { Global } from "../../global";
import { Schema } from "../../dto/schema";
import { Post } from "../../dto/post";
import { Friend } from "../../dto/friend";

const OrbitDB = require('orbit-db')
const OrbitDBAddress = require('orbit-db/src/orbit-db-address.js')

const sha256 = require('js-sha256')

import { timeout } from '../../timeout-promise'

class SchemaService {

    constructor(
    ) {}


    async getSchema(store, walletAddress:string) : Promise<Schema> {

        let schema:Schema

        let results = await store.get(walletAddress)

        if (results && results[0] && results[0].value) {
            schema = results[0].value
        }

        return schema
    }


    async getSchemaByWalletAddress(walletAddress:string) : Promise<Schema> {

        let mainStore = await this.getMainStoreByWalletAddress(walletAddress)
        let schema:Schema = await this.getSchema(mainStore, walletAddress)

        if (!schema) throw new Error(`Schema for wallet ${walletAddress} could not be found`)

        return schema
    }

    // @timeout(5000)
    async getMainStoreByWalletAddress(walletAddress:string) {

        let mainStore
        let mainStoreName = this._getMainStoreNameSeed(walletAddress)

        //get name
        let mainStoreAddress = await Global.orbitDb.determineAddress(mainStoreName, 'docstore', {
            accessController: Global.orbitAccessControl //This might cause issues in the future. Do we need to
        })

        //Try to open it
        mainStore = await Global.orbitDb.open(mainStoreAddress)
        await mainStore.load()

        return mainStore

    }

    async getMainFeedByWalletAddress(walletAddress: string) {

        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)

        return Global.orbitDb.open(schema.mainFeed)
    }


    async getProfileStoreByWalletAddress(walletAddress: string) {

        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)

        let profileStore = await Global.orbitDb.open(schema.profileStore)

        return profileStore
    }


    async getPostFeedByWalletAddress(walletAddress: string) {

        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)

        return Global.orbitDb.open(schema.postFeed)
    }

    async getFriendStoreByWalletAddress(walletAddress: string) {

        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)

        return Global.orbitDb.open(schema.friendStore)
    }

    async reopenStore(store: any) {

        let orbitAddress = store.address.toString()
        await store.close()

        return Global.orbitDb.open(orbitAddress)

    }

    async dropStore(address:string) {
        let store = await Global.orbitDb.open(address)
        await store.drop()
    }



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
    private _getMainFeedNameSeed(walletAddress:string ) : string {
        return `mainFeed-${walletAddress.toLowerCase()}`
    }


    private _getProfileStoreNameSeed(walletAddress:string ): string  {
        return `profile-${walletAddress.toLowerCase()}`
    }

    private _getPostFeedNameSeed(walletAddress:string ) : string {
        return `post-${walletAddress.toLowerCase()}`
    }

    private _getFriendStoreNameSeed(walletAddress:string ) : string {
        return `friend-${walletAddress.toLowerCase()}`
    }

    private _getPostFeedCounterNameSeed(walletAddress:string ) : string {
        return `post-counter-${walletAddress.toLowerCase()}`
    }

    private _getRepliesFeedNameSeed(post:Post, translatedContent: string) : string {
        let hash = sha256(`${post.owner}-${post.dateCreated}-${translatedContent}`)

        return `post-${hash}`
    }



    async generateMainStore(orbit, accessController, walletAddress:string) {

        let mainStoreName = this._getMainStoreNameSeed(walletAddress)

        return Global.orbitDb.docstore(mainStoreName, {
            accessController: accessController
        })
    }

    async generateSchema(orbitdb, accessController, mainStore, walletAddress:string) {

        console.log('Generating schema')

        let mainFeed = await this.generateMainFeed(orbitdb, accessController, walletAddress)
        let profileStore = await this.generateProfileStore(orbitdb, accessController, walletAddress)
        let postFeed = await this.generatePostFeed(orbitdb, accessController, walletAddress)
        let friendStore = await this.generateFriendStore(orbitdb, accessController, walletAddress)

        let schema:Schema = {
          mainFeed: mainFeed.address.toString(),
          profileStore: profileStore.address.toString(),
          postFeed: postFeed.address.toString(),
          friendStore: friendStore.address.toString()
        }

        await mainStore.put({
          _id: walletAddress,
          value: schema
        })

        console.log('Inserted schema into mainStore')

    }


    async updateSchema(mainStore, schema:Schema, walletAddress:string) {

        //Make sure schema has all fields
        let schemaUpdated:boolean = false

        if (!schema.mainFeed) {
            let mainFeed = await this.generateMainFeed(Global.orbitDb, Global.orbitAccessControl, walletAddress)
            schema.mainFeed = mainFeed.address.toString()
            schemaUpdated = true
        }

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

        if (!schema.friendStore) {
            let friendStore = await this.generateFriendStore(Global.orbitDb, Global.orbitAccessControl, walletAddress)
            schema.friendStore = friendStore.address.toString()
            schemaUpdated = true
        }


        if (schemaUpdated) {

            console.log("Updating schema")

            await mainStore.put({
                _id: walletAddress,
                value: schema
            })
        }

    }


    async generateMainFeed(orbitdb, accessController, walletAddress:string) {

        console.log("Generating main feed")

        let mainFeedName = this._getMainFeedNameSeed(walletAddress)

        return orbitdb.feed(mainFeedName, {
          create: true,
          accessController: accessController
        })

    }



    async generateProfileStore(orbitdb, accessController, walletAddress:string) {

        console.log("Generating profile store")

        //Create profile store
        let profileStoreName = this._getProfileStoreNameSeed(walletAddress)

        return orbitdb.docstore(profileStoreName, {
          create: true,
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



    async generateFriendStore(orbitdb, accessController, walletAddress:string) {

        console.log("Generating friend store")

        let friendStoreName = this._getFriendStoreNameSeed(walletAddress)

        return orbitdb.kvstore(friendStoreName, {
            create: true,
            accessController: accessController
        })

    }


    async openAddress(address:any) {

        let orbitAddress = new OrbitDBAddress(address.root, address.path)


        let parsedAddress = orbitAddress.toString()
        return Global.orbitDb.open(parsedAddress)
    }


}



export {
    SchemaService
}
