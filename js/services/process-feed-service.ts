import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise"
import { Global } from "../global";
import { EventEmitter } from "events";
import { SchemaService } from "./util/schema-service";
import { Dom7 } from "framework7";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";

var $$ = Dom7

class ProcessFeedService {

    //This probably shouldn't go here.
    unreadMessages: number = 0


    started: boolean = false

    public monitoredFeeds: any[] = []



    constructor(
        private postService: PublicPostService,
        private friendService: FriendService,
        private schemaService: SchemaService,
        private profileService: ProfileService
    ) {

        this.start()
    }

    async start() {

        const self = this

        if (this.started) return

        this.started = true

        Global.eventEmitter.on("post-added", async function (address, hash, entry) {
            await self.postAdded(entry.payload.value)
        })

        Global.eventEmitter.on('post-feed-monitored', async function (postFeed) {
            await self.monitorPostFeed(postFeed)
        })

        Global.eventEmitter.on('post-feed-replicated', async function(postFeed) {
            await self.postFeedReplicated(postFeed)
        })

        this.loadFriendFeeds(window['currentAccount'])
    }

    async updateLastKnownAddress() {

        let currentUser: Profile = await this.profileService.getCurrentUser()

        if (!currentUser) return

        let id = await Global.ipfs.id()

        currentUser.lastKnownAddress = id.addresses

        await this.profileService.put(currentUser)
    }


    async postAdded(postCid) {

        console.log(`Post added: ${postCid}`)

        let post: Post = await PublicPostService.read(postCid)

        await this.postService.loadMainFeedForWallet(window['currentAccount'])
        await this.postService.create(post)

        this.unreadMessages++

        $$('.new-message-badge').val(this.unreadMessages)
        $$('.new-message-badge').show()

    }


    async monitorPostFeed(postFeed) {

        if (this.isMonitored(postFeed)) return

        await postFeed.load() //await here?

        postFeed.events.on("replicated", () => {
            console.log('replicated')
            Global.eventEmitter.emit("post-feed-replicated", postFeed)
        })

        console.log(`Monitoring post feed: ${postFeed.address}`)
        this.monitoredFeeds.push(postFeed)

    }


    async postFeedReplicated(postFeed) {

        console.log('Finished replicating primary post feed')

        //Force open the new secondary 
        let feedInfo = await this.postService.getFeedInfo(postFeed)
        let childFeed = await this.schemaService.openAddress(feedInfo.feedAddress)

        await childFeed.load() //await here?

        childFeed.events.on("replicate.progress", (address, hash, entry, progress, max) => {
            console.log('Child feed replicate progress')
            Global.eventEmitter.emit("post-added", address, hash, entry)
        })

        if (!this.isMonitored(childFeed)) {
            console.log(`Monitoring child feed: ${childFeed.address}`)
            this.monitoredFeeds.push(childFeed)
        }
    }



    isMonitored(postFeed) {

        let existingMonitor = this.monitoredFeeds.filter(e => {
            return e.address.toString() == postFeed.address.toString()
        })

        let isMonitored = (existingMonitor.length > 0)

        return isMonitored
    }



    async loadFriendFeeds(walletAddress: string) {

        console.log('Opening friend posts feeds')

        await this.friendService.loadStoreForWallet(walletAddress)

        let friends: Friend[] = await this.friendService.getAll()
        
        for (let friend of friends) {
            try {
                await this.monitorFriendFeed(friend)
                await this.updateFriendLastKnownAddress(friend)
                await this.connectToFriend(friend)
            } catch (ex) {
                console.log(ex)
            }
        }

        //Save peer list
        if (Global.isElectron) {
            await this.savePeerList(friends)
        }
        


    }

    // @timeout(2000)
    async monitorFriendFeed(friend: Friend) {

        let postFeed = await this.schemaService.getPostFeedByWalletAddress(friend.address)

        Global.eventEmitter.emit('post-feed-monitored', postFeed)

    }

    async updateFriendLastKnownAddress(friend: Friend) {

        let friendProfile: Profile = await this.profileService.getProfileByWallet(friend.address, false)

        if (friendProfile) {
            console.log(`Updating last known address: ${friendProfile._id}`)

            friend.lastKnownAddress = friendProfile.lastKnownAddress

            await this.friendService.put(friend)
        }
    }


    async savePeerList(friends:Friend[]) {

        let peersDao = window['remote'].getGlobal('peersDao')
        
        let peerList = friends.map(friend => {
            return friend.lastKnownAddress
        })


        await peersDao.savePeers(peerList)

    }


    async connectToFriend(friend: Friend) {
        if (friend.lastKnownAddress && friend.lastKnownAddress.length > 0) {
            for (let address of friend.lastKnownAddress) {
                try {
                    console.log(`Peering with last known address: ${address}`)
                    await Global.ipfs.swarm.connect(address)
                    break
                } catch (ex) {
                    console.log(ex)
                }
            }
        }

    }


}

export {
    ProcessFeedService
}