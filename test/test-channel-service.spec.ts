//@ts-nocheck
require("dotenv").config();

import { getContainer } from "./inversify.config"

import assert from 'assert'

import { ChannelService } from "../src/service/channel-service"
import { ItemService } from "../src/service/item-service"

import { Channel } from "../src/dto/channel"
import { Item } from "../src/dto/item"

import { ImageService } from "../src/service/image-service"
import { IpfsService } from "../src/service/core/ipfs-service"

import { SchemaService } from "../src/service/core/schema-service"
import { PinningService } from "../src/service/core/pinning-service"

const ChannelContract = artifacts.require("Channel")
const truffleAssert = require('truffle-assertions')

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

        await schemaService.loadWallet(user0)


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

    let channel:Channel
    let items:Item[]
    let cid:string

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

        let image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
        let image2 = await imageService.newFromBuffer(Buffer.from("image2!"))

        await imageService.put(image1)
        await imageService.put(image2)

        //Create category with attributes
        channel = Object.assign(new Channel(), {
            title: "The Sound of Music",
            symbol: "SOM",
            mintPrice: web3.utils.toWei( "0.08" , 'ether'),
            link: "google.com",
            authorId: author._id,
            category: ['Gazebos'],
            attributeOptions:[
                {
                    id: "6",
                    traitType:'Hair',
                    values:['Straight', 'Curly', 'Long']
                },
                {
                    id: "7",
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
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            content: editor.getContents(),
            attributeSelections: [{
                id: "6",
                traitType: "Hair",
                value: "Curly"
            },
            {
                id: "7",
                traitType: "Teeth",
                value: "Nice"
            }],
            coverImageId: image2.cid.toString()

        })

        let item2:Item = Object.assign(new Item(), {
            channelId: channel._id,
            title: "2An image!",
            link: "2pontoon.com",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            attributeSelections: [{
                id: "6",
                traitType: "Hair",
                value: "Curly"
            },
            {
                id: "7",
                traitType: "Teeth",
                value: "None"
            }]
        })

        let item3:Item = Object.assign(new Item(), {
            channelId: channel._id,
            title: "2An image!",
            link: "2pontoon.com",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            attributeSelections: [{
                id: "6",
                traitType: "Hair",
                value: "Straight"
            },
            {
                id: "7",
                traitType: "Teeth",
                value: "Have them"
            }]
        })

        //Save all these
        await itemService.put(item1)
        await itemService.put(item2)
        await itemService.put(item3)

        items = [item1, item2, item3]

        //And the channel
        await service.put(channel)
   
        //Now export metadata to IPFS
        cid = await service.exportNFTMetadata(channel,items, user0)


        //Assert

        //Copy to tmp directory so we're not just reading the underlying folder directly.
        await ipfsService.ipfs.files.cp(`/ipfs/${cid}`, "/tmp/" )


        let backup = await getFileContent(`/tmp/backup.json`)

        assert.strictEqual(backup.channels.length, 1)
        assert.strictEqual(backup.items.length, 3)
        assert.strictEqual(backup.authors.length, 1)


        let contractMetadata:ContractMetadata = await getFileContent(`/tmp/contractMetadata.json`)
        
        let item1File:Item = await getFileContent(`/tmp/1.json`)
        let item2File:Item = await getFileContent(`/tmp/2.json`)
        let item3File:Item = await getFileContent(`/tmp/3.json`)

        assert.strictEqual(contractMetadata.name, "The Sound of Music")
        assert.strictEqual(contractMetadata.external_link, 'google.com')
        assert.strictEqual(contractMetadata.image, 'ipfs://QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')

        assert.strictEqual(item1File.tokenId, '1')
        assert.strictEqual(item1File.name, 'An image!')
        assert.strictEqual(item1File.animation_url, 'ipfs://QmYuYBgM7257tYayRRhT4BDJaqG4JBPrtHsxvT9EwuQm86')
        assert.strictEqual(item1File.image, 'ipfs://QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd')
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

        //Arrange

        //Set up Pinata
        let contractAddress = await service.publish(channel, items, {
            apiKey: apiKey,
            secretApiKey: secretApiKey,
            url: "https://api.pinata.cloud"
        }, cid)

        assert.notEqual(contractAddress, undefined)

        //Read from contract
        let c = await ChannelContract.at(contractAddress)

        //should fail to get tokenURI if token doesn't exist
        await truffleAssert.fails(
            c.tokenURI( 1, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "ERC721Metadata: URI query for nonexistent token"
        )

        //Mint a token and validate it
        await c.mint( 1, { from: user4, value: web3.utils.toWei('0.08', 'ether') })

        let owner = await c.ownerOf( 1, { from: user4 })
        let uri = await c.tokenURI( 1, { from: user4 })

        assert.strictEqual(owner, user4)
        assert.strictEqual(uri, `ipfs://${cid}/1.json`)

        //Get the metadata and make sure it's right
        let bufferedContents = await toBuffer(ipfsService.ipfs.cat(`${cid}/1.json`))
        
        let tokenMetadata = JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

        assert.strictEqual(tokenMetadata.tokenId, "1")
        assert.strictEqual(tokenMetadata.name, "An image!")


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
