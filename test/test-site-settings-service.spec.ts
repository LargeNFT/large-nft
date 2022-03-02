//@ts-nocheck
import { getContainer } from "./inversify.config"


import assert from 'assert'

import { SchemaService } from "../src/service/core/schema-service";
import { OrbitService } from "../src/service/core/orbit-service";

import { SiteSettingsService } from '../src/service/core/site-settings-service';

import { SiteSettings } from '../src/dto/site-settings';



const Whitepages = artifacts.require("Whitepages")

let user0
let user1
let user2
let user3
let user4
let user5
let user6


contract('SiteSettings', async (accounts) => {

    let service: SiteSettingsService

    let orbitService:OrbitService
    let schemaService:SchemaService

    let mainStore

    before("before", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
        user5 = accounts[5]
        user6 = accounts[6]

        let container = await getContainer()
        
        service = container.get(SiteSettingsService)
        schemaService = container.get(SchemaService)
        orbitService = container.get(OrbitService)


        mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user6.toString()), user6.toString())
        await mainStore.load()

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user6.toString()), mainStore, user6)
        await service.loadStoreForWallet(user6)

    
    })
    
    after("After", async () => {
        // await ipfs.stop()
    })


    it("should create & get", async () => {

        //Arrange
        let settings: SiteSettings = {
            publicEmailAddress: "bob@gmail.com",
            tagline: "The best site in the world",
            timezone: "UTC",
            title: "The site title go!"
        }

        //Act
        await service.put(user6.toString(), settings)

        //Assert
        let fetchedSettings: SiteSettings = await service.get(user6.toString())

        assert.equal(fetchedSettings.publicEmailAddress, "bob@gmail.com")
        assert.equal(fetchedSettings.tagline, "The best site in the world")
        assert.equal(fetchedSettings.timezone, "UTC")
        assert.equal(fetchedSettings.title, "The site title go!")
        
    })


})
