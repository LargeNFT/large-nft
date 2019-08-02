import { ModelView } from "../model-view";
import { Dom7, Template7 } from "framework7";
import { WhitepagesService } from "../services/whitepages-service";
import { SchemaService } from "../services/util/schema-service";
import { Global } from "../global";
import { Schema } from "../dto/schema";
import { SettingsService } from "../services/util/settings-service";
import { QueueService } from "../services/util/queue_service";
import { PromiseView } from "../promise-view";
import { Listing } from "../dto/listing";
import { ListingService } from "../services/listing-service";
import { Profile } from "../dto/profile";

const OrbitDB = require('orbit-db')


var $$ = Dom7;

class ConnectController {

    constructor(
        private whitepageService: WhitepagesService,
        private queueService: QueueService,
        private listingService: ListingService
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

        let profiles:Profile[] = await this.listingService.getListingProfiles(10, 0)

        return new ModelView({
            registeredOrbitAddress: registeredOrbitAddress,
            profiles: profiles
        }, 'pages/connect/home.html')
    }


    async registerClick(e:Event) {

        let address = Global.mainStore.address

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

        let address = Global.mainStore.address

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