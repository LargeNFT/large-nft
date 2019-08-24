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

var $$ = Dom7;

class ConnectController {


    constructor(
        private whitepageService: WhitepagesService,
        private queueService: QueueService,
        private listingService: ListingService,
        private friendService: FriendService,
        private profileService: ProfileService
    ) {
        
    }


    async showHome() : Promise<ModelView> {

        return new ModelView( async () => {

            await this.friendService.loadStoreForWallet(window['currentAccount'])
            await this.friendService.load()

            let registeredOrbitAddress = await this.whitepageService.read(window['currentAccount'])


            let showRegisterButton = (registeredOrbitAddress)
            let showUpdateButton = !showRegisterButton

            let profiles:Profile[] = await this.listingService.getListingProfiles(10, 0)

    
            return {
                currentAccount: window['currentAccount'],
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
            profile = await this.profileService.getProfileByWallet($$('#friendAddress').val())


            //Check if we're friends    
            let friend:Friend = await this.friendService.get(profile._id)

            if (friend) {
                profile.following = true
            }


        } catch(ex) {
            console.log(ex)
        }

        
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



    async followClick(e:Event) {

        let friendAddress = $$(e.target).data('id')


        let friend:Friend = {
            address: friendAddress
        }

        await this.friendService.put(friend)

        $$(e.target)
            .removeClass("button-outline")
            .removeClass("follow-link")
            .addClass("button-fill")
            .addClass("unfollow-link")
            .html("Following")

    }


    async unfollowClick(e:Event) {

        let friendAddress = $$(e.target).data('id')


        await this.friendService.delete(friendAddress)

        $$(e.target)
            .removeClass("button-fill")
            .removeClass("unfollow-link")
            .addClass("button-outline")
            .addClass("follow-link")
            .html("Follow")
    }





}


export {
    ConnectController
}