import { Profile } from "../../js/dto/profile";
import assert = require('assert');
import { ProfileService } from "../../js/services/profile-service";

const OrbitDB = require('orbit-db')


const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
  })


//@ts-ignore
contract('ProfileService', async (accounts) => {

    let service: ProfileService = new ProfileService(ipfs)
    

    //@ts-ignore
    before("", async () => {

        const orbitdb = await OrbitDB.createInstance(ipfs, "./orbitdb")
        let store = await orbitdb.docstore("test-profile")

        service = new ProfileService(store)
    })



    //@ts-ignore
    it("Test put & get", async () => {

        //Arrange
        let profile: Profile = {
            name: "Pat",
            aboutMe: "Blah",
            _id: accounts[0]
        }

        //Act
        await service.put(profile)
        
        //Assert
        let fetched: Profile = await service.read(accounts[0])    

        assert.equal(fetched.name, "Pat")
        assert.equal(fetched.aboutMe, "Blah")
        assert.equal(fetched._id, profile._id)
    })

    //@ts-ignore
    it("Test update", async () => {

        //Arrange
        let profile: Profile = {
            name: "Pat",
            aboutMe: "Blah",
            _id: accounts[1]
        }

        await service.put(profile)
        

        //Act
        await service.put({
            _id: profile._id,
            name: "New name",
            aboutMe: "new about me"
        })

        //Assert 
        let fetched: Profile = await service.read(accounts[1])


        assert.equal(fetched.aboutMe, "new about me")
        assert.equal(fetched.name, "New name")
        assert.equal(fetched._id, profile._id)
    })



    //@ts-ignore
    it("Test delete", async () => {

        //Arrange
        let profile: Profile = {
            name: "Update",
            aboutMe: "Again",
            _id: accounts[2]
        }

        await service.put(profile)
        
        //Act
        await service.delete(profile._id)

        
        //Assert 
        let fetched: Profile = await service.read(accounts[2])


        assert.equal(fetched, undefined)
    })






})


