//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'

import { ItemService } from "../src/service/item-service"
import { Item } from "../src/dto/item"
import { ChannelService } from "../src/service/channel-service"

const Whitepages = artifacts.require("Whitepages")

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

    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()
        
        service = container.get(ItemService)
        channelService = container.get(ChannelService)

        await service.load(user0)

        //Create a couple of test channels



    })

    after("After", async () => {
    })

    it("should fail to create invalid item", async () => {
        
        try {
            await service.put(new Item())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 5)
        }

    })

    it("should get an empty list of items", async () => {
        let items:Item[] = await service.listByChannel(10)
        assert.strictEqual(items.length, 0 )
    })

    it("should create & get", async () => {

        //Arrange
        let item:Item = {
            title: "The Sound of Music",
            link: "google.com",
            description: "Singing in the mountains",
            author: {},
            category: ['Gazebos']
        }

        //Act
        await service.put(channel)

        
        id1 = channel._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.title, "The Sound of Music")
        assert.equal(fetched.link, "google.com")
        assert.equal(fetched._id, id1)

    })

    it("should update a post", async () => {

        //Arrange
        let channel:Channel = await service.get(id1)
        channel.title = "Updated title"

        //Act
        await service.put(channel)

        //Assert
        let fetched = await service.get(id1)

        assert.equal(fetched.title, "Updated title")
        assert.equal(fetched.link, "google.com")
        assert.equal(fetched._id, id1)


    })

    it("should read posts back in order", async () => {

        //Arrange - Add a few more channels
        await service.put({
            title: "Titanic",
            link: "alexa.com",
            description: "A boat that is not good at boating",
            author: {},
            category: ['Sunk']
        })

        await service.put({
            title: "Batman",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
            author: {},
            category: ['Not Sunk']
        })



        let channels:Channel[] = await service.list(10, 0)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "Batman")
        assert.equal(channels[1].title, "Titanic")
        assert.equal(channels[2].title, "Updated title")

        //Set these for the next test
        id2 = channels[1]._id
        id3 = channels[0]._id

    })


    it("should update those posts and still read them back in order", async () => {

        //Arrange
        let channel1: Channel = await service.get(id1)
        channel1.description = "Wow1"

        let channel2: Channel = await service.get(id2)
        channel2.description = "Wow2"

        let channel3: Channel = await service.get(id3)
        channel3.description = "Wow3"

        //Act
        await service.put(channel1)
        await service.put(channel2)
        await service.put(channel3)

        //Act
        let channels:Channel[] = await service.list(10, 0)

        //assert
        assert.equal(channels.length, 3)
        assert.equal(channels[0].description, "Wow3")
        assert.equal(channels[1].description, "Wow2")
        assert.equal(channels[2].description, "Wow1")


    })


    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        const sleep = ms => new Promise(r => setTimeout(r, ms));

        for (var i = 0; i < 100; i++) {
            await service.put({
                title: (i).toString(),
                link: "alexa.com",
                description: "A boat that is not good at boating",
                author: {},
                category: ['Sunk']
            })
            await sleep(50) //just need different timestamp
        }

        //Get a page of 3
        let channels:Channel[] = await service.list(3, 0)

        //assert
        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "99")
        assert.equal(channels[1].title, "98")
        assert.equal(channels[2].title, "97")

        channels = await service.list(3, 3)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "96")
        assert.equal(channels[1].title, "95")
        assert.equal(channels[2].title, "94")

        channels = await service.list(3, 6)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "93")
        assert.equal(channels[1].title, "92")
        assert.equal(channels[2].title, "91")

    })

    it("should remove attributes from items when category is removed from the channel", async () => {

    })

    it("should export NFT metadata for a channel to IPFS", async () => {

    })

    it("should should get the JSON Feed for a channel", async () => {

    })

    it("should should get the RSS Feed for a channel", async () => {

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
