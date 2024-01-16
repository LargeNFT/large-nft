import { getContainer } from "./inversify.config.js"

import assert from 'assert'

import { CarService } from "../src/admin/service/car-service.js"

import { IpfsService } from "../src/admin/service/core/ipfs-service.js"
import { SchemaService } from "../src/admin/service/core/schema-service.js"
import { Car } from "../src/admin/dto/car.js"

import fs from "fs"

describe('CarService', async () => {

    let service
    let ipfsService
    let schemaService


    before("", async () => {

        let container = await getContainer()
        
        service = container.get(CarService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.loadChannel("xyz")


    })

    after("After", async () => {
    })

    it("should fail to create invalid car", async () => {
        
        try {
            await service.put(new Car())
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


    it("should create & get a car", async () => {

        let testCar = fs.readFileSync("./test/util/test-car.car")

        //Arrange
        let car:Car = Object.assign(new Car(), {
            _id: "ipfs",
            cid: "QmVAmiXoiiMHqxBWwFNSYy3xULijPsmJEEC5ERmb2BoZGW",
            content: testCar
        })

        //Act
        await service.put(car)


        //Assert
        let fetched = await service.get("ipfs")

        assert.equal(fetched.cid, "QmVAmiXoiiMHqxBWwFNSYy3xULijPsmJEEC5ERmb2BoZGW")
        assert.equal(fetched._id, "ipfs")
        assert.equal(fetched.content.data.length, 3422596)

    })


})

