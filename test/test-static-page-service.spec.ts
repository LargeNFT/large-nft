//@ts-nocheck
import { cleanup, getContainer } from "./inversify.config"

import assert from 'assert'

import { StaticPageService } from "../src/admin/service/static-page-service"
import { StaticPage } from "../src/admin/dto/static-page"

import { SchemaService } from "../src/admin/service/core/schema-service"


let user0
let user1
let user2
let user3
let user4


let id1
let id2
let id3

contract('StaticPageService', async (accounts) => {

    let service: StaticPageService
    let schemaService:SchemaService

    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(StaticPageService)
        schemaService = container.get(SchemaService)

        await schemaService.load()

        await schemaService.loadChannel("xyz")

       
    })

    after("After", async () => {
    })

    it("should fail to create invalid static page", async () => {
        
        try {
            await service.put(new StaticPage())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 3)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                name: "Bob",
                channelId: "xyz",
                slug: "really",
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })


    it("should create & get a static page", async () => {

        //Arrange
        let staticPage:StaticPage = Object.assign(new StaticPage(), {
            name: "Bob",
            channelId: "xyz",

        })

        //Act
        await service.put(staticPage)

        id1 = staticPage._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.name, "Bob")
        assert.equal(fetched._id, id1)

    })

    it("should update a static page", async () => {

        //Arrange
        let staticPage:StaticPage = await service.get(id1)
        staticPage.name = "Updated name"

        //Act
        await service.put(staticPage)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.name, "Updated name")
        assert.equal(fetched._id, id1)

    })


    it("should listByChannel", async () => {

        //Arrange
        let staticPage1:StaticPage = Object.assign(new StaticPage(), {
            name: "Bob2",
            channelId: "zyx",
        })

        let staticPage2:StaticPage = Object.assign(new StaticPage(), {
            name: "Bob3",
            channelId: "zyx",
        })

        let staticPage3:StaticPage = Object.assign(new StaticPage(), {
            name: "Bob4",
            channelId: "zyx",
        })

        //Act
        await service.put(staticPage1)
        await service.put(staticPage2)
        await service.put(staticPage3)


        //Read via permalinkKey
        let list = await service.listByChannel("zyx", 10, 0)

        assert.equal(list.length, 3)

    })

    it("should delete a static page", async () => {

        //Arrange
        let staticPage:StaticPage = await service.get(id1)

        //Act
        await service.delete(staticPage)

        //Assert
        let fetched
        try {
            fetched = await service.get(id1)
            assert.fail('Did not fail')
        } catch(ex) {}
        

        assert.equal(fetched, undefined)

    })

})


