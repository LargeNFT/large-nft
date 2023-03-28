
// import { getContainer } from "./inversify.config.js"

// import assert from 'assert'

// import { ChannelService } from "../src/admin/service/channel-service.js"
// import { PublishService } from "../src/admin/service/core/publish-service.js"
// import { AuthorService } from "../src/admin/service/author-service.js"

// import { Channel } from "../src/admin/dto/channel.js"
// import { Item } from "../src/admin/dto/item.js"
// import { Author } from "../src/admin/dto/author.js"

// import { ExportBundle } from "../src/admin/dto/export-bundle.js"

// import { IpfsService } from "../src/admin/service/core/ipfs-service.js"

// import { SchemaService } from "../src/admin/service/core/schema-service.js"
// import { ItemService } from "../src/admin/service/item-service.js";
// import { ImageService } from "../src/admin/service/image-service.js";
// import { AnimationService } from "../src/admin/service/animation-service.js";

// import Hash from 'ipfs-only-hash'
// import { ItemWebService } from "../src/admin/service/web/item-web-service.js";
// import { ChannelWebService } from "../src/admin/service/web/channel-web-service.js"


// const ChannelContract = artifacts.require("Channel")
// const truffleAssert = require('truffle-assertions')

// const toBuffer = require('it-to-buffer')


// let user0

// let user4


// let service: PublishService

// let ipfsService:IpfsService
// let schemaService:SchemaService
// let authorService:AuthorService
// let itemService:ItemService
// let channelService:ChannelService
// let channelWebService:ChannelWebService
// let itemWebService:ItemWebService

// let imageService:ImageService
// let animationService:AnimationService

// let channel:Channel
// let items:Item[]
// let author:Author
// let cid:string

// let exportBundle:ExportBundle

// describe('PublishService', async () => {


//     before("", async () => {


        
//         let container = await getContainer()

//         globalThis.container = container
        
//         service = container.get(PublishService)
//         schemaService = container.get(SchemaService)
//         authorService = container.get(AuthorService)
//         itemService = container.get(ItemService)
//         channelService = container.get(ChannelService)
//         imageService = container.get(ImageService)
//         ipfsService = container.get(IpfsService)
//         animationService = container.get(AnimationService)
//         channelWebService = container.get(ChannelWebService)
//         itemWebService = container.get(ItemWebService)


//         await ipfsService.init()
//         await schemaService.load()


//         //Add a channel and some items
//         author = Object.assign(new Author(), {
//             name: "Bob",
//             walletAddress: user0
//         })

//         await authorService.put(author)


//         let image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
//         let image2 = await imageService.newFromBuffer(Buffer.from("image2!"))

//         //Create category with attributes
//         channel = Object.assign(new Channel(), {
//             title: "The Sound of Music",
//             symbol: "SOM",
//             mintPrice: "0.08",
//             link: "google.com",
//             authorId: author._id,
//             category: ['Gazebos'],
//             attributeOptions:[
//                 {
//                     id: "6",
//                     traitType:'Hair',
//                     values:['Straight', 'Curly', 'Long']
//                 },
//                 {
//                     id: "7",
//                     traitType:'Teeth',
//                     values:['Have them', 'None', 'Nice']
//                 },
//             ],
//             coverImageId: image1?.cid?.toString(),
//             _id: "channelxyz"
//         }) 

//         await channelWebService.put(channel)
//         await schemaService.loadChannel(channel._id)





//         //Create animation
//         let animation = await animationService.newFromText("Hel343l33o")
//         await animationService.put(animation)

//         //Save images
//         await imageService.put(image1)
//         await imageService.put(image2)


//         //Add items with those attributes
//         let item1:Item = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "An image!",
//             link: "pontoon.com",
//             authorId: author._id,
//             category: ['Gazebos', 'Ants'],
//             content: "blah",
//             attributeSelections: [{
//                 id: "6",
//                 traitType: "Hair",
//                 value: "Curly"
//             },
//             {
//                 id: "7",
//                 traitType: "Teeth",
//                 value: "Nice"
//             }],
//             coverImageId: image2.cid.toString(),
//             animationId: animation.cid.toString(),
//             tokenId: 1,
//             _id: "item1"


//         })

//         let item2:Item = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "2An image!",
//             link: "2pontoon.com",
//             authorId: author._id,
//             category: ['Gazebos', 'Ants'],
//             attributeSelections: [{
//                 id: "6",
//                 traitType: "Hair",
//                 value: "Curly"
//             },
//             {
//                 id: "7",
//                 traitType: "Teeth",
//                 value: "None"
//             }],
//             coverImageId: image2?.cid?.toString(),
//             animationId: animation?.cid?.toString(),
//             tokenId: 2,
//             _id: "item2"

//         })

//         let item3:Item = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "2An image!",
//             link: "2pontoon.com",
//             authorId: author._id,
//             category: ['Gazebos', 'Ants'],
//             attributeSelections: [{
//                 id: "6",
//                 traitType: "Hair",
//                 value: "Straight"
//             },
//             {
//                 id: "7",
//                 traitType: "Teeth",
//                 value: "Have them"
//             }],
//             coverImageId: image2?.cid?.toString(),
//             animationId: animation?.cid?.toString(),
//             tokenId: 3,
//             _id: "item3"


//         })

//         //Save all these
//         await itemWebService.put(item1)
//         await itemWebService.put(item2)
//         await itemWebService.put(item3)

//         items = [item1, item2, item3]

//         //And the channel
//         await channelWebService.put(channel)




//     })

//     after("After", async () => {
//     })


//     // it("should create an export bundle", async () => {
        
//     //     //Arrange

//     //     //Act
//     //     exportBundle = await service.prepareExport(channel, items, author, user0)

//     //     //Assert
//     //     assertNftMetadata(exportBundle.nftMetadata[0], {
//     //         tokenId: 1,
//     //         name: 'An image!',
//     //         description: undefined,
//     //         image: 'ipfs://QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd',
//     //         attributes: [
//     //             { traitType: 'Hair', value: 'Curly'},
//     //             { traitType: 'Teeth', value: 'Nice'}

//     //         ]
//     //     })

//     //     assertNftMetadata(exportBundle.nftMetadata[1], {
//     //         tokenId: 2,
//     //         name: '2An image!',
//     //         description: undefined,
//     //         attributes: [
//     //             { traitType: 'Hair', value: 'Curly'},
//     //             { traitType: 'Teeth', value: 'None'}

//     //         ]
//     //     })

//     //     assertNftMetadata(exportBundle.nftMetadata[2], {
//     //         tokenId: 3,
//     //         name: '2An image!',
//     //         description: undefined,
//     //         attributes: [
//     //             { traitType: 'Hair', value: 'Straight'},
//     //             { traitType: 'Teeth', value: 'Have them'}

//     //         ]
//     //     })

//     //     assert.strictEqual(exportBundle.images[0].cid, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
//     //     assert.strictEqual(exportBundle.images[1].cid, 'QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd')

//     //     // assert.strictEqual(exportBundle.channel, channel)
//     //     // assert.strictEqual(exportBundle.items, items)
//     //     // assert.strictEqual(exportBundle.author, author)



//     // })

//     // const assertNftMetadata = (nftMetadata:NFTMetadata, value:NFTMetadata) => {

//     //     assert.strictEqual(nftMetadata.tokenId, value.tokenId)
//     //     assert.strictEqual(nftMetadata.name, value.name)
//     //     assert.strictEqual(nftMetadata.description, value.description)
//     //     assert.strictEqual(nftMetadata.image, value.image)

//     //     assert.deepStrictEqual(nftMetadata.attributes, value.attributes)

//     // }


//     // it("should export to IPFS", async () => {
   
//     //     //Now export metadata to IPFS
//     //     cid = await service.export(exportBundle)


//     //     //Assert

//     //     //Copy to tmp directory so we're not just reading the underlying folder directly.
//     //     await ipfsService.ipfs.files.cp(`/ipfs/${cid}`, "/tmp/" )

//     //     let contractMetadata:ContractMetadata = await getFileContent(`/tmp/contractMetadata.json`)
        
//     //     let item1File:Item = await getFileContent(`/tmp/1.json`)
//     //     let item2File:Item = await getFileContent(`/tmp/2.json`)
//     //     let item3File:Item = await getFileContent(`/tmp/3.json`)

//     //     assert.strictEqual(contractMetadata.name, "The Sound of Music")
//     //     assert.strictEqual(contractMetadata.external_link, 'google.com')
//     //     assert.strictEqual(contractMetadata.image, 'ipfs://QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')

//     //     assert.strictEqual(item1File.tokenId, 1)
//     //     assert.strictEqual(item1File.name, 'An image!')
//     //     // assert.strictEqual(item1File.animation_url, 'ipfs://QmTTczWjxoGJW8wmo4DCyy25n2KVHWtb3jBRHdHxUVeYkj')
//     //     assert.strictEqual(item1File.image, 'ipfs://QmdiZ38cTbpsGzLYmzne4qfnCa8qLmjf9UGyaeEFoTuqSd')
//     //     assert.deepEqual(item1File.attributes, [
//     //         { traitType: "Hair", value: "Curly" },
//     //         { traitType: "Teeth", value: "Nice" }
//     //     ])

//     //     assert.strictEqual(item2File.tokenId, 2)
//     //     assert.strictEqual(item3File.tokenId, 3)


//     // })




//     it("should publish a channel", async () => {

//         //Arrange
//         await service.publish(channel)

//         await service.deployContract(channel)

//         //Set up Pinata
//         let contractAddress = channel.contractAddress

//         assert.notEqual(contractAddress, undefined)

//         //Read from contract
//         let c = await ChannelContract.at(contractAddress)

//         //should fail to get tokenURI if token doesn't exist
//         await truffleAssert.fails(
//             c.tokenURI( 1, { from: user4 }),
//             truffleAssert.ErrorType.REVERT,
//             "ERC721Metadata: URI query for nonexistent token"
//         )

//         //Mint a token and validate it
//         let value = web3.utils.toWei('0.08', 'ether')
//         await c.mint( 1, { from: user4, value: value })

//         let owner = await c.ownerOf( 1, { from: user4 })
//         let uri = await c.tokenURI( 1, { from: user4 })

//         assert.strictEqual(owner, user4)
//         assert.strictEqual(uri, `ipfs://${channel.localCid}/metadata/1.json`)

//         //Get the metadata and make sure it's right
//         let bufferedContents = await toBuffer(ipfsService.ipfs.cat(`${channel.localCid}/metadata/1.json`))
        
//         let tokenMetadata = JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

//         assert.strictEqual(tokenMetadata.tokenId,1)
//         assert.strictEqual(tokenMetadata.name, "An image!")

//         // //Check the animations and images TODO://fails because dateCreated is different.
//         // let channels = await toBuffer(ipfsService.ipfs.cat(`${channel.localCid}/backup/channels.json`))
//         // let images = await toBuffer(ipfsService.ipfs.cat(`${channel.localCid}/backup/images.json`))
//         // let animations = await toBuffer(ipfsService.ipfs.cat(`${channel.localCid}/backup/animations.json`))

//         // // console.log(await Hash.of(channels), await Hash.of(images), await Hash.of(animations))
//         // assert.strictEqual(await Hash.of(channels), "QmaUAC7zPLyw3htUTZqzhgxgaJR7Nkoc4ZuRHTkRefvgxX")
//         // assert.strictEqual(await Hash.of(images), "QmdFbZxfWsJVMPobDgeCVWT26tQpyqyzwU8bzskbjtvRX2")
//         // assert.strictEqual(await Hash.of(animations), "QmXYqtNdCMAVRUKzTxf8hhBghgUVwJzqbcbv4PfrrJ5p5d")


//     })



//     // it("should publish to IPFS", async () => {

//     //     //Act
//     //     await service.publishToIPFS(channel)

//     //     //Assert
//     //     let fetchedChannel = await channelService.get(channel._id)
        
//     //     assert.strictEqual(fetchedChannel.localCid, cid)

//     // })


// })

// async function getFileContent(filename) {
//     let bufferedContents = await toBuffer(ipfsService.ipfs.files.read(filename))  // a buffer
//     return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))
// }




// const sleep = ms => new Promise(r => setTimeout(r, ms));
