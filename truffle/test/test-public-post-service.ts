import { Post } from "../../js/dto/post"
import assert = require('assert')
import { PublicPostService } from "../../js/services/public-post-service"
import { Global } from "../../js/global";
import { SchemaService } from "../../js/services/util/schema-service";
const Keystore = require('orbit-db-keystore')



const OrbitDB = require('orbit-db')

const path = require('path')
const keypath = path.resolve('./keys')


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: "ipfs", // Switch to localhost if you're not using the docker/devcontainer setup.
    port: 5001,
    protocol: 'http'
  })




//@ts-ignore
contract('PublicPostService', async (accounts) => {

    let service: PublicPostService
    let mainStore
    let address: number

    //@ts-ignore
    before("", async () => {


        address = Math.random()

        const orbitdb = await OrbitDB.createInstance(ipfs, {
            directory: "./orbitdb"
        })

        Global.ipfs = ipfs
        Global.orbitDb = orbitdb
        Global.schemaService = new SchemaService()

        mainStore = await Global.schemaService.getMainStoreByWalletAddress(address.toString())
        await mainStore.load()

        await Global.schemaService.generateSchema(orbitdb, {}, mainStore, address.toString())

        service = await PublicPostService.getInstance(address.toString())


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
        assert.notEqual(post.cid, undefined)


        let fetched: Post = await PublicPostService.read(post.cid)


        assert.equal(fetched.content, "Actual content")
        assert.equal(fetched.cid, post.cid)
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
        let it = await service.getRecentPosts(0,3)

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
        let it = await service.getRecentPosts(0,3)

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "6")
        assert.equal(it[1].content, "5")
        assert.equal(it[2].content, "4")
    })


    //@ts-ignore
    it("should create multiple posts and skip a few of them", async () => {

        //Arrange
        let post = await service.create({
            content: "7"
        })

        await service.create({
            content: "8"
        })

        await service.create({
            content: "9"
        })


        //Act
        let it = await service.getRecentPosts(3, 3, post.feedCid)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "6")
        assert.equal(it[1].content, "5")
        assert.equal(it[2].content, "4")
    })



    //@ts-ignore
    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        for (var i=0; i < 100; i++) {
            await service.create({content: (i + 10).toString() })
        }

        await service.close()

        service = await PublicPostService.getInstance(address.toString())


        //Get a page of 3
        let it = await service.getRecentPosts(0, 3)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "109")
        assert.equal(it[1].content, "108")
        assert.equal(it[2].content, "107")

        it = await service.getRecentPosts(3, 3,  it[2].feedCid)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "106")
        assert.equal(it[1].content, "105")
        assert.equal(it[2].content, "104")



        it = await service.getRecentPosts(6, 3, it[2].feedCid)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "103")
        assert.equal(it[1].content, "102")
        assert.equal(it[2].content, "101")



        it = await service.getRecentPosts(9, 3, it[2].feedCid)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "100")
        assert.equal(it[1].content, "99")
        assert.equal(it[2].content, "98")




    })





})
