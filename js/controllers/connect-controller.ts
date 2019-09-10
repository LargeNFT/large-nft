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
import { FriendService } from "../services/friend-service";
import { Friend } from "../dto/friend";
import { ImageService } from "../services/util/image-service";
import { ProcessFeedService } from "../services/process-feed-service";

var $$ = Dom7;

class ConnectController {


    constructor(
        private whitepageService: WhitepagesService,
        private queueService: QueueService,
        private friendService: FriendService,
        private processFeedService:ProcessFeedService
    ) {
        
    }


    async showHome() : Promise<ModelView> {

        return new ModelView( async () => {


            let peers = await Global.ipfs.swarm.peers()
            
            peers = peers.map(e => e.addr.toString())

            let monitoredFeeds = this.processFeedService.monitoredFeeds

            return {
                peers: peers,
                monitoredFeeds: monitoredFeeds,
                currentAccount: window['currentAccount']
            }
            
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






}


export {
    ConnectController
}