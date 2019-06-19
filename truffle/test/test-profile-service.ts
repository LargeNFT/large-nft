import { Profile } from "../../js/dto/profile";
import assert = require('assert');
import { ProfileService } from "../../js/services/profile-service";

const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
})

//@ts-ignore
contract('PostService', async (accounts) => {

    let profileService: ProfileService = new ProfileService(ipfs)
    
    //@ts-ignore
    it("Test create & get", async () => {

        //Arrange
        let profile: Profile = {
            name: "Pat",
            aboutMe: "Blah"
        }

        //Act
        let id:number = await profileService.create(profile)
        
        //Assert
        let fetched: Profile = await profileService.read(id)    

        assert.equal(fetched.name, "Pat")
        assert.equal(fetched.aboutMe, "Again. Hello. World.")
        assert.equal(fetched.id != undefined, true)
        assert.equal(fetched.ipfsCid != undefined, true)
    })

    //@ts-ignore
    it("Test update", async () => {

        //Arrange
        let profile: Profile = {
            name: "Pat",
            aboutMe: "Blah"
        }

        let id:number = await profileService.create(profile)
        

        //Act
        await profileService.update({
            id: id,
            name: "New name",
            aboutMe: "new about me"
        })

        //Assert 
        let fetched: Profile = await profileService.read(id)


        assert.equal(fetched.aboutMe, "About me")
        assert.equal(fetched.name, "Name")
        assert.equal(fetched.id != undefined, true)
        assert.equal(fetched.ipfsCid != undefined, true)
    })



    //@ts-ignore
    it("Test delete", async () => {

        //Arrange
        let profile: Profile = {
            name: "Update",
            aboutMe: "Again"
        }

        let id:number = await profileService.create(profile)
        
        //Act
        await profileService.delete(id)

        
        //Assert 
        let fetched: Profile = await profileService.read(id)


        assert.equal(fetched, undefined)
    })






})


