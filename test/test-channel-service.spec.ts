//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'

import { ChannelService } from "../src/service/channel-service"
import { ItemService } from "../src/service/item-service"

import { Channel } from "../src/dto/channel"
import { Item } from "../src/dto/item"

import { ImageService } from "../src/service/image-service"
import { IpfsService } from "../src/service/core/ipfs-service"

import { SchemaService } from "../src/service/core/schema-service"


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


        await schemaService.loadWallet(user0)


    })

    after("After", async () => {
    })

    it("should fail to create invalid channel", async () => {
        
        try {
            await service.put(new Channel())
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.strictEqual(ex.errors.length, 3)
        }

    })


    it("should fail to create valid object if it's not the right class", async () => {
        
        try {
            await service.put({
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


    it("should get an empty list of channels", async () => {
        let channels:Channel[] = await service.list(10)
        assert.strictEqual(channels.length, 0 )
    })




    it("should create & get", async () => {

        //Arrange
        let channel:Channel = Object.assign(new Channel(), {
            title: "The Sound of Music",
            link: "google.com",
            description: "Singing in the mountains",
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
        assert.equal(fetched.feeRecipient, user0)


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
            description: "A boat that is not good at boating",
            authorId: 3,
            category: ['Sunk']
        }))


        await service.put(Object.assign(new Channel(), {
            title: "Batman",
            link: "pontoon.com",
            description: "Another boat and a man in a bat suit",
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
        // const sleep = ms => new Promise(r => setTimeout(r, ms));

        for (var i = 0; i < 100; i++) {

            await service.put(Object.assign(new Channel(), {
                title: (i).toString() + " it has to be longer ",
                link: "alexa.com",
                description: "A boat that is not good at boating",
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

    it("should export NFT metadata for a channel to IPFS", async () => {

        //Arrange
        //Add author
        let author:Author = Object.assign(new Author(), {
            name: "Bob",
            walletAddress: user0
        })

        await authorService.put(author)



        editor = new Quill("#editor")
        editor.setText("Singing in the mountains")

        let image1 = await ipfsService.ipfs.add({
            content: "pretend that this is image data"
        })

        let image2 = await ipfsService.ipfs.add({
            content: "pretend that this is image data2"
        })
        

        await imageService.put(await imageService.newFromCid(image1.cid.toString()))
        await imageService.put(await imageService.newFromCid(image2.cid.toString()))

        //Create category with attributes
        let channel:Channel = Object.assign(new Channel(), {
            title: "The Sound of Music",
            link: "google.com",
            description: "Singing in the mountains",
            content: editor.getContents(),
            authorId: author._id,
            category: ['Gazebos'],
            attributeOptions:[
                {
                    traitType:'Hair',
                    values:['Straight', 'Curly', 'Long']
                },
                {
                    traitType:'Teeth',
                    values:['Have them', 'None', 'Nice']
                },
            ],
            coverImageId: image1.cid.toString()
        }) 

        await service.put(channel)
 

        //Add items with those attributes
        let item1:Item = Object.assign(new Item(), {
            channelId: channel._id,
            title: "An image!",
            link: "pontoon.com",
            content: editor.getContents(),
            description: "Another boat and a man in a bat suit",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            attributeSelections: [{
                traitType: "Hair",
                value: "Curly"
            },
            {
                traitType: "Teeth",
                value: "Nice"
            }],
            coverImageId: image2.cid.toString()

        })

        let item2:Item = Object.assign(new Item(), {
            channelId: channel._id,
            title: "2An image!",
            link: "2pontoon.com",
            description: "2Another boat and a man in a bat suit",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            attributeSelections: [{
                traitType: "Hair",
                value: "Curly"
            },
            {
                traitType: "Teeth",
                value: "None"
            }]
        })

        let item3:Item = Object.assign(new Item(), {
            channelId: channel._id,
            title: "2An image!",
            link: "2pontoon.com",
            description: "2Another boat and a man in a bat suit",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            attributeSelections: [{
                traitType: "Hair",
                value: "Straight"
            },
            {
                traitType: "Teeth",
                value: "Have them"
            }]
        })

        //Save all these
        await itemService.put(item1)
        await sleep(100) //just need different timestamp
        await itemService.put(item2)
        await sleep(100) //just need different timestamp
        await itemService.put(item3)

        //And the channel
        await service.put(channel)

        //Now export metadata to IPFS
        let cid:string = await service.exportNFTMetadata(channel)
        



        //Assert

        //Copy to tmp directory so we're not just reading the underlying folder directly.
        await ipfsService.ipfs.files.cp(`/ipfs/${cid}`, "/tmp/" )

        // for await (const file of ipfsService.ipfs.files.ls("/tmp/")) {
        //     console.log(file.name)
        // }
        
        // console.log('Listing images')
        // for await (const file of ipfsService.ipfs.files.ls("/tmp/images")) {
        //     console.log(file.name)
        // }

        // console.log('Listing animations')
        // for await (const file of ipfsService.ipfs.files.ls("/tmp/animations")) {
        //     console.log(file.name)
        // }

        let backup = await getFileContent(`/tmp/backup.json`)
        // console.log(backup)

        assert.strictEqual(backup.channels.length, 1)
        assert.strictEqual(backup.items.length, 3)
        assert.strictEqual(backup.authors.length, 1)


        let contractMetadata:ContractMetadata = await getFileContent(`/tmp/contractMetadata.json`)
        
        let item1File:Item = await getFileContent(`/tmp/1.json`)
        let item2File:Item = await getFileContent(`/tmp/2.json`)
        let item3File:Item = await getFileContent(`/tmp/3.json`)

        assert.strictEqual(contractMetadata.name, "The Sound of Music")
        assert.strictEqual(contractMetadata.description, 'Singing in the mountains')
        assert.strictEqual(contractMetadata.external_link, 'google.com')
        assert.strictEqual(contractMetadata.image, 'ipfs://QmRhTS79kzt4rP72T6zaMBPWpJs1cwZmvpex5918QD3VKr')

        assert.strictEqual(item1File.tokenId, '1')
        assert.strictEqual(item1File.name, 'An image!')
        assert.strictEqual(item1File.description, 'Another boat and a man in a bat suit')
        assert.strictEqual(item1File.animation_url, 'ipfs://QmYuYBgM7257tYayRRhT4BDJaqG4JBPrtHsxvT9EwuQm86')
        assert.strictEqual(item1File.image, 'ipfs://QmX5VLosmfG3mitW5hyaGCWpg1AN6TbjW5Z3dtJPQmvEnq')
        assert.deepEqual(item1File.attributes, [
            { traitType: "Hair", value: "Curly" },
            { traitType: "Teeth", value: "Nice" }
        ])

        assert.strictEqual(item2File.tokenId, '2')
        assert.strictEqual(item3File.tokenId, '3')


    })

    // it("should should get the JSON Feed for a channel", async () => {

    // })

    // it("should should get the RSS Feed for a channel", async () => {

    // })

    it("should publish a channel", async () => {

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
