import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise"
import { Global } from "../global";
import { EventEmitter } from "events";
import { SchemaService } from "./util/schema-service";


class ProcessFeedService {

    started: boolean = false

    //My friend's feed stores
    friendStores: any[]



    constructor(
        private postService: PublicPostService,
        private friendService: FriendService
    ) {

        // setTimeout(() => { this.start() }, 5000)

        this.start()
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

        })


        // this.loadFriendFeeds(window['currentAccount'])

    
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

        await this.postService.loadPostFeedForWallet(friend.address)

        await this.postService.monitorPostFeed(this.postService.getFeed())

    }


}

export {
    ProcessFeedService
}