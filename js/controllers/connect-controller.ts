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
import { ProfileService } from "../services/profile-service";

var $$ = Dom7;

class ConnectController {

    constructor(
        private whitepageService: WhitepagesService,
        private queueService: QueueService,
        private listingService: ListingService
    ) {}


    async showHome() : Promise<ModelView> {

        return new ModelView( async () => {


            let registeredOrbitAddress = await this.whitepageService.read(window['currentAccount'])


            let showRegisterButton = (registeredOrbitAddress)
            let showUpdateButton = !showRegisterButton


            let profiles:Profile[] = await this.listingService.getListingProfiles(10, 0)


            return {
                registeredOrbitAddress: registeredOrbitAddress,
                profiles: profiles,
                showRegisterButton: showRegisterButton,
                showUpdateButton: showUpdateButton
            }
            
        }, 'pages/connect/home.html')

    }

    async findFriendClick(e:Event, component) {
        
        let profile:Profile 

        try {
            profile = await ProfileService.getProfileByWallet($$('#friendAddress').val())
        } catch(ex) {
            console.log(ex)
        }

        console.log(profile)
        
        component.$setState({
            foundFriend: profile
        })



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






}


export {
    ConnectController
}