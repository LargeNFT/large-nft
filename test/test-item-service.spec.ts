//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'

import { ItemService } from "../src/service/item-service"
import { Item } from "../src/dto/item"

import { Channel } from "../src/dto/channel"
import { ChannelService } from "../src/service/channel-service"

import { ImageService } from "../src/service/image-service"
import { IpfsService } from "../src/service/core/ipfs-service"
import { SchemaService } from "../src/service/core/schema-service"


let user0
let user1
let user2
let user3
let user4


let id1
let id2
let id3

contract('ItemService', async (accounts) => {

    let service: ItemService
    let channelService:ChannelService
    let imageService:ImageService
    let ipfsService:IpfsService
    let schemaService:SchemaService

    let channel1:Channel
    let channel2:Channel

    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(ItemService)
        channelService = container.get(ChannelService)
        imageService = container.get(ImageService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)

        await schemaService.loadWallet(user0)

        //Create a couple of test channels
        channel1 = Object.assign(new Channel(), {
            title: "The Sound of Music",
            link: "google.com",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            authorId:3,
            category: ['Gazebos']
        })
        
        channel2 = Object.assign(new Channel(), {
            title: "Titanic",
            link: "alexa.com",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            authorId:3,
            category: ['Sunk']
        })
        
        await channelService.put(channel1)
        await channelService.put(channel2)

    })

    after("After", async () => {
    })

    it("should fail to create invalid item", async () => {
        
        try {
            await service.put(new Item())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 2)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                channel: channel1,
                title: "The Sound of Music",
                link: "google.com",
                description: "Singing in the mountains",
                authorId: 3,
                category: ['Gazebos']
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })



    it("should get an empty list of items", async () => {
        let items:Item[] = await service.listByChannel(channel1._id, 10, 0)
        assert.strictEqual(items.length, 0 )
    })

    it("should create & get an item", async () => {

        //Arrange
        let item:Item = Object.assign(new Item(), {
            channelId: channel1._id,
            title: "The Sound of Music",
            link: "google.com",
            description: "Singing in the mountains",
            authorId: 3,
            category: ['Gazebos']
        })

        //Act
        await service.put(item)

        id1 = item._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.title, "The Sound of Music")
        assert.equal(fetched.link, "google.com")
        assert.equal(fetched._id, id1)

    })

    it("should update an item", async () => {

        //Arrange
        let item:Item = await service.get(id1)
        item.title = "Updated title"

        //Act
        await service.put(item)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.title, "Updated title")
        assert.equal(fetched.link, "google.com")
        assert.equal(fetched._id, id1)


    })

    it("should read posts back in order", async () => {

        //Arrange - Add a few more channels
        await service.put(Object.assign(new Item(), {
            channelId: channel1._id,
            title: "Titanic",
            link: "google.com",
            description: "Singing in the mountains",
            authorId: 3,
            category: ['Gazebos']
        }))

        await service.put(Object.assign(new Item(), {
            channelId: channel1._id,
            title: "Batman",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
            authorId: 3,
            category: ['Gazebos', 'Ants']
        }))


        let items:Item[] = await service.listByChannel(channel1._id, 10, 0)

        assert.equal(items.length, 3)
        assert.equal(items[0].title, "Updated title")
        assert.equal(items[1].title, "Titanic")
        assert.equal(items[2].title, "Batman")

        //Set these for the next test
        id2 = items[1]._id
        id3 = items[2]._id

    })


    it("should update those items and still read them back in order", async () => {

        //Arrange
        let item1: Item = await service.get(id1)
        item1.description = "Wow1"

        let item2: Item = await service.get(id2)
        item2.description = "Wow2"

        let item3: Item = await service.get(id3)
        item3.description = "Wow3"

        //Act
        await service.put(item1)
        await service.put(item2)
        await service.put(item3)

        //Act
        let items:Item[] = await service.listByChannel(channel1._id, 10, 0)

        //assert
        assert.equal(items.length, 3)
        assert.equal(items[0].description, "Wow1")
        assert.equal(items[1].description, "Wow2")
        assert.equal(items[2].description, "Wow3")

    })

    it("should add items to a second channel and query both", async () => {

        //Arrange - Add a few more channels
        await service.put(Object.assign(new Item(), {
            channelId: channel2._id,
            title: "Titanic2",
            link: "google.com",
            description: "Singing in the mountains",
            authorId: 3,
            category: ['Gazebos']
        }))

        await service.put(Object.assign(new Item(), {
            channelId: channel2._id,
            title: "Batman2",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
            authorId: 3,
            category: ['Gazebos', 'Ants']
        }))

        await service.put(Object.assign(new Item(), {
            channelId: channel2._id,
            title: "Another one2",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
            authorId: 3,
            category: ['Gazebos', 'Ants']
        }))


        //Act
        let items1:Item[] = await service.listByChannel(channel1._id, 10, 0)

        assert.equal(items1.length, 3)
        assert.equal(items1[0].title, "Updated title")
        assert.equal(items1[1].title, "Titanic")
        assert.equal(items1[2].title, "Batman")


        let items2:Item[] = await service.listByChannel(channel2._id, 10, 0)

        assert.equal(items2.length, 3)
        assert.equal(items2[0].title, "Titanic2")
        assert.equal(items2[1].title, "Batman2")
        assert.equal(items2[2].title, "Another one2")



    })

    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        const sleep = ms => new Promise(r => setTimeout(r, ms));

        for (var i = 0; i < 100; i++) {
            
            await service.put(Object.assign(new Item(), {
                channelId: 17,
                title: (i).toString() + " has to be longer",
                link: "pontoon.com",
                description: "Another boat and a man in a bat suit",
                authorId: 3,
                category: ['Gazebos', 'Ants']
            }))
    
            await sleep(50) //just need different timestamp
        }

        //Get a page of 3
        let items:Item[] = await service.listByChannel(17, 3, 0)

        //assert
        assert.equal(items.length, 3)
        assert.equal(items[0].title, "0 has to be longer")
        assert.equal(items[1].title, "1 has to be longer")
        assert.equal(items[2].title, "2 has to be longer")

        items = await service.listByChannel(17, 3, 3)

        assert.equal(items.length, 3)
        assert.equal(items[0].title, "3 has to be longer")
        assert.equal(items[1].title, "4 has to be longer")
        assert.equal(items[2].title, "5 has to be longer")

        items = await service.listByChannel(17, 3, 6)

        assert.equal(items.length, 3)
        assert.equal(items[0].title, "6 has to be longer")
        assert.equal(items[1].title, "7 has to be longer")
        assert.equal(items[2].title, "8 has to be longer")

    })


    it("should export NFT metadata for an item", async () => {
        
        //Test with and without cover photo
        const metadata = await service.exportNFTMetadata(id1)

    })


    it("should add and export item with cover photo and attributes", async () => {

        //Arrange
        //Upload pretend image data
        let result = await ipfsService.ipfs.add({
            content: "pretend that this is image data4343243"
        })

        let image:Image = await imageService.newFromCid(result.cid.toString())
        await imageService.put(image)

        let item:Item = Object.assign(new Item(), {
            channelId: 18,
            title: "An image!",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
            authorId: 3,
            category: ['Gazebos', 'Ants'],
            coverImageId: image._id,
            attributeSelections: [{
                traitType: "Type",
                value: "Skelton"
            },
            {
                traitType: "Hair",
                value: "Fuzzy"
            }]
        })

        await service.put(item)


        const metadata = await service.exportNFTMetadata(item, undefined, image._id)

        assert.strictEqual(metadata.image, 'ipfs://QmZyhR8TGNhD3s2HrykyFr9NFS9wCs4X4M66uaKq78Sd3p')

        assert.strictEqual(metadata.attributes[0].traitType, "Type")
        assert.strictEqual(metadata.attributes[0].value, "Skelton")

        assert.strictEqual(metadata.attributes[1].traitType, "Hair")
        assert.strictEqual(metadata.attributes[1].value, "Fuzzy")

    })



})


// function initEditor() {

//     const jsdom = require('jsdom')
//     const { JSDOM } = jsdom;

//     const dom = new JSDOM('<div id="editor"></div>')

//     dom.window.document.getSelection = function() { return { getRangeAt: function() { } }; }
//     dom.window.document.execCommand = function (command, showUI, value) { try { return document.execCommand(command, showUI, value); } catch(e) {} return false; }

//     global.window = dom.window;
//     global.document = dom.window.document;
//     global.Node = dom.window.Node;
//     global.navigator = global.window.navigator;
//     global.Text = dom.window.Text;
//     global.HTMLElement = window.HTMLElement;
//     global.MutationObserver = dom.window.MutationObserver;


// }
