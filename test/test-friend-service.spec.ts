//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'

import { SchemaService } from "../src/service/core/schema-service";
import { FriendService } from '../src/service/core/friend-service';
import { Friend } from '../src/dto/friend';
import { OrbitService } from "../src/service/core/orbit-service";




const Whitepages = artifacts.require("Whitepages")

let user0
let user1
let user2
let user3
let user4


contract('FriendService', async (accounts) => {

    let service: FriendService
    let orbitService:OrbitService
    let schemaService:SchemaService

    let mainStore
    
    before("before", async () => {
    
        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(FriendService)
        schemaService = container.get(SchemaService)
        orbitService = container.get(OrbitService)

        mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user2.toString()), user2.toString())
        await mainStore.load()

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user2.toString()), mainStore, user2)
        await service.loadStoreForWallet(user2)
    
    })
    
    after("After", async () => {
        // await ipfs.stop()
    })


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

    it("should create multiple friends and read back in order", async () => {

        //Arrange
        await service.put({address: "2"})

        await service.put({address: "3"})

        await service.put({address: "4"})


        //Act
        let it = await service.getFriends(4,0)

        //assert
        assert.equal(it.length, 4)
        assert.equal(it[0].address, "4")
        assert.equal(it[1].address, "3")
        assert.equal(it[2].address, "2")
        assert.equal(it[3].address, "1")
    })


    it("should create multiple friends and read back just the last part of the list", async () => {

        //Arrange
        await service.put({address: "5"})

        await service.put({address: "6"})

        await service.put({address: "7"})


        //Act
        let it2 = await service.getFriends(3,0)


        assert.equal(it2.length, 3)
        assert.equal(it2[0].address, "7")
        assert.equal(it2[1].address, "6")
        assert.equal(it2[2].address, "5")


    })


    it("should load a friend store with lots of friends and page through them", async () => {

        //Arrange
        for (var i = 0; i < 100; i++) {
            await service.put( {address: (i + 10).toString()})
        }

        await service.close()

        await service.loadStoreForWallet(user2)
        await service.load()

        //Get a page of 3
        let it = await service.getFriends(3,0)

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].address, "99")
        assert.equal(it[1].address, "98")
        assert.equal(it[2].address, "97")

        it = await service.getFriends(3, 3)

        assert.equal(it.length, 3)
        assert.equal(it[0].address, "96")
        assert.equal(it[1].address, "95")
        assert.equal(it[2].address, "94")

        it = await service.getFriends(3,6)

        assert.equal(it.length, 3)
        assert.equal(it[0].address, "93")
        assert.equal(it[1].address, "92")
        assert.equal(it[2].address, "91")

    })


    //@ts-ignore
    // it("should grab the most recently updated friends", async () => {

    //     let friendAddress = Math.random().toString()

    //     await createMainStore(friendAddress)
    //     await service.loadStoreForWallet(friendAddress)

    //     // let store = await Core.orbitDb.kvstore()

    //     await service.put({address: "1", lastPostMilli: 1})
    //     await service.put({address: "2", lastPostMilli: 2})
    //     await service.put({address: "3", lastPostMilli: 3})
    //     await service.put({address: "4", lastPostMilli: 4})
    //     await service.put({address: "5", lastPostMilli: 5})
    //     await service.put({address: "6", lastPostMilli: 6})
    //     await service.put({address: "7", lastPostMilli: 7})
    //     await service.put({address: "8", lastPostMilli: 8})
    //     await service.put({address: "9", lastPostMilli: 9})
    //     await service.put({address: "10", lastPostMilli: 10})

    //     let friends:Friend[] = service.listByDateMilli()

    //     assert.equal(friends[0].address, "10")
    //     assert.equal(friends[1].address, "9")
    //     assert.equal(friends[2].address, "8")
    //     assert.equal(friends[3].address, "7")
    //     assert.equal(friends[4].address, "6")
    //     assert.equal(friends[5].address, "5")
    //     assert.equal(friends[6].address, "4")
    //     assert.equal(friends[7].address, "3")
    //     assert.equal(friends[8].address, "2")
    //     assert.equal(friends[9].address, "1")

    //     await service.put({address: "1", lastPostMilli: 11})
    //     await service.put({address: "5", lastPostMilli: 12})
    //     await service.put({address: "9", lastPostMilli: 13})
    //     await service.put({address: "4", lastPostMilli: 4})


    //     friends = service.listByDateMilli()
        
    //     assert.equal(friends[0].address, "9")
    //     assert.equal(friends[1].address, "5")
    //     assert.equal(friends[2].address, "1")
    //     assert.equal(friends[3].address, "10")
    //     assert.equal(friends[4].address, "8")
    //     assert.equal(friends[5].address, "7")
    //     assert.equal(friends[6].address, "6")
    //     assert.equal(friends[7].address, "4")
    //     assert.equal(friends[8].address, "3")
    //     assert.equal(friends[9].address, "2")



    // }) 

    async function createMainStore(address:string) {
        let mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(address.toString()), address)
        await schemaService.generateSchema(orbitService.getPrivateAccessController(address.toString()), mainStore, address)
        await service.loadStoreForWallet(address)
    }


})

