
import { injectable } from "inversify"

import { Schema } from "../../dto/schema"
import { Post } from "../../dto/post"

import { OrbitService } from "./orbit-service"

import OrbitDBAddress from 'orbit-db/src/orbit-db-address.js'

@injectable()
class SchemaService {

    private _cachedSchemas = {}

    constructor(
        private orbitService:OrbitService,
    ) {}

    async initSchema(walletAddress: string) {
        
        //Look up main address
        let mainStore
        try {
          mainStore = await this.getMainStoreByWalletAddress(walletAddress)
        } catch (ex) {
          console.log(ex)
        }
        

        let walletAccessControl = this.orbitService.getPrivateAccessController(walletAddress)
    
    
        //If it doesn't exist create it
        if (!mainStore) {
          mainStore = await this.generateMainStore(walletAccessControl, walletAddress)
        }
    
        //Detect whether or not we already have a schema
        let schema: Schema 
        try {
            schema = await this.getSchema(mainStore, walletAddress)
        } catch(ex) {
            await this.generateSchema(walletAccessControl, mainStore, walletAddress)
            schema = await this.getSchema(mainStore, walletAddress)
        }
            
        //Update the schema if it needs it.
        await this.updateSchema(walletAccessControl, mainStore, schema, walletAddress)
    
    }

    async getSchema(store, walletAddress:string) : Promise<Schema> {
        let results = await store.get(walletAddress)
        return results.value
    }

    async getSchemaByWalletAddress(walletAddress:string) : Promise<Schema> {

        // //Check if we've loaded it already
        let cached = this._cachedSchemas[walletAddress]
        if (cached) return cached

        let mainStore = await this.getMainStoreByWalletAddress(walletAddress)
        let schema:Schema = await this.getSchema(mainStore, walletAddress)

        //Cache it
        this._cachedSchemas[walletAddress] = schema
        if (schema) return schema
        
        // return new Promise((resolve, reject) => {
        //     mainStore.events.on('replicated', async () => {

        //         console.log(`Replicated main store for ${walletAddress}`)

        //         let schema:Schema = await this.getSchema(mainStore, walletAddress)

        //         //Cache it
        //         this._cachedSchemas[walletAddress] = schema

        //         resolve(schema)
        //     })
        // })
        
        // // throw new Error(`Schema for wallet ${walletAddress} could not be found`)

        // return schema
    }

    async getMainStoreByWalletAddress(walletAddress:string) {
        
        let mainStoreName = this._getMainStoreNameSeed(walletAddress)
        let accessControl = this.orbitService.getPrivateAccessController(walletAddress)
        
        //get name
        let mainStoreAddress = await this.orbitService.orbitDb.determineAddress(mainStoreName, 'pouch', {
            accessController: accessControl
        })

        //Try to open it
        let mainStore = await this.orbitService.orbitDb.open(mainStoreAddress, {
            fetchEntryTimeout: 5000
        })
        
        await mainStore.load()

        return mainStore

    }

    async getMainFeedByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.mainFeed, {
            fetchEntryTimeout: 5000
        })
    }

    async getProfileStoreByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.profileStore, {
            fetchEntryTimeout: 5000
        })
    }

    async getReadOnlyPostFeedByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.readOnlyPostFeed, {
            fetchEntryTimeout: 5000
        })
    }

    async getBlogPostStoreByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.blogPostFeed, {
            fetchEntryTimeout: 5000
        })
    }

    async getPageStoreByWalletAddress(walletAddress: string) {
        
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        
        return this.orbitService.orbitDb.open(schema.pageStore, {
            fetchEntryTimeout: 5000
        })
    }

    async getFriendStoreByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.friendStore, {
            fetchEntryTimeout: 5000
        })
    }

    async getSiteSettingsStoreByWalletAddress(walletAddress: string) {
        let schema:Schema = await this.getSchemaByWalletAddress(walletAddress)
        return this.orbitService.orbitDb.open(schema.siteSettingsStore, {
            fetchEntryTimeout: 5000
        })
    }

    async getRepliesPostFeed(post:Post, translatedContent: string) {

        // let repliesFeedName = this._getRepliesFeedNameSeed(post, translatedContent)

        // let repliesFeed = this.orbitService.orbitDb.open(repliesFeedName, {
        //     create: true,
        //     type: "pouch",
        //     accessController: this.orbitService.getPublicAccessController(this.orbitService.orbitDb)
        // })

        // return repliesFeed

    }

    async getRepliesPostFeedAddress(post:Post, translatedContent: string) : Promise<string> {
        // let feed = await this.getRepliesPostFeed(post, translatedContent)

        // let address: string = feed.address.toString()

        // return address
        return
    }

    getOrbitAddress(orbitCid:string, walletAddress:string) : string {
        return `/orbitdb/${orbitCid}/mainStore-${walletAddress.toLowerCase()}`
    }

    private _getMainStoreNameSeed(walletAddress:string ): string  {
        return `mainStore-${walletAddress.toLowerCase()}`
    }
   
    // private _getRepliesFeedNameSeed(post:Post, translatedContent: string) : string {
    //     let hash = sha256(`${post.owner}-${post.dateCreatedMilli}-${translatedContent}`)
    //     return `post-${hash}`
    // }

    async generateMainStore(accessController, walletAddress:string) {

        let mainStoreName = this._getMainStoreNameSeed(walletAddress)

        return this.orbitService.orbitDb.open(mainStoreName, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }

    async generateSchema(accessController, mainStore, walletAddress:string) {

        console.log('Generating schema')

        let mainFeed = await this.generateMainFeed(accessController, walletAddress)
        let profileStore = await this.generateProfileStore(accessController, walletAddress)

        let readOnlyPostFeed = await this.generateReadOnlyPostFeed(accessController, walletAddress)

        let blogPostFeed = await this.generateBlogPostFeed(accessController, walletAddress)
        let pageStore = await this.generatePageStore(accessController, walletAddress)

        let friendStore = await this.generateFriendStore(accessController, walletAddress)

        let siteSettingsStore = await this.generateSiteSettingsStore(accessController, walletAddress)



        let schema:Schema = {
          
          mainFeed: mainFeed.address.toString(),
          profileStore: profileStore.address.toString(),
          readOnlyPostFeed: readOnlyPostFeed.address.toString(),

          blogPostFeed: blogPostFeed.address.toString(),
          pageStore: pageStore.address.toString(),
          
          friendStore: friendStore.address.toString(),
          siteSettingsStore: siteSettingsStore.address.toString()
        }

        await mainStore.put(walletAddress, {
          value: schema
        })

        console.log('Inserted schema into mainStore')

    }


    async updateSchema(accessController, mainStore, schema:Schema, walletAddress:string) {

        //Make sure schema has all fields
        let schemaUpdated:boolean = false

        if (!schema.mainFeed) {
            let mainFeed = await this.generateMainFeed(accessController, walletAddress)
            schema.mainFeed = mainFeed.address.toString()
            schemaUpdated = true
        }

        if (!schema.profileStore) {
            let profileStore = await this.generateProfileStore(accessController, walletAddress)
            schema.profileStore = profileStore.address.toString()
            schemaUpdated = true
        }

        if (!schema.readOnlyPostFeed) {
            let readOnlyPostFeed = await this.generateReadOnlyPostFeed(accessController, walletAddress)
            schema.readOnlyPostFeed = readOnlyPostFeed.address.toString()
            schemaUpdated = true
        }

        if (!schema.blogPostFeed) {
            let blogPostFeed = await this.generateBlogPostFeed(accessController, walletAddress)
            schema.blogPostFeed = blogPostFeed.address.toString()
            schemaUpdated = true
        }

        if (!schema.pageStore) {
            let pageStore = await this.generatePageStore(accessController, walletAddress)
            schema.pageStore = pageStore.address.toString()
            schemaUpdated = true
        }

        if (!schema.friendStore) {
            let friendStore = await this.generateFriendStore( accessController, walletAddress)
            schema.friendStore = friendStore.address.toString()
            schemaUpdated = true
        }

        if (!schema.siteSettingsStore) {
            let siteSettingsStore = await this.generateSiteSettingsStore(accessController, walletAddress)
            schema.siteSettingsStore = siteSettingsStore.address.toString()
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


    async generateMainFeed(accessController, walletAddress:string) {

        console.log("Generating main feed")

        return this.orbitService.orbitDb.open(`mainFeed-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }

    async generateProfileStore(accessController, walletAddress:string) {

        console.log("Generating profile store")

        //Create profile store
        return this.orbitService.orbitDb.open(`profile-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }


    async generateReadOnlyPostFeed(accessController, walletAddress:string) {

        console.log("Generating read only post feed")

        return this.orbitService.orbitDb.open(`readonly-post-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }

    async generateBlogPostFeed(accessController, walletAddress:string) {

        console.log("Generating blog post feed")

        return this.orbitService.orbitDb.open(`blog-post-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }


    async generatePageStore(accessController, walletAddress:string) {

        console.log("Generating page kv store")

        return this.orbitService.orbitDb.open(`page-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })
        
    }


    async generateFriendStore(accessController, walletAddress:string) {

        console.log("Generating friend store")

        return this.orbitService.orbitDb.open(`friend-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }


    async generateSiteSettingsStore(accessController, walletAddress:string) {

        console.log("Generating site settings store")

        return this.orbitService.orbitDb.open(`site-settings-${walletAddress.toLowerCase()}`, {
            create: true,
            type: "pouch",
            accessController: accessController
        })

    }


    async openAddress(address:any) {

        let orbitAddress = new OrbitDBAddress(address.root, address.path)

        let parsedAddress = orbitAddress.toString()
        return this.orbitService.orbitDb.open(parsedAddress)
    }

    async dropStore(address:string) {
        let store = await this.orbitService.orbitDb.open(address)
        await store.drop()
    }



}



export {
    SchemaService
}
