//@ts-nocheck
import { getContainer, cleanup } from "./inversify.config"

import assert from 'assert'
import fs from 'fs'

import { PDFService } from "../src/admin/service/core/pdf-service"

import { IpfsService } from "../src/admin/service/core/ipfs-service"
import { SchemaService } from "../src/admin/service/core/schema-service"


let user0
let user1
let user2
let user3
let user4


contract('PDFService', async (accounts) => {

    let service: PDFService
    let ipfsService: IpfsService
    let schemaService:SchemaService


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

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
        const data = new Uint8Array(fs.readFileSync('./util/alice.pdf'))


        // const arrayBuffer = Uint8Array.from(window.atob(pdfBase64), c => c.charCodeAt(0))
        // const file = new File([arrayBuffer], "dummy.pdf", {type: 'application/pdf'})

        //Act
        let pdf = await service.getDocument(data)

        console.log(pdf)


    })


})

