import { PublicPostService } from "./public-post-service";
import { Post } from "../dto/post";
import { FriendService } from "./friend-service";
import { Friend } from "../dto/friend";

class ProcessFeedService {

    processing: boolean = false
    queuedPosts:Post[]
    
    constructor(
        private postService:PublicPostService,
        private friendService:FriendService
    ) {}

    sortQueue() {
        this.queuedPosts = this.queuedPosts.sort( (obj1, obj2) => {
            if (obj1.dateCreated > obj2.dateCreated) return 1
            if (obj1.dateCreated < obj2.dateCreated) return -1
            return 0
        } )
    }

    async processQueue() {

        await this.postService.loadMainFeedForWallet(window['currentAccount'])

        this.sortQueue()

        for (let post of this.queuedPosts) {
            console.log(`Processing post: ${post.cid} from ${post.owner} into main feed`)
            await this.postService.create(post)
        }

        //Clear queue
        this.queuedPosts = []

    }


    async checkForNewPosts() {
        
        if (this.processing) return

        this.processing = true

        await this.friendService.loadStoreForWallet(window['currentAccount'])

        let friends:Friend[] = []
        let offset:number=0

        do {
            friends = await this.friendService.list(offset, 10)
            offset += 10

            for (let friend of friends) {
                await this.processFriendFeed(friend)
            }
        } while(friends.length == 10)

        this.processing = false

    }

    async processFriendFeed(friend:Friend) {
        console.log(`Checking for new posts from ${friend.address}`)
        let newPosts = await this.friendService.getNewPostsFromFriend(friend)

        console.log(`Queueing ${newPosts.length} posts from ${friend.address} to be added to main feed`)
        this.queuedPosts.push(...newPosts)
    }

}

export {
    ProcessFeedService
}