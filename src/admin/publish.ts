import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Readable } from 'stream'


import { getMainContainer } from "./publish-inversify.config.js"

import { PublishService } from "./service/core/publish-service.js"
import fs from "fs"


import { IpfsService } from "./service/core/ipfs-service.js"
import { ChannelBackup, SchemaService } from "./service/core/schema-service.js"
import { SettingsService } from "./service/core/settings-service.js"
import { Settings } from "./dto/settings.js"

import { ImageRepository } from "./repository/image-repository.js"
import { AnimationRepository } from "./repository/animation-repository.js"
import { ChannelService } from "./service/channel-service.js"
import { Channel } from "./dto/channel.js"
import { Image } from "./dto/image.js"

import { ProcessConfig } from "../reader/util/process-config.js"
import { QuillService } from "./service/quill-service.js"
import { ImageService } from "./service/image-service.js"
import { ChannelRepository } from "./repository/channel-repository.js"

let publish = async () => {

  let config:any = await ProcessConfig.getPublishConfig() 


  let container = await getMainContainer()

  let channelService:ChannelService = container.get(ChannelService)
  let channelRepository:ChannelRepository = container.get(ChannelRepository)

  let imageService:ImageService = container.get(ImageService)

  let publishService:PublishService = container.get(PublishService)
  let quillService:QuillService = container.get(QuillService)

  let ipfsService:IpfsService = container.get(IpfsService)
  let schemaService: SchemaService = container.get(SchemaService)
  let settingsService: SettingsService = container.get(SettingsService)

  let imageRepository: ImageRepository = container.get(ImageRepository)
  let animationRepository: AnimationRepository = container.get(AnimationRepository)




  // let settings

  // try {
  //   settings = await settingsService.get()
  // } catch (ex) {}

  // if (!settings) {
  //   settings = new Settings()
  //   settings.ipfsHost = '/ip4/127.0.0.1/tcp/5001'
  //   await settingsService.put(settings)
  // }



  await ipfsService.init()



  //Load schema
  let channel:Channel

  //Load from the .upload folder if it exists. Otherwise check the existing database.
  if (fs.existsSync("./.upload/channel.json")) {

    if (fs.existsSync(`${process.env.INIT_CWD   }/data/pouch`)) {
      fs.rmSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })
    }
  
    fs.mkdirSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })
  
    await schemaService.load()
  

    let originalMetadata = []
    if (fs.existsSync("./.upload/originalMetadata.json")) {
      originalMetadata = JSON.parse(fs.readFileSync("./.upload/originalMetadata.json").toString())
    }

    //Read channel backup
    let channelBackup:ChannelBackup = {
      channel: JSON.parse(fs.readFileSync("./.upload/channel.json").toString()),
      authors: JSON.parse(fs.readFileSync("./.upload/authors.json").toString()),
      items: JSON.parse(fs.readFileSync("./.upload/items.json").toString()),
      originalMetadata: originalMetadata,
      themes: JSON.parse(fs.readFileSync("./.upload/themes.json").toString()),
      staticPages: JSON.parse(fs.readFileSync("./.upload/staticPages.json").toString()),
      attributeCounts: JSON.parse(fs.readFileSync("./.upload/attributeCounts.json").toString())
    }
  
    await schemaService.loadChannelBackup(channelBackup)
  
    //Load images
    console.log(`Loading images...`)
  
    let imageFilenames = fs.readdirSync("./.upload/images")
  
    for (let filename of imageFilenames) {
    
      let image = JSON.parse(fs.readFileSync(`./.upload/images/${filename}`).toString())
  
      delete image._rev
      delete image['_rev_tree'] 
  
      await imageRepository.put(image)
  
  
    }
  
    //Load animations
    console.log(`Loading animations...`)
  
    let animationFilenames = fs.readdirSync("./.upload/animations")
  
    for (let filename of animationFilenames) {
  
      let animation = JSON.parse(fs.readFileSync(`./.upload/animations/${filename}`).toString())
  
      delete animation._rev
      delete animation['_rev_tree'] 
  
      await animationRepository.put(animation)
  
    }

    channel = channelBackup.channel
    
  } else {

    //Load what's already in there because it was imported with the import tool.
    await schemaService.load()

    let channelResults:Channel[] = await channelService.list(1, 0)
    
    if (channelResults?.length == 0) {
      throw new Error("Could not load channel.")
    }

    channel = channelResults[0]

    await schemaService.loadChannel(channel._id)

  }

  //Apply changes from config

  //Channel description, cover image, banner

  if (config.channel) {

    if (config.channel.descriptionMarkdown) {

      channel.description = {
        ops: await quillService.deltaFromMarkdown(config.channel.descriptionMarkdown)
      }


      //Translate description content
      channel.descriptionHTML = await quillService.translateContent(channel.description)

      //Generate markdown
      channel.descriptionMarkdown = await quillService.generateMarkdown(channel.description)


    }
  
    if (config.channel.coverImage) {

      let coverImage:Image = await imageService.newFromBuffer(fs.readFileSync(config.channel.coverImage))

      let existing 

      try {
        existing = await imageService.get(coverImage.cid)
      } catch(ex) {}

      if (!existing) {
        await imageService.put(coverImage)
      }

      channel.coverImageId = coverImage.cid
    }


    if (config.channel.coverBanner) {

      let bannerImage:Image = await imageService.newFromBuffer(fs.readFileSync(config.channel.coverBanner))

      let existing 

      try {
        existing = await imageService.get(bannerImage.cid)
      } catch(ex) {}

      if (!existing) {
        await imageService.put(bannerImage)
      }


      channel.coverBannerId = bannerImage.cid
    }

    //Note: was trying to use the version with validation but it was failing telling me we are saving an invalid field. But I didn't see one.
    //This solution is not great. Gotta throw together some unit tests around it. This is also why we're manually doing the description transformations above.
    await channelRepository.put(channel)

  }




  

  if (fs.existsSync(`${process.env.INIT_CWD   }/large-config.json`)) {
    fs.rmSync(`${process.env.INIT_CWD   }/large-config.json`)
  }

  if (fs.existsSync(`${process.env.INIT_CWD   }/ipfs`)) {
    fs.rmSync(`${process.env.INIT_CWD   }/ipfs`, { recursive: true })
  } 

  fs.mkdirSync(`${process.env.INIT_CWD   }/ipfs`, { recursive: true })




  //export to IPFS
  let result = await publishService.publish(channel, process.env.INIT_CWD )

  

  //Export car file
  if (result.cids) {
    const out = await ipfsService.ipfs.dag.export(result.cids.cid)
    Readable.from(out).pipe(fs.createWriteStream(`${process.env.INIT_CWD}/ipfs/${result.cids.cid}.car`))
  
  
    fs.writeFileSync(`${process.env.INIT_CWD}/ipfs/ipfs.json`, Buffer.from(JSON.stringify({
      cid: result.cids.cid.toString(),
      date: new Date().toUTCString()
    })))
  }




}


publish()

export default publish


