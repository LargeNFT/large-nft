import {SettingsService} from "./settings-service";
import {Global} from "../../global";
import {Template7} from "framework7";
import {ModelView} from "../../model-view";

const ipfsClient = require('ipfs-http-client')
const TruffleContract = require('truffle-contract')

const OrbitDB = require('orbit-db')
const TableStore = require('orbit-db-tablestore')
const Keystore = require('orbit-db-keystore/index-browser')
const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')
const Identities = require('orbit-db-identity-provider')


const ethers = require('ethers')
// const level = require('level-js')


import * as Whitepages from '../../../truffle/build/contracts/Whitepages.json'
import { HomeController } from "../../controllers/home-controller";
import { PublicPostService } from "../public-post-service";
import { QuillService } from "./quill-service";
import { ProfileService } from "../profile-service";
import { ProfileController } from "../../controllers/profile-controller";
import { SettingsController } from "../../controllers/settings-controller";
import { UploadService } from "./upload-service";
import { IdentityService } from "./identity-service";
import { Schema } from "../../dto/schema";
import { SchemaService } from "./schema-service";
import { WhitepagesService } from "../whitepages-service";
import { ConnectController } from "../../controllers/connect-controller";
import { ListingService } from "../listing-service";
import { PostController } from "../../controllers/post-controller";
import { FriendService } from "../friend-service";
import { ProcessFeedService } from "../process-feed-service";


const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );


class RouteService {

  public freedom: any

  constructor(
    private settingsService: SettingsService,
    private identityService: IdentityService,
    private schemaService: SchemaService
  ) {}


  getRoutes(baseurl) {

    const self = this


    const homeRoute = async function(routeTo, routeFrom, resolve, reject) {

      let settings: Settings = self.settingsService.getSettings()

      if (!settings) {
        self.resolveController(resolve, Global.settingsController.showSettingsForm())
        return
      }

      self.initAndResolve(resolve,function() {
        return Global.homeController.showHomePage()
      })

    }

    let routes = []

    if (baseurl != '/') {
      routes.push(      {
        path: baseurl,
        async: homeRoute
      })
    }

    routes.push(      {
      path: '/',
      async: homeRoute
    })

    routes.push({
      path: '/settings',
      async async(routeTo, routeFrom, resolve, reject) {
        self.resolveController(resolve, Global.settingsController.showSettingsForm())
      }
    })


    routes.push({
      path: '/profile/static/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.profileController.showStaticProfile(routeTo.params.id)
        })

      }
    })

    routes.push({
      path: '/profile/edit',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.profileController.showProfileEdit()
        })
      }
    })


    routes.push({
      path: '/post/show/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.postController.showPost(routeTo.params.id)
        })

      }
    })


    routes.push({
      path: '/connect',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return Global.connectController.showHome()
        })

      }
    })



    //Needs to be last
    routes.push({
      path: '(.*)',
      // url: 'pages/404.html',
      async async(routeTo, routeFrom, resolve, reject) {
        console.log(routeTo)
      }
    })




    return routes
  }


  async initialize() {

    if (Global.ipfs) return

    let settings:Settings = this.settingsService.getSettings()
    if (!settings) {
      throw 'No settings found'
    }

    Template7.global = {
      settings: settings,
      ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
    }

    //Doing this because the thing above stopped working for some reason.
    window['ipfsGateway'] = Template7.global.ipfsGateway


    Global.ipfsGateway = Template7.global.ipfsGateway


    Global.ipfs = ipfsClient({
      host: settings.ipfsHost,
      port: settings.ipfsApiPort,
      protocol: 'http'
    })

    //Temp until ipfs-http-client properly supports it
    Global.ipfs.pubsub = null

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
      "address": settings.whitepagesContractAddress,
      "transactionHash": settings.whitepagesContractTxHash
    }


    const truffleContract = TruffleContract(Whitepages);

    let contract

    try {
        //@ts-ignore
        truffleContract.setProvider(window.web3Provider)
        truffleContract.defaults({from: account})

        contract = await truffleContract.deployed()

    } catch (ex) {
        console.log(ex)
    }





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
    } catch(ex) {
      console.log(ex)
    }

    //If it doesn't exist create it
    if (!mainStore) {
      mainStore = await this.schemaService.generateMainStore(Global.orbitDb, Global.orbitAccessControl, window['currentAccount'] )
    }



    //Detect whether or not we already have a schema
    let schema:Schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])

    if (!schema) {
      await this.schemaService.generateSchema(Global.orbitDb, Global.orbitAccessControl, mainStore, window['currentAccount'])
      schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])
    }



    //Open profile store
    Global.mainStore = mainStore

    //Update the schema if it needs it.
    await this.schemaService.updateSchema(mainStore, schema, window['currentAccount'])


    
    
    Global.profileService = new ProfileService()
    Global.postService = new PublicPostService(this.schemaService, Global.profileService)
    Global.friendService = new FriendService(Global.postService)
    Global.processFeedService = new ProcessFeedService(Global.postService, Global.friendService)

    Global.uploadService = new UploadService()
    Global.quillService = new QuillService(Global.uploadService)
    Global.whitepagesService = new WhitepagesService(contract)
    Global.listingService = new ListingService(Global.schemaService, Global.whitepagesService, Global.friendService, Global.profileService)

    Global.homeController = new HomeController(Global.quillService, Global.postService, Global.profileService)
    Global.profileController = new ProfileController(Global.uploadService, Global.profileService, Global.postService)
    Global.settingsController = new SettingsController(Global.settingsService, Global.schemaService)
    Global.postController = new PostController( Global.quillService, Global.postService, Global.profileService)
    Global.connectController = new ConnectController(Global.whitepagesService, Global.queueService, Global.listingService, Global.friendService, Global.profileService)

    window['homeController'] = Global.homeController
    window['profileController'] = Global.profileController
    window['postController'] = Global.postController
    window['connectController'] = Global.connectController
    window['settingsController'] = Global.settingsController

    console.log("Initialization complete")

  }

  async initAndResolve(resolve, successFunction) {
    try {
      await this.initialize()
      this.resolveController(resolve, successFunction())
    } catch(ex) {
      console.log(ex)
      Global.showExceptionPopup(ex)
      Global.navigate("/settings")
    }
  }


  //Handles routing to a controller
  async resolveController(resolve, controller_promise: Promise<ModelView>) {

    try {

      let modelView: ModelView = await controller_promise;

      if (!modelView) return

      resolve({
          componentUrl: modelView.view
        },
        {
          context: { fn: modelView.model}
        })

    } catch (ex) {
      Global.showExceptionPopup(ex)
      console.log(ex)
    }

  }



}

export { RouteService }
