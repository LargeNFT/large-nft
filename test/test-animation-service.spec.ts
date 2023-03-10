import { getContainer, cleanup } from "./inversify.config"

import assert from 'assert'

import { Animation } from "../src/dto/animation.js"
import { AnimationService } from "../src/service/animation-service.js"

import { IpfsService } from "../src/service/core/ipfs-service.js"
import { SchemaService } from "../src/service/core/schema-service.js"



let user0
let user1
let user2
let user3
let user4


let id1

//@ts-ignore
contract('AnimationService', async (accounts) => {

    let service: AnimationService
    let ipfsService: IpfsService
    let schemaService:SchemaService


    before("", async () => {
        console.log(3)

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(AnimationService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        console.log(4)

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

