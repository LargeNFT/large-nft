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

    //My friend's feed stores
    friendStores: any[]



    constructor(
        private postService: PublicPostService,
        private friendService: FriendService,
        private schemaService:SchemaService
    ) {

        // setTimeout(() => { this.start() }, 5000)

        // this.start()
    }

    async start() {

        if (this.started) return

        this.started = true

        const self = this

        Global.eventEmitter.on("post-added", async function (address, hash, entry) {

            let postCid = entry.payload.value
            console.log(`Post added: ${postCid}`)

            let post: Post = await PublicPostService.read(postCid)

            await self.postService.loadMainFeedForWallet(window['currentAccount'])
            await self.postService.create(post)

            this.unreadMessages++

            $$('.new-message-badge').val(this.unreadMessages)
            $$('.new-message-badge').show()

        })


        this.loadFriendFeeds(window['currentAccount'])

    
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
                await this.monitorFriendFeed(friend)
            }
        } while (friends.length == 10)



    }

    // @timeout(2000)
    async monitorFriendFeed(friend: Friend) {
        console.log(`Open friend feed: ${friend.address}`)

        let postFeed = await this.schemaService.getPostFeedByWalletAddress(friend.address)

        await this.postService.monitorPostFeed(postFeed)

        console.log(`Opening friend feed complete`)

    }




}

export {
    ProcessFeedService
}