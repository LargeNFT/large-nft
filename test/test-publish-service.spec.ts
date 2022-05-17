//@ts-nocheck
require("dotenv").config();

import { getContainer } from "./inversify.config"

import assert from 'assert'

import { ChannelService } from "../src/service/channel-service"
import { PublishService } from "../src/service/core/publish-service"
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

const ChannelContract = artifacts.require("Channel")
const truffleAssert = require('truffle-assertions')

const toBuffer = require('it-to-buffer')


let user0
let user1
let user2
let user3
let user4


let service: PublishService

let ipfsService:IpfsService
let schemaService:SchemaService
let authorService:AuthorService
let itemService:ItemService
let channelService:ChannelService
let imageService:ImageService

let channel:Channel
let items:Item[]
let author:Author
let cid:string

contract('PublishService', async (accounts) => {


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
        
        let container = await getContainer()
        
        service = container.get(PublishService)
        schemaService = container.get(SchemaService)
        authorService = container.get(AuthorService)
        itemService = container.get(ItemService)
        channelService = container.get(ChannelService)
        imageService = container.get(ImageService)
        
        await schemaService.loadWallet(user0)


        //Add a channel and some items
        author = Object.assign(new Author(), {
            name: "Bob",
            walletAddress: user0
        })

        await authorService.put(author)

        let image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
        let image2 = await imageService.newFromBuffer(Buffer.from("image2!"))

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

        await channelService.put(channel)
 

        //Save images
        image1.channelId = channel._id
        image2.channelId = channel._id

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
        await channelService.put(channel)

    })

    after("After", async () => {
    })


    it("should create an export bundle", async () => {
        
        //Arrange

        //Act
        let exportBundle:ExportBundle = await service.prepareExport(channel, items, author, user0)

        //Assert
        assertNftMetadata(exportBundle.nftMetadata[0], {
            tokenId: 1,
            name: 'An image!',
            description: undefined,
            image: 'ipfs://QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd',
            attributes: [
                { traitType: 'Hair', value: 'Curly'},
                { traitType: 'Teeth', value: 'Nice'}

            ]
        })

        assertNftMetadata(exportBundle.nftMetadata[1], {
            tokenId: 2,
            name: '2An image!',
            description: undefined,
            attributes: [
                { traitType: 'Hair', value: 'Curly'},
                { traitType: 'Teeth', value: 'None'}

            ]
        })

        assertNftMetadata(exportBundle.nftMetadata[2], {
            tokenId: 3,
            name: '2An image!',
            description: undefined,
            attributes: [
                { traitType: 'Hair', value: 'Straight'},
                { traitType: 'Teeth', value: 'Have them'}

            ]
        })

        assert.strictEqual(exportBundle.images[0].cid, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
        assert.strictEqual(exportBundle.images[1].cid, 'QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd')

        // assert.strictEqual(exportBundle.channel, channel)
        // assert.strictEqual(exportBundle.items, items)
        // assert.strictEqual(exportBundle.author, author)



    })

    const assertNftMetadata = (nftMetadata:NFTMetadata, value:NFTMetadata) => {

        assert.strictEqual(nftMetadata.tokenId, value.tokenId)
        assert.strictEqual(nftMetadata.name, value.name)
        assert.strictEqual(nftMetadata.description, value.description)
        assert.strictEqual(nftMetadata.image, value.image)

        assert.deepStrictEqual(nftMetadata.attributes, value.attributes)

    }


    // it("should publish to IPFS", async () => {
   
    //     //Now export metadata to IPFS
    //     cid = await service.exportToIPFS(channel,items, user0)


    //     //Assert

    //     //Copy to tmp directory so we're not just reading the underlying folder directly.
    //     await ipfsService.ipfs.files.cp(`/ipfs/${cid}`, "/tmp/" )


    //     let backup = await getFileContent(`/tmp/initial.json`)

    //     assert.strictEqual(backup.channels.length, 1)
    //     assert.strictEqual(backup.items.length, 3)
    //     assert.strictEqual(backup.authors.length, 1)


    //     let contractMetadata:ContractMetadata = await getFileContent(`/tmp/contractMetadata.json`)
        
    //     let item1File:Item = await getFileContent(`/tmp/1.json`)
    //     let item2File:Item = await getFileContent(`/tmp/2.json`)
    //     let item3File:Item = await getFileContent(`/tmp/3.json`)

    //     assert.strictEqual(contractMetadata.name, "The Sound of Music")
    //     assert.strictEqual(contractMetadata.external_link, 'google.com')
    //     assert.strictEqual(contractMetadata.image, 'ipfs://QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')

    //     assert.strictEqual(item1File.tokenId, '1')
    //     assert.strictEqual(item1File.name, 'An image!')
    //     assert.strictEqual(item1File.animation_url, 'ipfs://QmTTczWjxoGJW8wmo4DCyy25n2KVHWtb3jBRHdHxUVeYkj')
    //     assert.strictEqual(item1File.image, 'ipfs://QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd')
    //     assert.deepEqual(item1File.attributes, [
    //         { traitType: "Hair", value: "Curly" },
    //         { traitType: "Teeth", value: "Nice" }
    //     ])

    //     assert.strictEqual(item2File.tokenId, '2')
    //     assert.strictEqual(item3File.tokenId, '3')


    // })

    // it("should should get the JSON Feed for a channel", async () => {

    // })

    // it("should should get the RSS Feed for a channel", async () => {

    // })

    // it("should publish a channel", async () => {

    //     //Arrange

    //     //Set up Pinata
    //     let contractAddress = await service.publish(channel, items, {
    //         apiKey: apiKey,
    //         secretApiKey: secretApiKey,
    //         url: "https://api.pinata.cloud"
    //     }, cid)

    //     assert.notEqual(contractAddress, undefined)

    //     //Read from contract
    //     let c = await ChannelContract.at(contractAddress)

    //     //should fail to get tokenURI if token doesn't exist
    //     await truffleAssert.fails(
    //         c.tokenURI( 1, { from: user4 }),
    //         truffleAssert.ErrorType.REVERT,
    //         "ERC721Metadata: URI query for nonexistent token"
    //     )

    //     //Mint a token and validate it
    //     await c.mint( 1, { from: user4, value: web3.utils.toWei('0.08', 'ether') })

    //     let owner = await c.ownerOf( 1, { from: user4 })
    //     let uri = await c.tokenURI( 1, { from: user4 })

    //     assert.strictEqual(owner, user4)
    //     assert.strictEqual(uri, `ipfs://${cid}/1.json`)

    //     //Get the metadata and make sure it's right
    //     let bufferedContents = await toBuffer(ipfsService.ipfs.cat(`${cid}/1.json`))
        
    //     let tokenMetadata = JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

    //     assert.strictEqual(tokenMetadata.tokenId, "1")
    //     assert.strictEqual(tokenMetadata.name, "An image!")


    // })





})

async function getFileContent(filename) {
    let bufferedContents = await toBuffer(ipfsService.ipfs.files.read(filename))  // a buffer
    return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))
}




const sleep = ms => new Promise(r => setTimeout(r, ms));
