
import assert = require('assert')
import { Global } from "../../js/global";
import { SchemaService } from "../../js/services/util/schema-service";
import { FriendService } from '../../js/services/friend-service';
import { Friend } from '../../js/dto/friend';
import { IdentityService } from '../../js/services/util/identity-service';
import { PublicPostService } from '../../js/services/public-post-service';
import { isMainThread } from 'worker_threads';
import { Post } from '../../js/dto/post';
import { ProfileService } from '../../js/services/profile-service';
import { PostUIService } from '../../js/services/post-ui-service';
import { ProcessFeedService } from '../../js/services/process-feed-service';
import { ImageService } from '../../js/services/util/image-service';
const TableStore = require('orbit-db-tablestore')


const OrbitDB = require('orbit-db')


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
  })




//@ts-ignore
contract('FriendService', async (accounts) => {

    let postService:PublicPostService
    let friendService: FriendService
    let postUiService:PostUIService
    let processFeedService:ProcessFeedService

    let mainStore
    let address: number
    let orbitdb


    //@ts-ignore
    before("", async () => {


        address = Math.random()

        orbitdb = await OrbitDB.createInstance(ipfs, {
            directory: "./orbitdb"
        })

        Global.ipfs = ipfs
        Global.orbitDb = orbitdb
        Global.schemaService = new SchemaService()
        Global.orbitAccessControl = Global.identityService.getAccessController(orbitdb)

        postService = new PublicPostService(Global.schemaService)
        friendService = new FriendService(postService)
        postUiService = new PostUIService(postService, new ProfileService(), Global.schemaService, new ImageService())
        processFeedService = new ProcessFeedService(postService, friendService)


        let mainStore = await Global.schemaService.generateMainStore(Global.orbitDb, Global.orbitAccessControl, address.toString())

        await Global.schemaService.generateSchema(orbitdb, {}, mainStore, address.toString())

        await friendService.loadStoreForWallet(address.toString())



    })


    //@ts-ignore
    it("should read a friend's feed and get the new posts", async () => {


        //Make a friend
        let friend = await friendService.put({
            address: "MX0"
        })

        let friendStore = await Global.schemaService.generateMainStore(orbitdb, Global.orbitAccessControl, "MX0")
        await Global.schemaService.generateSchema(orbitdb, Global.orbitAccessControl, friendStore, "MX0")
        await friendStore.close()

        let postFeed = await Global.schemaService.getPostFeedByWalletAddress("MX0")
        await postFeed.drop()

        //Make 10 posts for the friend
        await postUiService.loadPostFeedForWallet("MX0")

        await postUiService.postMessage("1", "MX0")
        await postUiService.postMessage("2", "MX0")
        await postUiService.postMessage("3", "MX0")
        await postUiService.postMessage("4", "MX0")
        await postUiService.postMessage("5", "MX0")
        let post = await postUiService.postMessage("6", "MX0")
        await postUiService.postMessage("7", "MX0")
        await postUiService.postMessage("8", "MX0")
        await postUiService.postMessage("9", "MX0")
        await postUiService.postMessage("10", "MX0")


        //Take the hash of the 6th one and get new posts. 
        friend.lastPostFeedCid = post.feedCid
        let posts:Post[] = await processFeedService.getNewPostsFromFriend(friend)
        
        assert.equal(posts.length, 4)        
    
        //The first time it's called should return 5 records. The second should return 0.
        posts = await processFeedService.getNewPostsFromFriend(friend)

        assert.equal(posts.length, 0)



    })




    //@ts-ignore
    it("should process feeds from multiple users", async () => {

        let friend1 = Math.random()
        let friend2 = Math.random()
        let friend3 = Math.random()
        let friend4 = Math.random()
        let friend5 = Math.random()
        let friend6 = Math.random()
        let friend7 = Math.random()
        let friend8 = Math.random()
        let friend9 = Math.random()

        await createFriend(friend1.toString(), friendService, postUiService)
        await createFriend(friend2.toString(), friendService, postUiService)
        await createFriend(friend3.toString(), friendService, postUiService)
        await createFriend(friend4.toString(), friendService, postUiService)
        await createFriend(friend5.toString(), friendService, postUiService)
        await createFriend(friend6.toString(), friendService, postUiService)
        await createFriend(friend7.toString(), friendService, postUiService)
        await createFriend(friend8.toString(), friendService, postUiService)
        await createFriend(friend9.toString(), friendService, postUiService)

        await processFeedService.checkForNewPosts(address.toString())

       
    })

    //@ts-ignore
    it("should process the queue and insert posts into main feed", async () => {

        await processFeedService.processQueue(address.toString())

    })


    let createFriend = async function(walletAddress:string, friendService:FriendService, postUiService:PostUIService) {

        //Make a friend
        await friendService.put({
            address: walletAddress
        })

        let friendStore = await Global.schemaService.generateMainStore(orbitdb, Global.orbitAccessControl, walletAddress)
        await Global.schemaService.generateSchema(orbitdb, Global.orbitAccessControl, friendStore, walletAddress)
        await friendStore.close()

        let postFeed = await Global.schemaService.getPostFeedByWalletAddress(walletAddress)
        await postFeed.drop()

        //Make 10 posts for the friend
        await postUiService.loadPostFeedForWallet(walletAddress)

        await postUiService.postMessage("1", walletAddress)
        await postUiService.postMessage("2", walletAddress)
        await postUiService.postMessage("3", walletAddress)
        await postUiService.postMessage("4", walletAddress)
        await postUiService.postMessage("5", walletAddress)
        let post = await postUiService.postMessage("6", walletAddress)
        await postUiService.postMessage("7", walletAddress)
        await postUiService.postMessage("8", walletAddress)
        await postUiService.postMessage("9", walletAddress)
        await postUiService.postMessage("10", walletAddress)
    }



})
