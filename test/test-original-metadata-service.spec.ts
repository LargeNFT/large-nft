import { getContainer } from "./inversify.config.js"

import assert from 'assert'

import { OriginalMetadataService } from "../src/admin/service/original-metadata-service.js"

import { IpfsService } from "../src/admin/service/core/ipfs-service.js"
import { SchemaService } from "../src/admin/service/core/schema-service.js"
import { OriginalMetadata } from "../src/admin/dto/original-metadata.js"



describe('OriginalMetadataService', async () => {

    let service
    let ipfsService
    let schemaService


    before("", async () => {

        let container = await getContainer()
        
        service = container.get(OriginalMetadataService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.loadChannel("xyz")


    })

    after("After", async () => {
    })

    it("should fail to create invalid original metadata", async () => {
        
        try {
            await service.put(new OriginalMetadata())
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


    it("should create & get an original metadata", async () => {

        //Arrange

        let originalMetadata:OriginalMetadata = await service.newFromText("xyz")

        //Act
        await service.put(originalMetadata)
        
        //Assert
        let fetched = await service.get(originalMetadata._id)

        assert.equal(fetched.cid, "QmdBCSn4UJP82MjhRVwpABww48tXL3PeXiofWyJpJmmA6z")
        assert.equal(fetched._id, "QmdBCSn4UJP82MjhRVwpABww48tXL3PeXiofWyJpJmmA6z")

    })


})

