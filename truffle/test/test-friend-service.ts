
import assert = require('assert')
import { Global } from "../../js/global";
import { SchemaService } from "../../js/services/util/schema-service";
import { FriendService } from '../../js/services/friend-service';
import { Friend } from '../../js/dto/friend';
import { IdentityService } from '../../js/services/util/identity-service';
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

    let service: FriendService = new FriendService()
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
        Global.identityService = new IdentityService()
        Global.schemaService = new SchemaService()
        Global.orbitAccessControl = Global.identityService.getAccessController(orbitdb)


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
    it("should load a database with lots of records and page through them", async () => {

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





})


