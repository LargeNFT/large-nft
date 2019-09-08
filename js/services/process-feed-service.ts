import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise"
import { Global } from "../global";
import { EventEmitter } from "events";
import { SchemaService } from "./util/schema-service";


class ProcessFeedService {

    //My friend's feed stores
    friendStores: any[]



    constructor(
        private postService: PublicPostService,
        private friendService: FriendService
    ) {

        const self = this

        Global.eventEmitter.on("post-added", async function (address, hash, entry) {
            let postCid = entry.payload.value

            let post:Post = await PublicPostService.read(postCid)

            await self.postService.loadMainFeedForWallet(window['currentAccount'])

            await self.postService.create(post)

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

        await this.postService.loadPostFeedForWallet(friend.address)

        this.postService.monitorPostFeed(this.postService.getFeed())

    }








    // // @timeout(2000)
    // async getNewPostsFromFriend(friend: Friend): Promise<Post[]> {

    //     let posts: Post[] = []

    //     await this.postService.loadPostFeedForWallet(friend.address)

    //     let lastPostFeedCid = friend.lastPostFeedCid
    //     let foundPosts: Post[] = []

    //     do {
    //         let foundPosts = await this.postService.getRecentPosts(10, undefined, lastPostFeedCid)
    //         posts = posts.concat(foundPosts)

    //     } while (foundPosts.length == 10)

    //     //Update last post hash
    //     if (posts.length > 0) {
    //         friend.lastPostFeedCid = posts[0].feedCid
    //     }


    //     await this.friendService.put(friend)

    //     return posts

    // }



}

export {
    ProcessFeedService
}