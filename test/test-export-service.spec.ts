import { getContainer } from "./inversify.config.js"

import { ExportService } from "../src/admin/service/core/export-service.js"

import { IpfsService } from "../src/admin/service/core/ipfs-service.js"
import { SchemaService } from "../src/admin/service/core/schema-service.js"



describe('ExportService', async () => {

    let service
    let ipfsService
    let schemaService


    before("", async () => {

        let container = await getContainer()
        
        service = container.get(ExportService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.load()


    })

    after("After", async () => {
    })

    it("should export a valid RSS feeds for a Channel", async () => {


    })



})

