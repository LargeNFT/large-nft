import { Profile } from "../../js/dto/profile";
import assert = require('assert');
import { ProfileService } from "../../js/services/profile-service";
import { IdentityService } from "../../js/services/util/identity-service";

const OrbitDB = require('orbit-db')


const Keystore = require('orbit-db-keystore')
const path = require('path')
const keypath = path.resolve('./keys')



const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
  })


//@ts-ignore
contract('ProfileService', async (accounts) => {

    let service: ProfileService = new ProfileService(ipfs)
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

        let ac = identityService.getAccessController(orbitdb)

        let store = await orbitdb.docstore("test-profile", {
            accessController: ac
        })

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


