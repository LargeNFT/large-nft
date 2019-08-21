import { SchemaService } from "./util/schema-service";
import { WhitepagesService } from "./whitepages-service";
import { Listing } from "../dto/listing";
import { Schema } from "../dto/schema";
import { Global } from "../global";
import { Profile } from "../dto/profile";
import { ProfileService } from "./profile-service";
import { timeout } from '../timeout-promise'
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";


class ListingService {
    
    TIMEOUT = 2000


    constructor(
        private schemaService: SchemaService,
        private whitepageService: WhitepagesService,
        private friendService:FriendService
    ) {

    }


    async getListing(address:string) : Promise<Listing> {

        let orbitCid = await this.whitepageService.read(address)

        return {
            orbitCid: orbitCid,
            owner: address
        }
    }


    async getListings(limit:number, offset:number) {

        let listings:Listing[] = await this.whitepageService.readList(limit, offset)

        //Remove myself
        listings.forEach( async (listing, index) => {
          if (window['currentAccount'].toLowerCase() == listing.owner.toLowerCase()) {
                listings.splice(index,1);
            }
        })

        return listings

    }

    async getPostFeed(listing:Listing) {

        let schema:Schema = await this.getLoadedSchema(listing)

        let feed = await this.getLoadedPostFeed(schema)

        return feed
    }

    async getProfileStore(listing:Listing) {

        let schema:Schema = await this.getLoadedSchema(listing)
        if (!schema) {
            throw Error("No schema found")
        }

        return this.getLoadedProfileStore(schema)
    }


    async getProfile(listing:Listing) : Promise<Profile> {

        let profileStore = await this.getProfileStore(listing)
        if (!profileStore) {
            throw Error("No profile store")    
        }

        let listingProfileService = new ProfileService(profileStore)

        return listingProfileService.read(listing.owner)

    }

    async getProfiles(listings:Listing[]) : Promise<Profile[]> {

        let profiles:Profile[] = []

        for (var listing of listings) { 
            try {
                let profile:Profile = await this.getProfile(listing)

                //Check if we're friends    
                let friend:Friend = await this.friendService.get(listing.owner)

                if (friend) {
                    profile.following = true
                }

                profiles.push(profile)
            } catch(ex){
                console.log(ex)
            }
        }

        return profiles
    }

    
    async getListingProfiles(limit, offset) : Promise<Profile[]> {
        let listings:Listing[] = await this.getListings(limit, offset)
        return this.getProfiles(listings)
    }


    @timeout(2000)
    private async getLoadedSchema(listing:Listing) {
        return this.getSchema(listing)
    }


    private async getSchema(listing: Listing) {
        let friendMainStore = await this.getLoadedMainStore(listing)
        return this.schemaService.getSchema(friendMainStore, listing.owner)
    }




    @timeout(2000)
    private async getLoadedMainStore(listing:Listing) {
        let orbitAddress = this._getOrbitAddress(listing)
        return this.loadMainStore(orbitAddress)
    }

    async loadMainStore(orbitAddress:string) {
        let mainStore = await Global.orbitDb.open(orbitAddress.toString())
        await mainStore.load()
        return mainStore
    }

    @timeout(2000)
    private async getLoadedPostFeed(schema:Schema) {
        return this.loadPostFeed(schema)
    }

    private async loadPostFeed(schema:Schema) {
        let postFeed = await Global.orbitDb.open(schema.postFeed)
        await postFeed.load(10)
        return postFeed
    }


    
    @timeout(2000)
    private async getLoadedProfileStore(schema:Schema) {  
        return this.loadProfileStore(schema)
    }

    private async loadProfileStore(schema:Schema) {
        let profileStore = await Global.orbitDb.open(schema.profileStore)
        await profileStore.load()
        return profileStore
    }



    private _getOrbitAddress(listing:Listing) : string {
        return this.schemaService.getOrbitAddress(listing.orbitCid, listing.owner)
    }



}

export {
    ListingService
}