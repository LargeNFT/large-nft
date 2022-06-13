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
import { NFTMetadata } from "../src/dto/nft-metadata";
import { AnimationService } from "../src/service/animation-service";

const ChannelContract = artifacts.require("Channel")
const truffleAssert = require('truffle-assertions')

const toBuffer = require('it-to-buffer')


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

let channel:Channel
let items:Item[]
let author:Author
let cid:string

let exportBundle:ExportBundle

contract('PublishService', async (accounts) => {


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

        await schemaService.loadWallet(user0)


        //Add a channel and some items
        author = Object.assign(new Author(), {
            name: "Bob",
            walletAddress: user0
        })

        await authorService.put(author)

        let image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
        let image2 = await imageService.newFromBuffer(Buffer.from("image2!"))


        //Create animation
        let animation:Animation = await animationService.newFromText("Hel343l33o")
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
        let item1:Item = Object.assign(new Item(), {
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
            }],
            coverImageId: image2.cid.toString(),
            animationId: animation.cid.toString()

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





    it("should publish a channel", async () => {

        //Arrange
        await service.publishToIPFS(channel)

        await service.deployContract(channel)

        //Set up Pinata
        let contractAddress = channel.contractAddress

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
        let value = web3.utils.toWei('0.08', 'ether')
        await c.mint( 1, { from: user4, value: value })

        let owner = await c.ownerOf( 1, { from: user4 })
        let uri = await c.tokenURI( 1, { from: user4 })

        assert.strictEqual(owner, user4)
        assert.strictEqual(uri, `ipfs://${channel.localCid}/metadata/1.json`)

        //Get the metadata and make sure it's right
        let bufferedContents = await toBuffer(ipfsService.ipfs.cat(`${channel.localCid}/metadata/1.json`))
        
        let tokenMetadata = JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

        assert.strictEqual(tokenMetadata.tokenId,1)
        assert.strictEqual(tokenMetadata.name, "An image!")

    })




})

async function getFileContent(filename) {
    let bufferedContents = await toBuffer(ipfsService.ipfs.files.read(filename))  // a buffer
    return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))
}




const sleep = ms => new Promise(r => setTimeout(r, ms));
