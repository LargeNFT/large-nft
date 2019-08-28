
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
    let postUiService:PostUIService
    let service: FriendService
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
        Global.identityService = new IdentityService()
        Global.schemaService = new SchemaService()
        Global.orbitAccessControl = Global.identityService.getAccessController(orbitdb)

        postService = new PublicPostService(Global.schemaService)
        postUiService = new PostUIService(postService, new ProfileService(), Global.schemaService)
        service = new FriendService(postService)

        let mainStore = await Global.schemaService.generateMainStore(Global.orbitDb, Global.orbitAccessControl, address.toString())

        await Global.schemaService.generateSchema(orbitdb, {}, mainStore, address.toString())

        await service.loadStoreForWallet(address.toString())



    })

    //@ts-ignore
    it("should create & get", async () => {

        //Arrange
        let friend: Friend = {
            address: "1"
        }

        //Act
        await service.put(friend)
        
        //Assert
        let fetched: Friend = await service.get(friend.address)  


        assert.equal(fetched.address, "1")
    })

    //@ts-ignore
    it("should create multiple friends and read back in order", async () => {

        //Arrange
        await service.put({
            address: "2"
        })

        await service.put({
            address: "3"
        })

        await service.put({
            address: "4"
        })


        //Act
        let it = await service.list(0, 4)

        //assert
        assert.equal(it.length, 4)
        assert.equal(it[0].address, "1")
        assert.equal(it[1].address, "2")
        assert.equal(it[2].address, "3")
        assert.equal(it[3].address, "4")
    })


    //@ts-ignore
    it("should create multiple friends and read back just the last part of the list", async () => {

        //Arrange
        await service.put({
            address: "5"
        })

        await service.put({
            address: "6"
        })

        await service.put({
            address: "7"
        })


        //Act
        let it2 = await service.list(4, 3)


        assert.equal(it2.length, 3)
        assert.equal(it2[0].address, "5")
        assert.equal(it2[1].address, "6")
        assert.equal(it2[2].address, "7")


    })
    

    //This test has sort of morphed into a duplicate of the one above. Maybe remove.
    //@ts-ignore
    it("should create multiple friends and skip a few of them", async () => {

        //Arrange
        let post = await service.put({
            address: "8"
        })

        await service.put({
            address: "9"
        })

        await service.put({
            address: "10"
        })


        //Act
        let it = await service.list(7, 3)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].address, "8")
        assert.equal(it[1].address, "9")
        assert.equal(it[2].address, "10") 
    })



    //@ts-ignore
    it("should load a friend store with lots of friends and page through them", async () => {

        //Arrange
        for (var i=0; i < 100; i++) {
            await service.put({
                address: (i + 10).toString()
            })
        }

        await service.close()

        await service.loadStoreForWallet(address.toString())
        await service.load()

        //Get a page of 3
        let it = await service.list(0, 3)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].address, "1")
        assert.equal(it[1].address, "2")
        assert.equal(it[2].address, "3")

        it = await service.list(3, 3)

        assert.equal(it.length, 3)
        assert.equal(it[0].address, "4")
        assert.equal(it[1].address, "5")
        assert.equal(it[2].address, "6")

        it = await service.list(6, 3)

        assert.equal(it.length, 3)
        assert.equal(it[0].address, "7")
        assert.equal(it[1].address, "8")
        assert.equal(it[2].address, "9")


        it = await service.list(106, 3)

        assert.equal(it.length, 3)
        assert.equal(it[0].address, "107")
        assert.equal(it[1].address, "108")
        assert.equal(it[2].address, "109")

    })

    //@ts-ignore
    it("should read a friend's feed and get the new posts", async () => {


        //Make a friend
        let friend = await service.put({
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
        let posts:Post[] = await service.getNewPostsFromFriend(friend)
        
        assert.equal(posts.length, 4)        
    
        //The first time it's called should return 5 records. The second should return 0.
        posts = await service.getNewPostsFromFriend(friend)

        assert.equal(posts.length, 0)



    })



})
