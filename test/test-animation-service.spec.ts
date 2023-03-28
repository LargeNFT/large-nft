import { getContainer } from "./inversify.config.js"

import assert from 'assert'

import { Animation } from "../src/admin/dto/animation.js"
import { AnimationService } from "../src/admin/service/animation-service.js"

import { IpfsService } from "../src/admin/service/core/ipfs-service.js"
import { SchemaService } from "../src/admin/service/core/schema-service.js"



describe('AnimationService', async () => {

    let service
    let ipfsService
    let schemaService


    before("", async () => {

        let container = await getContainer()
        
        service = container.get(AnimationService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.load()


    })

    after("After", async () => {
    })

    it("should fail to create invalid animation", async () => {
        
        try {
            await service.put(new Animation())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                cid: "xyz",
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })


    // it("should create & get an image", async () => {

    //     //Arrange

    //     //Upload pretend image data
    //     let result = await ipfsService.ipfs.add({
    //         content: "pretend that this is image data1111111"
    //     })

    //     let image:Image = await service.newFromCid(result.cid.toString())

    //     //Act
    //     await service.put(image)
        
    //     id1 = image._id

    //     //Assert
    //     let fetched = await service.get(id1)

    //     assert.notEqual(fetched.blob, undefined)
    //     assert.equal(fetched.cid, "QmdrWMNVuy8nMCSkhauoaZ4bP4Sy5zxzFDWBn8L6DeeLgF")
    //     assert.equal(fetched._id, id1)

    // })


})

