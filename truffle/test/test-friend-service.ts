
// import assert = require('assert')
// import { Global } from "../../js/global";
// import { SchemaService } from "../../js/services/util/schema-service";
// import { FriendService } from '../../js/services/friend-service';
// import { Friend } from '../../js/dto/friend';
// const TableStore = require('orbit-db-tablestore')


// const OrbitDB = require('orbit-db')


// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({
//     host: "localhost",
//     port: 5001,
//     protocol: 'http'
//   })




// //@ts-ignore
// contract('FriendService', async (accounts) => {

//     let service: FriendService
//     let mainStore
//     let address: number
    
//     //@ts-ignore
//     before("", async () => {


//         address = Math.random()

//         const orbitdb = await OrbitDB.createInstance(ipfs, {
//             directory: "./orbitdb"
//         })

//         Global.ipfs = ipfs
//         Global.orbitDb = orbitdb
//         Global.schemaService = new SchemaService()

//         mainStore = await Global.schemaService.getMainStoreByWalletAddress(address.toString())
//         await mainStore.load()

//         await Global.schemaService.generateSchema(orbitdb, {}, mainStore, address.toString())

//         service = await FriendService.getInstance(address.toString())


//     })

//     //@ts-ignore
//     it("should create & get", async () => {

//         //Arrange
//         let friend: Friend = {
//             address: "1"
//         }

//         //Act
//         await service.create(friend)
        
//         //Assert
//         let fetched: Friend = await FriendService.read(friend.cid)  


//         assert.equal(fetched.address, "1")
//     })

//     //@ts-ignore
//     it("should create multiple friends and read back in order", async () => {

//         //Arrange
//         await service.create({
//             address: "2"
//         })

//         await service.create({
//             address: "3"
//         })

//         await service.create({
//             address: "4"
//         })


//         //Act
//         let it = await service.getRecentFriends(0,3)

//         //assert
//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "4")
//         assert.equal(it[1].address, "3")
//         assert.equal(it[2].address, "2")
//     })


//     //@ts-ignore
//     it("should create multiple friends and read back just the last part of the list", async () => {

//         //Arrange
//         await service.create({
//             address: "5"
//         })

//         await service.create({
//             address: "6"
//         })

//         await service.create({
//             address: "7"
//         })


//         //Act
//         let it = await service.getRecentFriends(0,3)
//         let it2 = await service.getRecentFriends(3, 3)

//         //assert
//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "7")
//         assert.equal(it[1].address, "6")
//         assert.equal(it[2].address, "5")

//         assert.equal(it2.length, 3)
//         assert.equal(it2[0].address, "4")
//         assert.equal(it2[1].address, "3")
//         assert.equal(it2[2].address, "2")


//     })
    

//     //@ts-ignore
//     it("should create multiple friends and skip a few of them", async () => {

//         //Arrange
//         let post = await service.create({
//             address: "8"
//         })

//         await service.create({
//             address: "9"
//         })

//         await service.create({
//             address: "10"
//         })


//         //Act
//         let it = await service.getRecentFriends(6, 3)


//         //assert
//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "10")
//         assert.equal(it[1].address, "9")
//         assert.equal(it[2].address, "8")
//     })



//     //@ts-ignore
//     it("should load a database with lots of records and page through them", async () => {

//         //Arrange
//         for (var i=0; i < 100; i++) {
//             await service.create({
//                 address: (i + 10).toString()
//             })
//         }

//         await service.close()

//         service = await FriendService.getInstance(address.toString())


//         //Get a page of 3
//         let it = await service.getRecentFriends(0, 3)


//         //assert
//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "109")
//         assert.equal(it[1].address, "108")
//         assert.equal(it[2].address, "107")

//         it = await service.getRecentFriends(3, 3)

//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "106")
//         assert.equal(it[1].address, "105")
//         assert.equal(it[2].address, "104")



//         it = await service.getRecentFriends(6, 3)

//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "103")
//         assert.equal(it[1].address, "102")
//         assert.equal(it[2].address, "101")



//         it = await service.getRecentFriends(9, 3)

//         assert.equal(it.length, 3)
//         assert.equal(it[0].address, "100")
//         assert.equal(it[1].address, "99")
//         assert.equal(it[2].address, "98")




//     })





// })


