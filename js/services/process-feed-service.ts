import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise";

class ProcessFeedService {

    processing: boolean = false
    queuedPosts: Post[] = []

    constructor(
        private postService: PublicPostService,
        private friendService: FriendService
    ) {

        const self = this

        this.process()
    }

    async process() {
        try {
            await this.checkForNewPosts(window['currentAccount'])
            await this.processQueue(window['currentAccount'])
        } catch(ex) {
            console.log(ex)
        }

        setTimeout(this.process, 60000)

    }


    sortQueue() {
        this.queuedPosts = this.queuedPosts.sort((obj1, obj2) => {
            if (obj1.dateCreated < obj2.dateCreated) return 1
            if (obj1.dateCreated > obj2.dateCreated) return -1
            return 0
        })
    }

    async processQueue(walletAddress: string) {

        await this.postService.loadMainFeedForWallet(walletAddress)

        this.sortQueue()

        for (let post of this.queuedPosts) {
            console.log(`Processing post: ${post.cid} from ${post.owner} into main feed`)
            await this.postService.create(post)

            //TODO: Update last processed hash for friend here instead of in getNewPostsFromFriend.
            //Could get lost if app crashes before this runs. 
        }

        //Clear queue
        this.queuedPosts = []

    }


    async checkForNewPosts(walletAddress: string) {

        if (this.processing) return

        console.log('Checking for new posts')

        this.processing = true

        await this.friendService.loadStoreForWallet(walletAddress)

        let friends: Friend[] = []
        let offset: number = 0

        do {
            friends = await this.friendService.list(offset, 10)
            offset += 10

            for (let friend of friends) {
                await this.processFriendFeed(friend)
            }
        } while (friends.length == 10)

        this.processing = false

        console.log('Checking for new posts complete')

    }

    // @timeout(2000)
    async processFriendFeed(friend: Friend) {
        console.log(`Checking for new posts from ${friend.address}`)
        let newPosts = await this.getNewPostsFromFriend(friend)

        console.log(`Queueing ${newPosts.length} posts from ${friend.address} to be added to main feed`)
        this.queuedPosts.push(...newPosts)
    }




    // @timeout(2000)
    async getNewPostsFromFriend(friend: Friend): Promise<Post[]> {

        let posts: Post[] = []

        await this.postService.loadPostFeedForWallet(friend.address)

        let lastPostFeedCid = friend.lastPostFeedCid
        let foundPosts: Post[] = []

        do {
            let foundPosts = await this.postService.getRecentPosts(10, undefined, lastPostFeedCid)
            posts = posts.concat(foundPosts)

        } while (foundPosts.length == 10)

        //Update last post hash
        if (posts.length > 0) {
            friend.lastPostFeedCid = posts[0].feedCid
        }


        await this.friendService.put(friend)

        return posts

    }



}

export {
    ProcessFeedService
}