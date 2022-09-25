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
import Hash from 'ipfs-only-hash'

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

    let originalCid 

    // it("should import a channel from an export", async () => {

    //     //Arrange
    //     await publishService.publishToIPFS(channel)

    //     originalCid = channel.localCid

    //     let channelId = await service.importFromIPFS(originalCid)

    //     let importedChannel = await channelService.get(channelId)

    //     assert.strictEqual(importedChannel.title, 'The Sound of Music')
    //     assert.strictEqual(importedChannel.symbol, 'SOM')
    //     assert.strictEqual(importedChannel.mintPrice, '0.08')
    //     assert.strictEqual(importedChannel.link, 'google.com')
    //     assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
    //     assert.strictEqual(importedChannel.title, 'The Sound of Music')

    //     //Need better asserts. 

    // })

    // it("should import a channel from http", async () => {
        
    //     //Arrange
    //     let baseURI = "/"

    //     var mockAxios = new MockAdapter(axios)

    //     let oldId = channel._id

    //     mockAxios.onGet("/backup/export/backup/authors.json").reply(200, [author])
    //     mockAxios.onGet("/backup/export/backup/channels.json").reply(200, [channel])
    //     mockAxios.onGet("/backup/export/backup/images.json").reply(200, [image1, image2])
    //     mockAxios.onGet("/backup/export/backup/items.json").reply(200, [item1, item2, item3])
    //     mockAxios.onGet("/backup/export/backup/animations.json").reply(200, [animation])
    //     mockAxios.onGet("/backup/export/backup/themes.json").reply(200, [])
    //     mockAxios.onGet("/backup/export/backup/static-pages.json").reply(200, [])

    //     mockAxios.onGet(`/backup/export/images/${image1._id}.jpg`).reply(200, Buffer.from("image1!"))
    //     mockAxios.onGet(`/backup/export/images/${image2._id}.jpg`).reply(200, Buffer.from("image2!"))
    //     mockAxios.onGet(`/backup/export/animations/${animation._id}.html`).reply(200, "Hel343l33o")


    //     let channelId = await service.importAsForkFromReader(baseURI, "Doooo")
    //     let importedChannel = await channelService.get(channelId)

    //     assert.strictEqual(importedChannel.title, 'Doooo')
    //     assert.strictEqual(importedChannel.symbol, 'SOM')
    //     assert.strictEqual(importedChannel.mintPrice, '0.08')
    //     assert.strictEqual(importedChannel.link, 'google.com')
    //     assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
    //     assert.strictEqual(importedChannel.forkedFromId, oldId)

    //     //Need better asserts. 

    // })

    // it("should import an existing channel", async () => {
        
    //     //Arrange
    //     //Delete existing
    //     await channelService.delete(channel)


    //     let baseURI = "/"

    //     var mockAxios = new MockAdapter(axios)

    //     mockAxios.onGet("/backup/export/backup/authors.json").reply(200, [author])
    //     mockAxios.onGet("/backup/export/backup/channels.json").reply(200, [channel])
    //     mockAxios.onGet("/backup/export/backup/images.json").reply(200, [image1, image2])
    //     mockAxios.onGet("/backup/export/backup/items.json").reply(200, [item1, item2, item3])
    //     mockAxios.onGet("/backup/export/backup/animations.json").reply(200, [animation])
    //     mockAxios.onGet("/backup/export/backup/themes.json").reply(200, [])
    //     mockAxios.onGet("/backup/export/backup/static-pages.json").reply(200, [])

    //     mockAxios.onGet(`/backup/export/images/${image1._id}.jpg`).reply(200, Buffer.from("image1!"))
    //     mockAxios.onGet(`/backup/export/images/${image2._id}.jpg`).reply(200, Buffer.from("image2!"))
    //     mockAxios.onGet(`/backup/export/animations/${animation._id}.html`).reply(200, "Hel343l33o")

    //     await service.importExistingFromReader(baseURI, "xyz", "abc")
        
    //     let importedChannel = await channelService.get(channel._id)


    //     assert.strictEqual(importedChannel.title, channel.title)
    //     assert.strictEqual(importedChannel.symbol, channel.symbol)
    //     assert.strictEqual(importedChannel.mintPrice, channel.mintPrice)
    //     assert.strictEqual(importedChannel.link, channel.link)
    //     assert.strictEqual(importedChannel.coverImageId, channel.coverImageId)
        
    // })

    // it("should publish an imported collection and get the same IPFS hash", async () => {

    //     await publishService.publishToIPFS(channel)
    //     assert.strictEqual(channel.localCid, originalCid)


    // })





    it("should publish an imported collection and get the same IPFS hash", async () => {

        let fromImport = "<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\r\n            <style>\r\n                * {\r\n                    --lh: 95px;\r\n                    height:100%;\r\n                    margin: 0;\r\n                    padding: 0;\r\n                    box-sizing: border-box;\r\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\r\n                }\r\n\r\n\r\n                @keyframes gradient {\r\n                    0% {\r\n                        background-position: 0% 50%;\r\n                    }\r\n                    25% {\r\n                        background-position: 50%% 50%;\r\n                    }\r\n                    50% {\r\n                        background-position: 100% 50%;\r\n                    }\r\n                    75% {\r\n                        background-position: 50% 50%;\r\n                    }\r\n                    100% {\r\n                        background-position: 0% 50%;\r\n                    }\r\n                }\r\n\r\n\r\n                .svg-h1 {\r\n\r\n                    border: 25px solid rgb(78,130,177);\r\n                    \r\n                    background: rgb(241,241,241);\r\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\r\n                    background-size: 400% 400%;\r\n                    animation: gradient 15s ease infinite;\r\n\r\n                    text-align: center;\r\n                    font-size: 75px;\r\n                    padding: 70px;            \r\n                    line-height: var(--lh);\r\n                    height: 1200px;\r\n                    width: 1200px;  \r\n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \r\n                }\r\n\r\n                .svg-title {\r\n                    font-weight: 700;\r\n                    font-size: 1.25em;\r\n                }\r\n\r\n                .svg-text {\r\n                    width: 100%;\r\n                    font-weight: 500;\r\n                }\r\n\r\n                \r\n\r\n                \r\n\r\n            </style>\r\n            <g>\r\n                <foreignObject x='0' y='0' width='1200' height='1200'>\r\n                    <h1 class=\"svg-h1\" xmlns='http://www.w3.org/1999/xhtml'><p>So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.</p></h1>\r\n                </foreignObject>\r\n            </g>\r\n        </svg>"

        let fromPouch = atob("PHN2ZyB2aWV3Qm94PScwIDAgMTIwMCAxMjAwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZlcnNpb249JzEuMSc+CiAgICAgICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgICAgICogewogICAgICAgICAgICAgICAgICAgIC0tbGg6IDk1cHg7CiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OjEwMCU7CiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwOwogICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsICdBcHBsZSBDb2xvciBFbW9qaScsICdTZWdvZSBVSSBFbW9qaScsICdTZWdvZSBVSSBTeW1ib2wnOwogICAgICAgICAgICAgICAgfQoKCiAgICAgICAgICAgICAgICBAa2V5ZnJhbWVzIGdyYWRpZW50IHsKICAgICAgICAgICAgICAgICAgICAwJSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgMjUlIHsKICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlJSA1MCU7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIDUwJSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgNTAlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICA3NSUgewogICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAxMDAlIHsKICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KCgogICAgICAgICAgICAgICAgLnN2Zy1oMSB7CgogICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMjVweCBzb2xpZCByZ2IoNzgsMTMwLDE3Nyk7CiAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiKDI0MSwyNDEsMjQxKTsKICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCByZ2JhKDI0MSwyNDEsMjQxLDEpIDEzJSwgcmdiYSgyMzksMjQzLDI0OCwxKSAzNyUsIHJnYmEoMTc2LDIwOSwyMjAsMC45Mjc2MDg1NDM0MTczNjcpIDY5JSwgcmdiYSgyNTUsMjU1LDI1NSwxKSAxMDAlKTsKICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDQwMCUgNDAwJTsKICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IGdyYWRpZW50IDE1cyBlYXNlIGluZmluaXRlOwoKICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiA3NXB4OwogICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDcwcHg7ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IHZhcigtLWxoKTsKICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEyMDBweDsKICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwMHB4OyAgCiAgICAgICAgICAgICAgICAgICAgLXdlYmtpdC1tYXNrLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2IoMCwwLDApIDYwJSwgdHJhbnNwYXJlbnQpOyAgICAgICAgCiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgLnN2Zy10aXRsZSB7CiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDsKICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDEuMjVlbTsKICAgICAgICAgICAgICAgIH0KCiAgICAgICAgICAgICAgICAuc3ZnLXRleHQgewogICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgCgogICAgICAgICAgICAgICAgCgogICAgICAgICAgICA8L3N0eWxlPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgIDxmb3JlaWduT2JqZWN0IHg9JzAnIHk9JzAnIHdpZHRoPScxMjAwJyBoZWlnaHQ9JzEyMDAnPgogICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz0ic3ZnLWgxIiB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc+PHA+U28gc2hlIHdhcyBjb25zaWRlcmluZyBpbiBoZXIgb3duIG1pbmQgKGFzIHdlbGwgYXMgc2hlIGNvdWxkLCBmb3IgdGhlIGhvdCBkYXkgbWFkZSBoZXIgZmVlbCB2ZXJ5IHNsZWVweSBhbmQgc3R1cGlkKSwgd2hldGhlciB0aGUgcGxlYXN1cmUgb2YgbWFraW5nIGEgZGFpc3ktY2hhaW4gd291bGQgYmUgd29ydGggdGhlIHRyb3VibGUgb2YgZ2V0dGluZyB1cCBhbmQgcGlja2luZyB0aGUgZGFpc2llcywgd2hlbiBzdWRkZW5seSBhIFdoaXRlIFJhYmJpdCB3aXRoIHBpbmsgZXllcyByYW4gY2xvc2UgYnkgaGVyLjwvcD48L2gxPgogICAgICAgICAgICAgICAgPC9mb3JlaWduT2JqZWN0PgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9zdmc+")

        let contentActualFile = `<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <style>
            * {
                --lh: 95px;
                height:100%;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            }


            @keyframes gradient {
                0% {
                    background-position: 0% 50%;
                }
                25% {
                    background-position: 50%% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                75% {
                    background-position: 50% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }


            .svg-h1 {

                border: 25px solid rgb(78,130,177);
                
                background: rgb(241,241,241);
                background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;

                text-align: center;
                font-size: 75px;
                padding: 70px;            
                line-height: var(--lh);
                height: 1200px;
                width: 1200px;  
                -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        
            }

            .svg-title {
                font-weight: 700;
                font-size: 1.25em;
            }

            .svg-text {
                width: 100%;
                font-weight: 500;
            }

            

            

        </style>
        <g>
            <foreignObject x='0' y='0' width='1200' height='1200'>
                <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'><p>So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.</p></h1>
            </foreignObject>
        </g>
    </svg>`


        // assert.strictEqual(content, content2)

        console.log(await Hash.of(fromImport))
        console.log(await Hash.of(fromPouch))

    console.log(await Hash.of(contentActualFile))


    })




})


