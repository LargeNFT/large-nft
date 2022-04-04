//@ts-nocheck
require("dotenv").config();

import { getContainer } from "./inversify.config"

import assert from 'assert'

import { PinningApi } from "../src/dto/pinning-api"

import { IpfsService } from "../src/service/core/ipfs-service"
import { PinningService } from "../src/service/core/pinning-service"
import { SchemaService } from "../src/service/core/schema-service"



let user0
let user1
let user2
let user3
let user4


let id1
let id2
let id3

let apiKey = process.env.PINATA_API_KEY
let secretApiKey = process.env.PINATA_SECRET_API_KEY


contract('PinningService', async (accounts) => {

    let service: PinningService
    let ipfsService:IpfsService
    let schemaService:SchemaService


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(PinningService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.loadWallet(user0)

    })

    after("After", async () => {
    })

    it("should fail to create invalid pinning api", async () => {
        
        try {
            await service.put(new PinningApi())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 3)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                apiKey: apiKey,
                secretApiKey: secretApiKey,
                url: "https://api.pinata.cloud"
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })

    it("should create & get a pinning API", async () => {

        //Arrange
        let pinningApi:PinningApi = Object.assign(new PinningApi(), {
            apiKey: apiKey + "filler",
            secretApiKey: secretApiKey,
            url: "https://api.pinata.cloud"
        })

        //Act
        await service.put(pinningApi)

        id1 = pinningApi._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.apiKey, apiKey + "filler")
        assert.equal(fetched.secretApiKey, secretApiKey)
        assert.equal(fetched.url, "https://api.pinata.cloud")

        assert.equal(fetched._id, id1)

    })

    it("should update a pinning API", async () => {

        //Arrange
        let pinningApi:PinningApi = await service.get(id1)
        pinningApi.apiKey = apiKey

        //Act
        await service.put(pinningApi)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.apiKey, apiKey)
        assert.equal(fetched.secretApiKey, secretApiKey)
        assert.equal(fetched.url, "https://api.pinata.cloud")

        assert.equal(fetched._id, id1)


    })

    
    it("should validate account", async () => {

        //Arrange
        let pinningApi:PinningApi = await service.get(id1)

        await service.validateAccount(pinningApi)

        //Just make sure we got here
        assert.notEqual(pinningApi, undefined)

        //Change credentials and catch exception
        try {
            pinningApi.secretApiKey = "blah"
            await service.validateAccount(pinningApi)
            assert.fail('Did not throw error')
        } catch(ex) {
            assert.strictEqual(ex.response.status, 401)
        }



    })
    

    it("should pin by hash", async () => {

        let file1 = await ipfsService.ipfs.add({
            content: "pretend that this is sweet file data"
        })

        //Arrange
        let pinningApi:PinningApi = await service.get(id1)

        //Act
        let result = await service.pinByHash(pinningApi, file1.cid.toString(), "Sweet title")
        assert.equal(result.ipfsHash, 'QmXf5U9ZjZ5H8qvGKeSv2N3tU2nn21V1jmRPhAppkN2Wvt')

    })


})