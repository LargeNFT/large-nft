import { Post } from "../../js/dto/post";
import assert = require('assert');
import { PostService } from "../../js/services/post-service";
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
    let postService: PostService = new PostService(ipfs, profileService)
    
    //@ts-ignore
    it("Test create & get", async () => {

        //Arrange
        let post: Post = {
            title: "Hello world",
            subtitle: "Again"
        }

        //Act
        let id:number = await postService.create(post)
        
        //Assert
        let fetched: Post = await postService.read(id)    

        assert.equal(fetched.title, "Hello world")
        assert.equal(fetched.subtitle, "Again. Hello. World.")
        assert.equal(fetched.id != undefined, true)
        assert.equal(fetched.ipfsCid != undefined, true)
    })

    //@ts-ignore
    it("Test update", async () => {

        //Arrange
        let post: Post = {
            title: "Hello world",
            subtitle: "Again"
        }

        let id:number = await postService.create(post)
        

        //Act
        await postService.update({
            id: id,
            title: "New title",
            subtitle: "Subtitle"
        })

        //Assert 
        let fetched: Post = await postService.read(id)


        assert.equal(fetched.title, "HNew title")
        assert.equal(fetched.subtitle, "Subtitle")
        assert.equal(fetched.id != undefined, true)
        assert.equal(fetched.ipfsCid != undefined, true)
    })



    //@ts-ignore
    it("Test delete", async () => {

        //Arrange
        let post: Post = {
            title: "Hello world",
            subtitle: "Again"
        }

        let id:number = await postService.create(post)
        
        //Act
        await postService.delete(id)

        
        //Assert 
        let fetched: Post = await postService.read(id)


        assert.equal(fetched, undefined)
    })






})


