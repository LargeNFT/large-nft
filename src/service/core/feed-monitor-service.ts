import { ReadOnlyPostService } from "./readonly-post-service"
import { Post } from "../../dto/post"
import { FriendService } from "./friend-service"
import { Friend } from "../../dto/friend"
import { SchemaService } from "./schema-service"
import { inject, injectable } from "inversify"
import { OrbitService } from "./orbit-service"

@injectable()
class FeedMonitorService {

    private _unreadPosts: number = 0

    getUnreadPosts(): number {
        return this._unreadPosts
    }

    constructor(
        private schemaService: SchemaService,
        private friendService: FriendService,
        private orbitService:OrbitService,
        private readOnlyPostService: ReadOnlyPostService,
        @inject('eventEmitter') private eventEmitter
    ) {}

    async start() {
        await this.getFriendsNewPosts(window['currentAccount'])

        setInterval(async () => { await this.getFriendsNewPosts(window['currentAccount']) }, 60000)
    }

    async getFriendsNewPosts(walletAddress: string) {

        // console.log('start: get new friend posts')

        await this.friendService.loadStoreForWallet(walletAddress)
        let friends: Friend[] = await this.friendService.getAll()

        let newPosts: Post[] = []

        for (let friend of friends) {
            try {
                let friendPosts = await this.getNewPostsFromFriend(friend)
                newPosts = newPosts.concat(friendPosts)
            } catch (ex) {
                console.log(ex)
            }
        }

        
        await this.saveFriendPosts(newPosts, friends, walletAddress)

        // console.log('complete: get new friend posts')

    }

    async getNewPostsFromFriend(friend: Friend): Promise<Post[]> {

        if (!friend.address) return

        let postFeed = await this.schemaService.getReadOnlyPostFeedByWalletAddress(friend.address)

        let response = await postFeed.db.find({
            selector: {
                _id: {
                  $gt: friend.lastPostId
                 }
            },
            sort: [{_id: 'desc'}]
        })

        return response.docs
    }

    async saveFriendPosts(posts:Post[], friends:Friend[], walletAddress:string) {

        posts.sort((a, b) => a.dateCreatedMilli > b.dateCreatedMilli ? 1 : -1)

        posts = posts.filter(post => post.owner != undefined)

        if (posts.length > 0) {

            await this.readOnlyPostService.loadMainFeedForWallet(walletAddress)
            await this.readOnlyPostService.load() 

            for (let post of posts) {

                await this.readOnlyPostService.put(post)

                //Update friend last post seen
                let friend = friends.find(friend => friend.address == post.owner)

                await this.updateFriendLastPost(friend, post)

                //Increment unread post counter
                this._unreadPosts += 1

                this.eventEmitter.emit('unread-posts-updated', this._unreadPosts)

                console.log(`Post added: ${post._id}`)
            }

        }
    }

    async updateFriendLastPost(friend: Friend, post: Post) {

        friend.lastPostId = post._id
        friend.lastPostMilli = post.dateCreatedMilli

        await this.friendService.put(friend)

        return this.friendService.get(friend.address.toString())
    }

    async markAllPostsRead() {
        this._unreadPosts = 0
    }

}



export {
    FeedMonitorService
}