//@ts-nocheck
import { getContainer } from "./inversify.config"

import { Post } from "../src/dto/post"
import assert from 'assert'
import moment from 'moment'

import { ReadOnlyPostService } from "../src/service/core/readonly-post-service"
import { SchemaService } from "../src/service/core/schema-service";
import { OrbitService } from "../src/service/core/orbit-service";

const Whitepages = artifacts.require("Whitepages")

let user0
let user1
let user2
let user3
let user4
let user5

contract('ReadOnlyPostService', async (accounts) => {

    let service: ReadOnlyPostService

    let orbitService:OrbitService
    let schemaService:SchemaService

    let mainStore


    //@ts-ignore
    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
        user5 = accounts[5]

        let container = await getContainer()
        
        service = container.get(ReadOnlyPostService)
        schemaService = container.get(SchemaService)
        orbitService = container.get(OrbitService)

        mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user5.toString()), user5.toString())
        await mainStore.load()

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user5.toString()), mainStore, user5)
        await service.loadPostFeedForWallet(user5)


    })

    after("After", async () => {
        // await ipfs.stop()
    })

    it("should create & get", async () => {

        //Arrange
        let post: Post = {
            content: "Actual content",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        }

        //Act
        post = await service.put(post)

        //Assert
        assert.notEqual(post._id, undefined)


        let fetched: Post = await service.get(post._id)

        assert.equal(fetched.content, "Actual content")
        assert.equal(fetched._id, post._id)
    })

    it("should create multiple posts and read back in order", async () => {

        //Arrange
        await service.put({
            content: "1",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        await service.put({
            content: "2",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        await service.put({
            content: "3",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        //Act
        let it = await service.getPosts(3,0)

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "3")
        assert.equal(it[1].content, "2")
        assert.equal(it[2].content, "1")
    })


    it("should create multiple posts and read back just the last part of the list", async () => {

        //Arrange
        await service.put({
            content: "4",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        await service.put({
            content: "5",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        await service.put({
            content: "6",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        //Act
        let it = await service.getPosts(3, 0)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "6")
        assert.equal(it[1].content, "5")
        assert.equal(it[2].content, "4")
    })


    it("should create multiple posts and skip a few of them", async () => {

        //Arrange
        let post = await service.put({
            content: "7",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        await service.put({
            content: "8",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        await service.put({
            content: "9",
            owner: user5.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        //Act
        let it = await service.getPosts(3, 7, post._id)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "2")
        assert.equal(it[1].content, "1")
        assert.equal(it[2].content, "Actual content")
    })



    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        for (var i = 0; i < 100; i++) {
            await service.put({
                content: (i + 10).toString(),
                owner: user5.toString(),
                dateCreatedMilli: moment().utc().valueOf()
            })
        }

        await service.close()

        await service.loadPostFeedForWallet(user5)

        //Get a page of 3
        let it = await service.getPosts(3,0)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content, "109")
        assert.equal(it[1].content, "108")
        assert.equal(it[2].content, "107")

        await service.loadPostFeedForWallet(user5)
        it = await service.getPosts(3, 3, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "106")
        assert.equal(it[1].content, "105")
        assert.equal(it[2].content, "104")


        await service.loadPostFeedForWallet(user5)
        it = await service.getPosts(3, 6, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "103")
        assert.equal(it[1].content, "102")
        assert.equal(it[2].content, "101")


        await service.loadPostFeedForWallet(user5)
        it = await service.getPosts(3, 9, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "100")
        assert.equal(it[1].content, "99")
        assert.equal(it[2].content, "98")

        await service.loadPostFeedForWallet(user5)
        it = await service.getPosts(3, 12, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content, "97")
        assert.equal(it[1].content, "96")
        assert.equal(it[2].content, "95")

    })


    //@ts-ignore 
    it("should should page properly no matter what limit we pass", async () => {

        let mainStore2 = await schemaService.getMainStoreByWalletAddress("test-3")
        await mainStore2.load()
        await schemaService.generateSchema(orbitService.getPrivateAccessController("test-3"), mainStore2, "test-3")

        await service.loadPostFeedForWallet("test-3")

        //Arrange
        for (var i = 0; i < 10; i++) {
            await service.put({
                content: (i + 10).toString(),
                owner: "test-3",
                dateCreatedMilli: moment().utc().valueOf()
            })
        }

        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let less = await service.getPosts(8,0)
        assert.equal(less.length, 8)


        //All records
        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let all = await service.getPosts(10,0)
        assert.equal(all.length, 10)

        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let more = await service.getPosts(11,0)
        assert.equal(more.length, 10)


        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let more2 = await service.getPosts(12,0)
        assert.equal(more2.length, 10)

        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let more3 = await service.getPosts(14,0)
        assert.equal(more3.length, 10)


        await service.close()
        await service.loadPostFeedForWallet("test-3")
        let more4 = await service.getPosts(14,0)
        assert.equal(more4.length, 10)


    })


})
