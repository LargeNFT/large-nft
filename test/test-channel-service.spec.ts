//@ts-nocheck
require("dotenv").config();

import { getContainer, cleanup } from "./inversify.config"

import assert from 'assert'

import { ChannelService } from "../src/admin/service/channel-service"
import { ItemService } from "../src/admin/service/item-service"

import { Channel } from "../src/admin/dto/channel"
import { Item } from "../src/admin/dto/item"

import { ImageService } from "../src/admin/service/image-service"
import { IpfsService } from "../src/admin/service/core/ipfs-service"

import { SchemaService } from "../src/admin/service/core/schema-service"
import { PinningService } from "../src/admin/service/core/pinning-service"


const toBuffer = require('it-to-buffer')


//Need a simulated quill js
initEditor()
import Quill from "quill"
import { AuthorService } from "../src/service/author-service"
import { Author } from "../src/dto/author"

let editor


let user0
let user1
let user2
let user3
let user4


let id1
let id2
let id3

let service: ChannelService
let itemService:ItemService
let imageService:ImageService
let authorService:AuthorService
let ipfsService:IpfsService
let schemaService:SchemaService
let pinningService:PinningService

let apiKey = process.env.PINATA_API_KEY
let secretApiKey = process.env.PINATA_SECRET_API_KEY

contract('ChannelService', async (accounts) => {


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
        
        let container = await getContainer()
        

        service = container.get(ChannelService)
        itemService = container.get(ItemService)
        authorService = container.get(AuthorService)
        imageService = container.get(ImageService)
        ipfsService = container.get(IpfsService)
        schemaService = container.get(SchemaService)
        pinningService = container.get(PinningService)

        await schemaService.load()


    })

    after("After", async () => {
    })

    it("should fail to create invalid channel", async () => {
        
        try {
            await service.put(new Channel())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 2)
        }

    })

    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
                title: "The Sound of Music",
                link: "google.com",
                symbol: "SOM",
                mintPrice: web3.utils.toWei( "0.08" , 'ether'),
                authorId: 3,
                category: ['Gazebos']
            })
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 1)
        }

    })

    it("should get an empty list of channels", async () => {
        let channels:Channel[] = await service.list(10)
        assert.strictEqual(channels.length, 0 )
    })

    it("should create & get", async () => {

        //Arrange
        let channel:Channel = Object.assign(new Channel(), {
            title: "The Sound of Music",
            link: "google.com",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            authorId: 3,
            category: ['Gazebos'],
            sellerFeeBasisPoints: 100,
            feeRecipient: user0
        }) 

        //Act
        await service.put(channel)

        id1 = channel._id

        //Read via permalinkKey
        let fetched = await service.get(id1)

        assert.equal(fetched.title, "The Sound of Music")
        assert.equal(fetched.link, "google.com")
        assert.equal(fetched._id, id1)
        assert.equal(fetched.sellerFeeBasisPoints, 100)
        
    })

    it("should update a channel", async () => {

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

    it("should read channels back in order", async () => {

        //Arrange - Add a few more channels
        await service.put(Object.assign(new Channel(), {
            title: "Titanic",
            link: "alexa.com",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            authorId: 3,
            category: ['Sunk']
        }))


        await service.put(Object.assign(new Channel(), {
            title: "Batman",
            link: "pontoon.com",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            authorId: 3,
            category: ['Not Sunk']
        }))




        let channels:Channel[] = await service.list(10, 0)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "Batman")
        assert.equal(channels[1].title, "Titanic")
        assert.equal(channels[2].title, "Updated title")

        //Set these for the next test
        id2 = channels[1]._id
        id3 = channels[0]._id

    })

    it("should update those channels and still read them back in order", async () => {

        //Arrange
        let channel1: Channel = await service.get(id1)
        channel1.title = "Wow1"

        let channel2: Channel = await service.get(id2)
        channel2.title = "Wow2"

        let channel3: Channel = await service.get(id3)
        channel3.title = "Wow3"

        //Act
        await service.put(channel1)
        await service.put(channel2)
        await service.put(channel3)

        //Act
        let channels:Channel[] = await service.list(10, 0)

        //assert
        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "Wow3")
        assert.equal(channels[1].title, "Wow2")
        assert.equal(channels[2].title, "Wow1")


    })

    it("should delete a channel and all associated items", async () => {

        await schemaService.loadChannel(id1)

        let channel1: Channel = await service.get(id1)
        await service.delete(channel1)

        try {
            let channel1: Channel = await service.get(id1)
            assert.fail('Did not fail')
        } catch (ex) {
            assert.strictEqual(ex.status, 404)
        }

        let items:Item[] = await itemService.listByChannel(id1, 100, 0)
        assert.strictEqual(items.length, 0)

    })


    it("should get the last revision for a document even if it's deleted", async () => {

        let latestId1 = await service.getLatestRevision(id1)
        assert.strictEqual(latestId1._deleted, true )

    })

    it("should getLatestRevision of non-deleted records", async () => {

        let latestId2 = await service.get(id2)

        latestId2.title = "wow3"

        await service.put(latestId2)

        latestId2.title = "wow4"
        await service.put(latestId2)

        //Update a record a few times and get the latest
        let fetched  = await service.getLatestRevision(id2)
        assert.strictEqual(fetched.title, "wow4")

    })


    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        // const sleep = ms => new Promise(r => setTimeout(r, ms));

        for (var i = 0; i < 100; i++) {

            await service.put(Object.assign(new Channel(), {
                title: (i).toString() + " it has to be longer ",
                symbol: "SOM",
                mintPrice: web3.utils.toWei( "0.08" , 'ether'),
                link: "alexa.com",
                authorId: 3,
                category: ['Sunk']
            }))
    
            await sleep(50) //just need different timestamp
        }

        //Get a page of 3
        let channels:Channel[] = await service.list(3, 0)

        //assert
        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "99 it has to be longer ")
        assert.equal(channels[1].title, "98 it has to be longer ")
        assert.equal(channels[2].title, "97 it has to be longer ")

        channels = await service.list(3, 3)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "96 it has to be longer ")
        assert.equal(channels[1].title, "95 it has to be longer ")
        assert.equal(channels[2].title, "94 it has to be longer ")

        channels = await service.list(3, 6)

        assert.equal(channels.length, 3)
        assert.equal(channels[0].title, "93 it has to be longer ")
        assert.equal(channels[1].title, "92 it has to be longer ")
        assert.equal(channels[2].title, "91 it has to be longer ")

    })

})

async function getFileContent(filename) {
    let bufferedContents = await toBuffer(ipfsService.ipfs.files.read(filename))  // a buffer
    return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))
}



function initEditor() {

    const jsdom = require('jsdom')
    const { JSDOM } = jsdom;

    const dom = new JSDOM('<div id="editor"></div>')

    dom.window.document.getSelection = function() { return { getRangeAt: function() { } }; }
    dom.window.document.execCommand = function (command, showUI, value) { try { return document.execCommand(command, showUI, value); } catch(e) {} return false; }

    global.window = dom.window;
    global.document = dom.window.document;
    global.Node = dom.window.Node;
    global.navigator = global.window.navigator;
    global.Text = dom.window.Text;
    global.HTMLElement = window.HTMLElement;
    global.MutationObserver = dom.window.MutationObserver;


}


const sleep = ms => new Promise(r => setTimeout(r, ms));
