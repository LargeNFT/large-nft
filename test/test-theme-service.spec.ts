import { getContainer } from "./inversify.config.js"

import assert from 'assert'

import { ThemeService } from "../src/admin/service/theme-service.js"
import { Theme } from "../src/admin/dto/theme.js"

import { SchemaService } from "../src/admin/service/core/schema-service.js"


let id1

describe('ThemeService', async () => {

    let service: ThemeService
    let schemaService:SchemaService

    before("", async () => {

        let container = await getContainer()
        
        service = container.get(ThemeService)
        schemaService = container.get(SchemaService)

        await schemaService.load()
        await schemaService.loadChannel("xyz")

       
    })

    after("After", async () => {
    })

    it("should fail to create invalid theme", async () => {
        
        try {
            await service.put(new Theme())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 2)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                name: "Bob",
                coverImageCSS: "Really is bob",
                animationCSS: "https://bobshouse.com"
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })


    it("should create & get a theme", async () => {

        //Arrange
        let theme:Theme = Object.assign(new Theme(), {
            name: "Bob",
            channelId: "xyz",
            coverImageCSS: "Really is bob",
            animationCSS: "https://bobshouse.com"
        })

        //Act
        await service.put(theme)

        id1 = theme._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.name, "Bob")
        assert.equal(fetched._id, id1)

    })

    it("should update a theme", async () => {

        //Arrange
        let theme:Theme = await service.get(id1)
        theme.name = "Updated name"

        //Act
        await service.put(theme)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.name, "Updated name")
        assert.equal(fetched._id, id1)

    })


    it("should listByChannel", async () => {

        //Arrange
        let theme1:Theme = Object.assign(new Theme(), {
            name: "Bob",
            channelId: "xyz",
            coverImageCSS: "Really is bob",
            animationCSS: "https://bobshouse.com"
        })

        let theme2:Theme = Object.assign(new Theme(), {
            name: "Bob",
            channelId: "xyz",
            coverImageCSS: "Really is bob",
            animationCSS: "https://bobshouse.com"
        })

        let theme3:Theme = Object.assign(new Theme(), {
            name: "Bob",
            channelId: "yyy",
            coverImageCSS: "Really is bob",
            animationCSS: "https://bobshouse.com"
        })

        //Act
        await service.put(theme1)
        await service.put(theme2)
        await service.put(theme3)


        //Read via permalinkKey
        let list = await service.listByChannel("xyz", 10, 0)

        assert.equal(list.length, 3)

    })

    it("should delete a theme", async () => {

        //Arrange
        let theme:Theme = await service.get(id1)

        //Act
        await service.delete(theme)

        //Assert
        let fetched
        try {
            fetched = await service.get(id1)
            assert.fail('Did not fail')
        } catch(ex) {}
        

        assert.equal(fetched, undefined)

    })

})


