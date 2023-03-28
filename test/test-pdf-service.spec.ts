import { getContainer } from "./inversify.config.js"

import assert from 'assert'
import fs from 'fs'

import { PDFService } from "../src/admin/service/core/pdf-service.js"

import { IpfsService } from "../src/admin/service/core/ipfs-service.js"
import { SchemaService } from "../src/admin/service/core/schema-service.js"



describe('PDFService', async () => {

    let service: PDFService
    let ipfsService: IpfsService
    let schemaService:SchemaService


    before("", async () => {

        let container = await getContainer()
        
        service = container.get(PDFService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)


        await schemaService.load()


    })

    after("After", async () => {
    })


    it("should get a PDF from a valid file", async () => {

        //Arrange
        const data = new Uint8Array(fs.readFileSync('./test/util/alice.pdf'))


        // const arrayBuffer = Uint8Array.from(window.atob(pdfBase64), c => c.charCodeAt(0))
        // const file = new File([arrayBuffer], "dummy.pdf", {type: 'application/pdf'})

        //Act
        // let pdf = await service.getDocument(data)

        // console.log(pdf)


    })


})

