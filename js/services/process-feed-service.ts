import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise"
import { Global } from "../global";
import { EventEmitter } from "events";
import { SchemaService } from "./util/schema-service";
import { Dom7 } from "framework7";

var $$ = Dom7

class ProcessFeedService {

    //This probably shouldn't go here.
    unreadMessages: number = 0


    started: boolean = false

    public monitoredFeeds: any[] = []



    constructor(
        private postService: PublicPostService,
        private friendService: FriendService,
        private schemaService: SchemaService
    ) {

        this.start()
    }

    async start() {

        const self = this

        if (this.started) return

        this.started = true

        Global.eventEmitter.on("post-added", function (address, hash, entry) {
            self.postAdded(entry.payload.value)
        })

        Global.eventEmitter.on('post-feed-monitored', async function (postFeed) {
            self.monitorPostFeed(postFeed)
        })

        this.loadFriendFeeds(window['currentAccount'])
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
        

        postFeed.events.on("replicated", async () => {

            console.log('Finished replicating primary post feed')

            //Force open the new secondary 
            let feedInfo = await this.postService.getFeedInfo(postFeed)
            let childFeed = await this.schemaService.openAddress(feedInfo.feedAddress)

            childFeed.events.on("replicate.progress", (address, hash, entry, progress, max) => {
                console.log('Child feed replicate progress')
                Global.eventEmitter.emit("post-added", address, hash, entry)
            })

            await childFeed.load() //await here?

            if (!this.isMonitored(childFeed)) {
                console.log(`Monitoring child feed: ${childFeed.address}`)
                this.monitoredFeeds.push(childFeed)
            }

        })

        console.log(postFeed.replicationStatus)

        await postFeed.load() //await here?

        console.log(`Monitoring post feed: ${postFeed.address}`)
        this.monitoredFeeds.push(postFeed)

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

        let friends: Friend[] = []
        let offset: number = 0

        do {
            friends = await this.friendService.list(offset, 10)
            offset += 10

            for (let friend of friends) {
                this.monitorFriendFeed(friend)
            }
        } while (friends.length == 10)



    }

    // @timeout(2000)
    async monitorFriendFeed(friend: Friend) {

        // console.log(`Open friend feed: ${friend.address}`)

        let postFeed = await this.schemaService.getPostFeedByWalletAddress(friend.address)

        Global.eventEmitter.emit('post-feed-monitored', postFeed)

    }


}

export {
    ProcessFeedService
}