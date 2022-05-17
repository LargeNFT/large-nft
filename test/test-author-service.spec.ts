//@ts-nocheck
import { cleanup, getContainer } from "./inversify.config"

import assert from 'assert'

import { AuthorService } from "../src/service/author-service"
import { Author } from "../src/dto/author"

import { SchemaService } from "../src/service/core/schema-service"


let user0
let user1
let user2
let user3
let user4


let id1
let id2
let id3

contract('AuthorService', async (accounts) => {

    let service: AuthorService
    let schemaService:SchemaService

    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(AuthorService)
        schemaService = container.get(SchemaService)

        await schemaService.loadWallet(user0)

       
    })

    after("After", async () => {
    })

    it("should fail to create invalid author", async () => {
        
        try {
            await service.put(new Author())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                walletAddress: user0,
                name: "Bob",
                description: "Really is bob",
                url: "https://bobshouse.com",
                coverPhotoId: 6
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })


    it("should create & get an author", async () => {

        //Arrange
        let author:Author = Object.assign(new Author(), {
            walletAddress: user0,
            name: "Bob",
            description: "Really is bob",
            url: "https://bobshouse.com",
            coverPhotoId: 6
        })

        //Act
        await service.put(author)

        id1 = author._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.walletAddress, user0)
        assert.equal(fetched.name, "Bob")
        assert.equal(fetched._id, id1)

    })

    it("should update an author", async () => {

        //Arrange
        let author:Author = await service.get(id1)
        author.name = "Updated name"

        //Act
        await service.put(author)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.name, "Updated name")
        assert.equal(fetched._id, id1)

    })


})


