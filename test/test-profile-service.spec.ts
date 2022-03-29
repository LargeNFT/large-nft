// //@ts-nocheck
// import { getContainer } from "./inversify.config"


// import { Profile } from "../src/dto/profile";
// import assert from 'assert'

// import { ProfileService } from "../src/service/core/profile-service";
// import { SchemaService } from "../src/service/core/schema-service";
// import { OrbitService } from "../src/service/core/orbit-service";




// const Whitepages = artifacts.require("Whitepages")

// let user0
// let user1
// let user2
// let user3
// let user4


// //@ts-ignore
// contract('ProfileService', async (accounts) => {


//     let service: ProfileService
//     let schemaService:SchemaService
//     let orbitService:OrbitService

//     let mainStore

    
//     //@ts-ignore
//     before("Before", async () => {
    
//         user0 = accounts[0]
//         user1 = accounts[1]
//         user2 = accounts[2]
//         user3 = accounts[3]
//         user4 = accounts[4]

//         let container = await getContainer()

//         service = container.get(ProfileService)
//         schemaService = container.get(SchemaService)
//         orbitService = container.get(OrbitService)

//         mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user4.toString()), user4.toString())
//         await mainStore.load()

//         await schemaService.generateSchema(orbitService.getPrivateAccessController(user4.toString()), mainStore, user4)
//         await service.loadStoreForWallet(user4)
    
        
//     })
    
//     //@ts-ignore
//     after("After", async () => {
//         // await ipfs.stop()
//     })
    

//     //@ts-ignore
//     it("Test put & get", async () => {

//         //Arrange
//         let profile: Profile = {
//             name: "Pat",
//             aboutMe: "Blah",
//             _id: "theaccount"
//         }

//         //Act
//         await service.put(profile)

//         //Assert
//         let fetched: Profile = await service.get("theaccount")

//         assert.equal(fetched.name, "Pat")
//         assert.equal(fetched.aboutMe, "Blah")
//         assert.equal(fetched._id, profile._id)
//     })

//     //@ts-ignore
//     it("Test update", async () => {

//         //Arrange
//         let profile: Profile = {
//             name: "Pat",
//             aboutMe: "Blah",
//         }

//         profile = await service.put(profile)


//         //Act
//         let fetched: Profile = await service.get(profile._id)

//         fetched.aboutMe = "new about me"
//         fetched.name = "New name"
        
//         await service.put(fetched)


//         //Assert
//         let fetched2: Profile = await service.get(profile._id)

//         assert.equal(fetched2.aboutMe, "new about me")
//         assert.equal(fetched2.name, "New name")
//         assert.equal(fetched2._id, profile._id)
//     })







// })
