import { Global } from "../../global"
import { SettingsService } from "./settings-service"
import { Template7 } from "framework7";

const IPFS = require('ipfs')
const ipfsClient = require('ipfs-http-client')

const OrbitDB = require('orbit-db')
const TableStore = require('orbit-db-tablestore')
const Keystore = require('orbit-db-keystore/index-browser')

const { ethers } = require('ethers')
import { WhitepagesService } from "../whitepages-service";
import { ConnectController } from "../../controllers/connect-controller";
import { ListingService } from "../listing-service";
import { PostController } from "../../controllers/post-controller";
import { FriendService } from "../friend-service";
import { FollowController } from "../../controllers/follow-controller";
import { PostUIService } from "../post-ui-service";
import { ImageService } from "./image-service";
import * as Whitepages from '../../../truffle/build/contracts/Whitepages.json'
import { HomeController } from "../../controllers/home-controller";
import { PublicPostService } from "../public-post-service";
import { QuillService } from "./quill-service";
import { ProfileService } from "../profile-service";
import { ProfileController } from "../../controllers/profile-controller";
import { SettingsController } from "../../controllers/settings-controller";
import { UploadService } from "./upload-service";
import { IdentityService } from "./identity-service";
import { SchemaService } from "./schema-service";
import { Schema } from "../../dto/schema";
import { ProcessFeedService } from "../process-feed-service";
const EventEmitter = require('events').EventEmitter


class InitService {

    constructor(
        private settingsService:SettingsService,
        private identityService:IdentityService,
        private schemaService:SchemaService
    ){}

    async initialize() {

        if (Global.ipfs) return
        if (!Global.wallet) return
    
        console.log(`Initializing with wallet ${await Global.wallet.getAddress()}`)
    
        let settings: Settings = this.settingsService.getSettings()
        if (!settings) {
          throw 'No settings found'
        }
    
        Template7.global = {
          settings: settings,
        }
    
    
        if (Global.isElectron) {
          //electron
          await this.configureElectron()
        } else {
          //browser
          await this.configureBrowser()
        }

    
        //Ropsten
        Whitepages.networks["3"] = {
          "events": {},
          "links": {},
          "address": settings.whitepagesContractAddress,
          "transactionHash": settings.whitepagesContractTxHash
        }
    
        //Mainnet
        Whitepages.networks["1"] = {
          "events": {},
          "links": {},
          "address": "0x363d26d0c8E47C10Bec3502078170b392BCF17D5",
          "transactionHash": "0x857070e75551860ec22c9643e41a6bf2713da0b3e30635a491b89e7767a21ddf"
        }
    
        //@ts-ignore
    
        //hard coding to mainnet for now
        let contract = new ethers.Contract("0x363d26d0c8E47C10Bec3502078170b392BCF17D5", Whitepages.abi, Global.provider);
    
    
    
    
    
        /**
         * Orbit
         */
    
        let keystore = Keystore.create()
    
        let identity = await this.identityService.getIdentity(keystore)
    
        OrbitDB.addDatabaseType(TableStore.type, TableStore)
    
        Global.orbitDb = await OrbitDB.createInstance(Global.ipfs, {
          identity: identity
        })
    
        Global.orbitAccessControl = this.identityService.getAccessController(Global.orbitDb)
    
    
    
        //Look up main address
        let mainStore
        try {
          mainStore = await this.schemaService.getMainStoreByWalletAddress(window['currentAccount'])
        } catch (ex) {
          console.log(ex)
        }
    
    
    
        //If it doesn't exist create it
        if (!mainStore) {
          mainStore = await this.schemaService.generateMainStore(Global.orbitDb, Global.orbitAccessControl, window['currentAccount'])
        }
    
    
    
        //Detect whether or not we already have a schema
        let schema: Schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])
    
        if (!schema) {
          await this.schemaService.generateSchema(Global.orbitDb, Global.orbitAccessControl, mainStore, window['currentAccount'])
          schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])
        }
    
    
        Global.eventEmitter = new EventEmitter()

        //Open profile store
        Global.mainStore = mainStore
    
        //Update the schema if it needs it.
        await this.schemaService.updateSchema(mainStore, schema, window['currentAccount'])
    
    
        Global.imageService = new ImageService()
        Global.profileService = new ProfileService()
        Global.postService = new PublicPostService(this.schemaService)
        Global.postUiService = new PostUIService(Global.postService, Global.profileService, this.schemaService, Global.imageService)
        Global.friendService = new FriendService(Global.postService)
        Global.processFeedService = new ProcessFeedService(Global.postService, Global.friendService)
    
    
        Global.uploadService = new UploadService()
        Global.quillService = new QuillService(Global.uploadService)
        Global.whitepagesService = new WhitepagesService(contract)
        Global.listingService = new ListingService(Global.schemaService, Global.whitepagesService, Global.friendService, Global.profileService)
    
        Global.homeController = new HomeController(Global.quillService, Global.postUiService, Global.profileService, Global.imageService)
        Global.profileController = new ProfileController(Global.uploadService, Global.profileService, Global.postUiService, Global.imageService)
        Global.settingsController = new SettingsController(Global.settingsService, Global.schemaService)
        Global.postController = new PostController(Global.quillService, Global.postUiService, Global.profileService, Global.imageService)
        Global.connectController = new ConnectController(Global.whitepagesService, Global.queueService, Global.friendService)
        Global.followController = new FollowController(Global.friendService, Global.profileService, Global.imageService)
    
        window['homeController'] = Global.homeController
        window['profileController'] = Global.profileController
        window['postController'] = Global.postController
        window['connectController'] = Global.connectController
        window['followController'] = Global.followController
    
    
        console.log("Initialization complete")
    
      }
    
      async configureWeb3() {
    
        if (!window['ethereum']) return
    
        // Request account access
        await window['ethereum'].enable()
    
        //@ts-ignore
        window.web3Provider = window.ethereum
    
        //@ts-ignore
        web3 = new Web3(window.web3Provider)
    
        //@ts-ignore
        const accounts = await promisify(cb => web3.eth.getAccounts(cb))
    
        let account = accounts[0]
        window['currentAccount'] = account
    
    
      }
    
      private async configureElectron() {
    
        //@ts-ignore
        Global.ipfsHost = remote.getGlobal('ipfsHost')
    
        Global.ipfs = await IPFS.create({
          EXPERIMENTAL: {
            pubsub: true
          },
          relay: {
            enabled: true,
            hop: {
              enabled: true // enable circuit relay HOP (make this node a relay)
            }
          },
          config: {
            Addresses: {
              //@ts-ignore
              Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star', Global.ipfsHost]
            }
          }
        })
    
      }
    
      private async configureBrowser() {
    
        Global.ipfs = await IPFS.create({
          EXPERIMENTAL: {
            pubsub: true
          },
          relay: {
            enabled: true,
            hop: {
              enabled: true // enable circuit relay HOP (make this node a relay)
            }
          },
          config: {
            Addresses: {
              //@ts-ignore
              Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
            }
          }
        });
    
        await this.configureWeb3();
    
      }


}



const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );




export {
    InitService
}