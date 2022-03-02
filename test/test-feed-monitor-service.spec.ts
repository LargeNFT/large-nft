// @ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'
import moment from 'moment'

import { FriendService } from '../src/service/core/friend-service';
import { Friend } from '../src/dto/friend';
import { ReadOnlyPostService } from '../src/service/core/readonly-post-service';
import { Post } from '../src/dto/post';
import { FeedMonitorService } from "../src/service/core/feed-monitor-service";
import { SchemaService } from "../src/service/core/schema-service";
import { OrbitService } from "../src/service/core/orbit-service";


const Whitepages = artifacts.require("Whitepages")

let user0
let user1
let user2
let user3
let user4




//@ts-ignore
contract('FeedMonitorService', async (accounts) => {

    let service: FeedMonitorService
    let friendService: FriendService
    let schemaService:SchemaService
    let readOnlyPostService:ReadOnlyPostService
    let orbitService:OrbitService
    
    let address

    //@ts-ignore
    before("Before", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        orbitService = container.get(OrbitService)
        schemaService = container.get(SchemaService)
        service = container.get(FeedMonitorService)
        friendService = container.get(FriendService)
        readOnlyPostService = container.get(ReadOnlyPostService)

        let mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user1.toString()), user1.toString())

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user1.toString()), mainStore, user1.toString())

        await friendService.loadStoreForWallet(user1.toString())



    })

    //@ts-ignore
    after("After", async () => {
        // await ipfs.stop()
    })


    //@ts-ignore
    it("should load a friend's latest posts and update the last seen one", async () => {

        //Make a friend
        let friendAddress = Math.random().toString()
        let friend = await createFriend(friendAddress)

        //Make 10 posts for the friend
        await readOnlyPostService.loadPostFeedForWallet(friendAddress)

        await createPostForFriend(friendAddress, "1")
        await createPostForFriend(friendAddress, "2")
        await createPostForFriend(friendAddress, "3")
        await createPostForFriend(friendAddress, "4")
        await createPostForFriend(friendAddress, "5")
        let post = await createPostForFriend(friendAddress, "6")
        await createPostForFriend(friendAddress, "7")
        await createPostForFriend(friendAddress, "8")
        await createPostForFriend(friendAddress, "9")
        await createPostForFriend(friendAddress, "10")
        await createPostForFriend(friendAddress, "11")
        await createPostForFriend(friendAddress, "12")
        await createPostForFriend(friendAddress, "13")
        await createPostForFriend(friendAddress, "14")
        await createPostForFriend(friendAddress, "15")
        await createPostForFriend(friendAddress, "16")
        await createPostForFriend(friendAddress, "17")
        await createPostForFriend(friendAddress, "18")
        await createPostForFriend(friendAddress, "19")
        await createPostForFriend(friendAddress, "20")
        await createPostForFriend(friendAddress, "21")
        await createPostForFriend(friendAddress, "22")




        //Take the hash of the 6th one and get new posts. 
        friend.lastPostId = post._id

        let posts: Post[] = await service.getNewPostsFromFriend(friend)

        assert.equal(posts.length, 16)

        friend = await service.updateFriendLastPost(friend, posts[0])


        //The first time it's called should return 5 records. The second should return 0.
        posts = await service.getNewPostsFromFriend(friend)
        assert.equal(posts.length, 0)



        //Add 5 more
        await createPostForFriend(friendAddress, "23")
        await createPostForFriend(friendAddress, "24")
        await createPostForFriend(friendAddress, "25")
        await createPostForFriend(friendAddress, "26")
        await createPostForFriend(friendAddress, "27")


        //The first time it's called should return 5 records. The second should return 0.
        posts = await service.getNewPostsFromFriend(friend)

        assert.equal(posts.length, 5)

        friend = await service.updateFriendLastPost(friend, posts[0])


        posts = await service.getNewPostsFromFriend(friend)

        assert.equal(posts.length, 0)

    })



    // //@ts-ignore
    // it("should load a friend's latest posts and update the last seen one", async () => {

    //     let mainFeed = await schemaService.getMainFeedByWalletAddress(user1.toString())
    //     await mainFeed.drop()

    //     let friendStore = await schemaService.getFriendStoreByWalletAddress(user1.toString())
    //     await friendStore.drop()

    //     await friendService.loadStoreForWallet(user1)

    //     //Make 3 friends
    //     await createFriend("1")
    //     await createFriend("2")
    //     await createFriend("3")


    //     await createPostForFriend("1", "1")
    //     await createPostForFriend("2", "2")
    //     await createPostForFriend("3", "3")

    //     await createPostForFriend("1", "4")
    //     await createPostForFriend("2", "5")
    //     await createPostForFriend("3", "6")

    //     await createPostForFriend("1", "7")
    //     await createPostForFriend("2", "8")
    //     await createPostForFriend("3", "9")

    //     await createPostForFriend("1", "10")

    //     await service.getFriendsNewPosts(user1.toString())

   
    //     readOnlyPostService.loadMainFeedForWallet(user1)

    //     let posts: Post[] = await readOnlyPostService.getPosts(100,0)
    //     assert.equal(posts.length, 10)

    //     assert.equal(posts[0].content, "10")
    //     assert.equal(posts[1].content, "9")
    //     assert.equal(posts[2].content, "8")
    //     assert.equal(posts[3].content, "7")
    //     assert.equal(posts[4].content, "6")
    //     assert.equal(posts[5].content, "5")
    //     assert.equal(posts[6].content, "4")
    //     assert.equal(posts[7].content, "3")
    //     assert.equal(posts[8].content, "2")
    //     assert.equal(posts[9].content, "1")



    //     //Do it again and make sure it doesn't re-add them.
    //     await service.getFriendsNewPosts(user1.toString())


    //     posts = await readOnlyPostService.getPosts(100,0)
    //     assert.equal(posts.length, 10)



    // })



    async function createPostForFriend(address, content) {
        await readOnlyPostService.loadPostFeedForWallet(address)
        return readOnlyPostService.put({ content: content, owner: address, dateCreatedMilli: moment().utc().valueOf() })
    }



    async function createFriend(address) {

        let friend: Friend = { address: address }

        await friendService.put({ address: address })

        friend = friendService.get(address)

        let friendStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(address.toString()), address)
        await schemaService.generateSchema(orbitService.getPrivateAccessController(address.toString()), friendStore, address)
        await friendStore.close()

        let postFeed = await schemaService.getReadOnlyPostFeedByWalletAddress(address)
        await postFeed.drop()

        return friend
    }


})


