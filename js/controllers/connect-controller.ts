import { ModelView } from "../model-view";
import { Dom7, Template7 } from "framework7";
import { WhitepagesService } from "../services/whitepages-service";
import { SchemaService } from "../services/schema-service";
import { Global } from "../global";
import { Schema } from "../dto/schema";
import { SettingsService } from "../services/settings-service";
import { QueueService } from "../services/queue_service";
import { PromiseView } from "../promise-view";
import { Listing } from "../dto/listing";

const OrbitDB = require('orbit-db')


var $$ = Dom7;

class ConnectController {

    constructor(
        private whitepageService: WhitepagesService,
        private schemaService: SchemaService,
        private settingService: SettingsService,
        private queueService: QueueService
    ) {

        const self = this;

        $$(document).on('click', '#register-link', function (e) {
            e.preventDefault()
            self.registerClick(e)
        })


        $$(document).on('click', '#update-register-link', function (e) {
            e.preventDefault()
            self.updateRegisterClick(e)
        })

    }


    async showHome() : Promise<ModelView> {

        let registeredOrbitAddress = await this.whitepageService.read(window['currentAccount'])

        let listings:Listing[] = await this.whitepageService.readList(10, 0)


        //Remove myself
        listings.forEach( async (listing, index) => {
          if (window['currentAccount'].toLowerCase() == listing.owner.toLowerCase()) {
                listings.splice(index,1);
            }
        });

        for (var listing of listings) {
            
            //Rebuild orbit address
            let orbitAddress = `/orbitdb/${listing.orbitCid}/mainStore-${listing.owner.toLowerCase()}`

            //Try to load the database
            let friendMainStore = await this.schemaService.loadMainStore(orbitAddress)

            //Read the schema out of it. 
            let friendSchema:Schema = await this.schemaService.getSchema(friendMainStore)

            //Load post feed
            let friendPostFeed = await this.schemaService.loadPostFeed(friendSchema.postFeed, Global.orbitAccessControl)

            //Load profile
            let friendProfileStore = await this.schemaService.loadProfileStore(friendSchema.profileStore, Global.orbitAccessControl)

            console.log(friendPostFeed)
            console.log(friendProfileStore)


        }


        return new ModelView({
            registeredOrbitAddress: registeredOrbitAddress,
            listings: listings
        }, 'pages/connect/home.html')
    }


    async registerClick(e:Event) {

        let settings:Settings = this.settingService.getSettings()

        let mainDbAddress = settings.dbAddress

        let address = OrbitDB.parseAddress(mainDbAddress)

        let viewModel = {
            address: window['currentAccount']
        }

        await this.queueService.queuePromiseView(
            new PromiseView(
              this.whitepageService.create(address.root),
              "Registering {{address}} in whitepages",
              "document_text",
              viewModel,
              "/connect"
            )
          )
    }


    async updateRegisterClick(e:Event) {

        let settings:Settings = this.settingService.getSettings()

        let mainDbAddress = settings.dbAddress

        let address = OrbitDB.parseAddress(mainDbAddress)

        let viewModel = {
            address: window['currentAccount']
        }

        await this.queueService.queuePromiseView(
            new PromiseView(
              this.whitepageService.update(address.root),
              "Updating registration {{address}} in whitepages",
              "document_text",
              viewModel,
              "/connect"
            )
          )
    }




}


export {
    ConnectController
}