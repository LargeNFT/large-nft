import {SettingsService} from "./settings-service";
import {Global} from "../global";
import {Template7} from "framework7";
import {ModelView} from "../model-view";

const ipfsClient = require('ipfs-http-client')
const TruffleContract = require('truffle-contract')

const OrbitDB = require('orbit-db')
const TableStore = require('orbit-db-tablestore')
const Keystore = require('orbit-db-keystore/index-browser')
const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')
const Identities = require('orbit-db-identity-provider')


const ethers = require('ethers')
// const level = require('level-js')


import * as RecordService from '../../truffle/build/contracts/RecordService.json'
import { HomeController } from "../controllers/home-controller";
import { PublicPostService } from "./public-post-service";
import { QuillService } from "./quill-service";
import { ProfileService } from "./profile-service";
import { PostController } from "../controllers/post-controller";
import { ProfileController } from "../controllers/profile-controller";
import { SettingsController } from "../controllers/settings-controller";
import { UploadService } from "./upload-service";
import { IdentityService } from "./identity-service";


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
    private identityService: IdentityService
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
      path: '/profile/show',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.profileController.showProfile()
        })
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
      path: '/post/edit/:id',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.postController.showPostEdit(routeTo.params.id)
        })
      }
    })


    routes.push({
      path: '/post/list',
      async async(routeTo, routeFrom, resolve, reject) {

        self.initAndResolve(resolve,function() {
          return Global.postController.showPostList()
        })
      }
    })


    routes.push({
      path: '/post/create',
      async async(routeTo, routeFrom, resolve, reject) {
        self.initAndResolve(resolve,function() {
          return Global.postController.showCreatePost()
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



    /**
     * Orbit
     */

    let keystore = Keystore.create()

    let identity = await this.identityService.getIdentity(keystore)
    

    OrbitDB.addDatabaseType(TableStore.type, TableStore)

    Global.orbitDb = await OrbitDB.createInstance(Global.ipfs, {
      identity: identity
    })

    let ac = this.identityService.getAccessController(Global.orbitDb)

    // console.log(identity)
    // console.log(ac)


    if (!settings.dbAddress) {
      await this.settingsService.generateDatabase(Global.orbitDb, ac)
      settings = this.settingsService.getSettings()
    }

    


    //Look up main address
    let address = OrbitDB.parseAddress(settings.dbAddress)

    Global.mainDb = await Global.orbitDb.open(address.toString())
    await Global.mainDb.load()


    //Look up post feed address from mainDb
    let postFeedAddress = await Global.mainDb.get('postFeed')
    postFeedAddress = OrbitDB.parseAddress(postFeedAddress[0].path)

    //Look up profile table address from mainDb
    let profileTableAddress = await Global.mainDb.get('profileTable')
    profileTableAddress = OrbitDB.parseAddress(profileTableAddress[0].path) 


    //Open profile table
    Global.profileTable = await Global.orbitDb.docstore(profileTableAddress.toString(), {
      accessController: ac
    })
    
    console.log('Loading profile table')
    await Global.profileTable.load()

    //Open post feed
    Global.postFeed = await Global.orbitDb.feed(postFeedAddress.toString(), {
      accessController: ac
    })
    
    console.log('Loading post feed')
    await Global.postFeed.load(100)


    console.log('Orbit loaded')

      
    Global.publicPostService = new PublicPostService(Global.postFeed)
    Global.quillService = new QuillService()
    Global.profileService = new ProfileService(Global.profileTable)
    Global.uploadService = new UploadService()

    Global.homeController = new HomeController(Global.publicPostService, Global.templateService)
    Global.postController = new PostController(Global.queueService, Global.publicPostService, Global.profileService, Global.quillService, Global.uploadService)
    Global.profileController = new ProfileController(Global.profileService, Global.uploadService, Global.publicPostService, Global.queueService)
    Global.settingsController = new SettingsController(Global.settingsService)

    window['homeController'] = Global.homeController
    window['profileController'] = Global.profileController

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
          context: modelView.model
        })

    } catch (ex) {
      Global.showExceptionPopup(ex)
      console.log(ex)
    }

  }



}

export { RouteService }
