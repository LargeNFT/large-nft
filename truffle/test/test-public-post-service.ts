import { Post } from "../../js/dto/post"
import assert = require('assert')
import { PublicPostService } from "../../js/services/public-post-service"
import { IdentityService } from "../../js/services/identity-service";
const Keystore = require('orbit-db-keystore')



const OrbitDB = require('orbit-db')

const path = require('path')
const keypath = path.resolve('./keys')


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
  })


//@ts-ignore
contract('PublicPostService', async (accounts) => {

    let service: PublicPostService
    let identityService: IdentityService
    
    //@ts-ignore
    before("", async () => {

        identityService = new IdentityService()

        let keystore = Keystore.create(keypath)

        let identity = await identityService.getIdentity(keystore)


        const orbitdb = await OrbitDB.createInstance(ipfs, {
            directory: "./orbitdb",
            identity: identity
        })

        // console.log(JSON.stringify(orbitdb.identity)) 


        let ac = identityService.getAccessController(orbitdb)

        let store = await orbitdb.feed("test-post", {
            accessController: ac
        })

        service = new PublicPostService(store)
    })

    //@ts-ignore
    it("should create & get", async () => {

        //Arrange
        let post: Post = {
            content: "Actual content"
        }

        //Act
        await service.create(post)
        
        //Assert
        assert.notEqual(post._id, undefined)

        
        let fetched: Post = await service.read(post._id)    


        assert.equal(fetched.content, "Actual content")
        assert.equal(fetched._id, post._id)
    })

    //@ts-ignore
    it("should create multiple posts and read back in order", async () => {

        //Arrange
        await service.create({
            content: "1"
        })

        await service.create({
            content: "2"
        })

        await service.create({
            content: "3"
        })


        //Act
        let it = await service.getRecentPosts({
            limit: 3
        })

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "3")
        assert.equal(it[1].content, "2")
        assert.equal(it[2].content, "1")
    })


    //@ts-ignore
    it("should create multiple posts and read back just the last part of the list", async () => {

        //Arrange
        await service.create({
            content: "4"
        })

        await service.create({
            content: "5"
        })

        await service.create({
            content: "6"
        })


        //Act
        let it = await service.getRecentPosts({
            limit: 3
        })

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "6")
        assert.equal(it[1].content, "5")
        assert.equal(it[2].content, "4")
    })
    

    //@ts-ignore
    it("should create multiple posts and skip a few of them", async () => {

        //Arrange
        let hash = await service.create({
            content: "7"
        })

        await service.create({
            content: "8"
        })

        await service.create({
            content: "9"
        })


        //Act
        let it = await service.getRecentPosts({
            limit: 3,
            before: hash
        })

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "6")
        assert.equal(it[1].content, "5")
        assert.equal(it[2].content, "4")
    })





})


