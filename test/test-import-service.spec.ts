//@ts-nocheck
require("dotenv").config();

import { getContainer, cleanup } from "./inversify.config"

import assert from 'assert'

import { ChannelService } from "../src/service/channel-service"
import { ImportService } from "../src/service/core/import-service"
import { AuthorService } from "../src/service/author-service"

import { Channel } from "../src/dto/channel"
import { Item } from "../src/dto/item"
import { Author } from "../src/dto/author"

import { ExportBundle } from "../src/dto/export-bundle"

import { IpfsService } from "../src/service/core/ipfs-service"

import { SchemaService } from "../src/service/core/schema-service"
import { ItemService } from "../src/service/item-service";
import { ImageService } from "../src/service/image-service";
import { AnimationService } from "../src/service/animation-service";
import { PublishService } from "../src/service/core/publish-service";

var MockAdapter = require("axios-mock-adapter")
import axios from "axios"

let user0
let user1
let user2
let user3
let user4


let service: ImportService

let ipfsService:IpfsService
let schemaService:SchemaService
let authorService:AuthorService
let itemService:ItemService
let channelService:ChannelService
let imageService:ImageService
let animationService:AnimationService
let publishService:PublishService


let channel:Channel
let items:Item[]
let author:Author
let cid:string

let exportBundle:ExportBundle

let image1, image2, item1, item2, item3, animation


contract('ImportService', async (accounts) => {


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
        
        let container = await getContainer()
        
        service = container.get(ImportService)
        schemaService = container.get(SchemaService)
        authorService = container.get(AuthorService)
        itemService = container.get(ItemService)
        channelService = container.get(ChannelService)
        imageService = container.get(ImageService)
        ipfsService = container.get(IpfsService)
        animationService = container.get(AnimationService)
        publishService = container.get(PublishService)

        await ipfsService.init()

        await schemaService.loadWallet(user0)


        //Add a channel and some items
        author = Object.assign(new Author(), {
            name: "Bob",
            walletAddress: user0
        })

        await authorService.put(author)

        image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
        image2 = await imageService.newFromBuffer(Buffer.from("image2!"))


        //Create animation
        animation = await animationService.newFromText("Hel343l33o")
        await animationService.put(animation)


        //Create category with attributes
        channel = Object.assign(new Channel(), {
            title: "The Sound of Music",
            symbol: "SOM",
            mintPrice: "0.08",
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

        await channelService.put(channel)
 

        //Save images
        await imageService.put(image1)
        await imageService.put(image2)


        //Add items with those attributes
        item1 = Object.assign(new Item(), {
            channelId: channel._id,
            title: "An image!",
            link: "pontoon.com",
            authorId: author._id,
            category: ['Gazebos', 'Ants'],
            content: "blah",
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
            coverImageId: image2.cid.toString(),
            animationId: animation.cid.toString()


        })

        item2 = Object.assign(new Item(), {
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
            }],
            coverImageId: image2.cid.toString(),
            animationId: animation.cid.toString()

        })

        item3 = Object.assign(new Item(), {
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
            }],
            coverImageId: image2.cid.toString(),
            animationId: animation.cid.toString()

        })

        //Save all these
        await itemService.put(item1)
        await itemService.put(item2)
        await itemService.put(item3)

        items = [item1, item2, item3]

        //And the channel
        await channelService.put(channel)

    })

    after("After", async () => {
    })


    it("should import a channel from an export", async () => {

        //Arrange
        await publishService.publishToIPFS(channel)

        let localCid = channel.localCid

        let channelId = await service.importFromIPFS(localCid)

        let importedChannel = await channelService.get(channelId)

        assert.strictEqual(importedChannel.title, 'The Sound of Music')
        assert.strictEqual(importedChannel.symbol, 'SOM')
        assert.strictEqual(importedChannel.mintPrice, '0.08')
        assert.strictEqual(importedChannel.link, 'google.com')
        assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
        assert.strictEqual(importedChannel.title, 'The Sound of Music')

        //Need better asserts. 

    })


    it("should import a channel from http", async () => {

        //Arrange
        let baseURI = "/"

        var mockAxios = new MockAdapter(axios)

        let oldId = channel._id

        mockAxios.onGet("/backup/export/backup/authors.json").reply(200, [author])
        mockAxios.onGet("/backup/export/backup/channels.json").reply(200, [channel])
        mockAxios.onGet("/backup/export/backup/images.json").reply(200, [image1, image2])
        mockAxios.onGet("/backup/export/backup/items.json").reply(200, [item1, item2, item3])
        mockAxios.onGet("/backup/export/backup/animations.json").reply(200, [animation])
        mockAxios.onGet("/backup/export/backup/themes.json").reply(200, [])
        mockAxios.onGet("/backup/export/backup/static-pages.json").reply(200, [])

        mockAxios.onGet(`/backup/export/images/${image1._id}.jpg`).reply(200, Buffer.from("image1!"))
        mockAxios.onGet(`/backup/export/images/${image2._id}.jpg`).reply(200, Buffer.from("image2!"))
        mockAxios.onGet(`/backup/export/animations/${animation._id}.html`).reply(200, "")


        let channelId = await service.importFromReader(baseURI, "Doooo")

        let importedChannel = await channelService.get(channelId)

        assert.strictEqual(importedChannel.title, 'Doooo')
        assert.strictEqual(importedChannel.symbol, 'SOM')
        assert.strictEqual(importedChannel.mintPrice, '0.08')
        assert.strictEqual(importedChannel.link, 'google.com')
        assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
        assert.strictEqual(importedChannel.forkedFromId, oldId)

        //Need better asserts. 

    })




    // it("should import an NFT collection from the network", async () => {

    //     //Arrange
        
    //     //Moonbirds
    //     await service.importFromContract("0x23581767a106ae21c074b2276D25e5C3e136a68b", 1, 5)



    //     //IPFS
    //     await service.importFromContract("0x7b94d6436407a850e6200c2c677e94dc8941bb6f", 1, 5)



    //     // console.log(channelId)

    //     //Assert

    // })




})


