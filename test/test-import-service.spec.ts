// import { getContainer } from "./inversify.config.js"

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

// import assert from 'assert'

// import { ChannelService } from "../src/admin/service/channel-service.js"
// import { ImportService } from "../src/admin/service/core/import-service.js"
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
// import { PublishService } from "../src/admin/service/core/publish-service.js";
// import { ItemWebService } from "../src/admin/service/web/item-web-service.js";
// import { ChannelWebService } from "../src/admin/service/web/channel-web-service.js"

// var MockAdapter = require("axios-mock-adapter")
// import axios from "axios"

// let user0



// let service: ImportService

// let ipfsService:IpfsService
// let schemaService:SchemaService
// let authorService:AuthorService
// let itemService:ItemService
// let channelService:ChannelService
// let imageService:ImageService
// let animationService:AnimationService
// let publishService:PublishService
// let channelWebService:ChannelWebService
// let itemWebService:ItemWebService

// let channel:Channel
// let items:Item[]
// let author:Author
// let cid:string

// let exportBundle:ExportBundle

// let image1, image2, item1, item2, item3, animation


// describe('ImportService', async () => {

//     before("", async () => {

//         user0 = "xyz"

//         let container = await getContainer()
        
//         service = container.get(ImportService)
//         schemaService = container.get(SchemaService)
//         authorService = container.get(AuthorService)
//         itemService = container.get(ItemService)
//         channelService = container.get(ChannelService)
//         imageService = container.get(ImageService)
//         ipfsService = container.get(IpfsService)
//         animationService = container.get(AnimationService)
//         publishService = container.get(PublishService)
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

//         image1 = await imageService.newFromBuffer(Buffer.from("image1!"))
//         image2 = await imageService.newFromBuffer(Buffer.from("image2!"))



//         //Create category with attributes
//         channel = Object.assign(new Channel(), {
//             title: "The Sound of Music333424234",
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
//             coverImageId: image1.cid.toString()
//         }) 

//         await channelWebService.put(channel)
//         //@ts-ignore
//         await schemaService.loadChannel(channel._id)


//         //Create animation
//         animation = await animationService.newFromText("Hel343l33o")
//         await animationService.put(animation)
 

//         //Save images
//         await imageService.put(image1)
//         await imageService.put(image2)


//         //Add items with those attributes
//         item1 = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "!!An image!",
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
//             animationId: animation.cid.toString()


//         })

//         item2 = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "2@@An image!",
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
//             coverImageId: image2.cid.toString(),
//             animationId: animation.cid.toString()

//         })

//         item3 = Object.assign(new Item(), {
//             channelId: channel._id,
//             title: "2An@@@ image!",
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
//             coverImageId: image2.cid.toString(),
//             animationId: animation.cid.toString()

//         })

//         //Save all these
//         await itemWebService.put({
//             channel: channel,
//             item: item1,
//             publish: false
//         })

//         await itemWebService.put({
//             channel: channel,
//             item: item2,
//             publish: false
//         })

//         await itemWebService.put({
//             channel: channel,
//             item: item3,
//             publish: false
//         })


//         items = [item1, item2, item3]

//         //And the channel
//         await channelWebService.put(channel)

//     })

//     after("After", async () => {
//     })

//     let originalCid 
//     let id1

//     // it("should import a channel from an export", async () => {

//     //     //Arrange
//     //     await publishService.publish(channel, false, false)

//     //     originalCid = channel.localCid

//     //     let channelId = await service.importFromIPFS(originalCid, "existing")

//     //     let importedChannel = await channelService.get(channelId)

//     //     assert.strictEqual(importedChannel.title, 'The Sound of Music')
//     //     assert.strictEqual(importedChannel.symbol, 'SOM')
//     //     assert.strictEqual(importedChannel.mintPrice, '0.08')
//     //     assert.strictEqual(importedChannel.link, 'google.com')
//     //     assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
//     //     assert.strictEqual(importedChannel.title, 'The Sound of Music')

//     //     //Need better asserts. 

//     // })

//     // it("should import a channel from http", async () => {
        
//     //     //Arrange
//     //     let baseURI = "/"

//     //     var mockAxios = new MockAdapter(axios)

//     //     let oldId = channel._id

//     //     mockAxios.onGet("/backup/export/backup/authors.json").reply(200, [author])
//     //     mockAxios.onGet("/backup/export/backup/channels.json").reply(200, [channel])
//     //     mockAxios.onGet("/backup/export/backup/images.json").reply(200, [image1, image2])
//     //     mockAxios.onGet("/backup/export/backup/items.json").reply(200, [item1, item2, item3])
//     //     mockAxios.onGet("/backup/export/backup/animations.json").reply(200, [animation])
//     //     mockAxios.onGet("/backup/export/backup/themes.json").reply(200, [])
//     //     mockAxios.onGet("/backup/export/backup/static-pages.json").reply(200, [])

//     //     mockAxios.onGet(`/backup/export/images/${image1._id}.jpg`).reply(200, Buffer.from("image1!"))
//     //     mockAxios.onGet(`/backup/export/images/${image2._id}.jpg`).reply(200, Buffer.from("image2!"))
//     //     mockAxios.onGet(`/backup/export/animations/${animation._id}.html`).reply(200, "Hel343l33o")
//     //     mockAxios.onGet("/backup/export/contractMetadata.json").reply(200, {})


//     //     let channelId = await service.importAsForkFromReader(baseURI, "Doooo")
//     //     let importedChannel = await channelService.get(channelId)

//     //     assert.strictEqual(importedChannel.title, 'Doooo')
//     //     assert.strictEqual(importedChannel.symbol, 'SOM')
//     //     assert.strictEqual(importedChannel.mintPrice, '0.08')
//     //     assert.strictEqual(importedChannel.link, 'google.com')
//     //     assert.strictEqual(importedChannel.coverImageId, 'QmVZ3JQMSQyvfA94kAWaR4AR1HeqSHk82YFnAv5Y2L3WWc')
//     //     assert.strictEqual(importedChannel.forkedFromId, oldId)

//     //     //Need better asserts. 

//     // })

//     it("should import an existing channel", async () => {
        
//         //Arrange
//         //Delete existing
//         await channelService.delete(channel)

//         id1 = channel._id

//         channel._id = "brandnewid"


//         let baseURI = "/"

//         var mockAxios = new MockAdapter(axios)

//         mockAxios.onGet("/backup/export/backup/authors.json").reply(200, [author])
//         mockAxios.onGet("/backup/export/backup/channels.json").reply(200, [channel])
//         mockAxios.onGet("/backup/export/backup/images.json").reply(200, [image1, image2])
//         mockAxios.onGet("/backup/export/backup/items.json").reply(200, [item1, item2, item3])
//         mockAxios.onGet("/backup/export/backup/animations.json").reply(200, [animation])
//         mockAxios.onGet("/backup/export/backup/themes.json").reply(200, [])
//         mockAxios.onGet("/backup/export/backup/static-pages.json").reply(200, [])
//         mockAxios.onGet("/backup/export/contractMetadata.json").reply(200, {})

//         mockAxios.onGet(`/backup/export/images/${image1._id}.jpg`).reply(200, Buffer.from("image1!"))
//         mockAxios.onGet(`/backup/export/images/${image2._id}.jpg`).reply(200, Buffer.from("image2!"))
//         mockAxios.onGet(`/backup/export/animations/${animation._id}.html`).reply(200, "Hel343l33o")

//         await service.importExistingFromReader(baseURI, "xyz", "abc")
        
//         let importedChannel = await channelService.get(channel._id)


//         assert.strictEqual(importedChannel.title, channel.title)
//         assert.strictEqual(importedChannel.symbol, channel.symbol)
//         assert.strictEqual(importedChannel.mintPrice, channel.mintPrice)
//         assert.strictEqual(importedChannel.link, channel.link)
//         assert.strictEqual(importedChannel.coverImageId, channel.coverImageId)
        
//     })




// })


