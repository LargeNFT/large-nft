import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Readable } from 'stream'


import { getMainContainer } from "./publish-inversify.config.js"

import { CidInfo, PublishService } from "./service/core/publish-service.js"
import fs from "fs"


import { IpfsService } from "./service/core/ipfs-service.js"
import { ChannelBackup, SchemaService } from "./service/core/schema-service.js"
import { SettingsService } from "./service/core/settings-service.js"
import { Settings } from "./dto/settings.js"
import path from "path"

import { ImageRepository } from "./repository/image-repository.js"
import { AnimationRepository } from "./repository/animation-repository.js"
import { ChannelService } from "./service/channel-service.js"
import { Channel } from "./dto/channel.js"

let publish = async () => {

  let container = await getMainContainer()

  let channelService:ChannelService = container.get(ChannelService)
  let publishService:PublishService = container.get(PublishService)
  let ipfsService:IpfsService = container.get(IpfsService)
  let schemaService: SchemaService = container.get(SchemaService)
  let settingsService: SettingsService = container.get(SettingsService)

  let imageRepository: ImageRepository = container.get(ImageRepository)
  let animationRepository: AnimationRepository = container.get(AnimationRepository)


  //Load schema
  let channel:Channel

  //Load from the .upload folder if it exists. Otherwise check the existing database.
  if (fs.existsSync("./.upload/channel.json")) {

    if (fs.existsSync(`${process.env.INIT_CWD   }/data/pouch`)) {
      fs.rmSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })
    }
  
    fs.mkdirSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })
  
    await schemaService.load()
  
    //Read channel backup
    let channelBackup:ChannelBackup = {
      channel: JSON.parse(fs.readFileSync("./.upload/channel.json").toString()),
      authors: JSON.parse(fs.readFileSync("./.upload/authors.json").toString()),
      items: JSON.parse(fs.readFileSync("./.upload/items.json").toString()),
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

  }




  let settings = new Settings()
  settings.ipfsHost = '/ip4/127.0.0.1/tcp/5001'
  await settingsService.put(settings)


  await ipfsService.init()

  //export to IPFS
  let result = await publishService.publish(channel, process.env.INIT_CWD )

  

  if (fs.existsSync(`${process.env.INIT_CWD   }/large-config.json`)) {
    fs.rmSync(`${process.env.INIT_CWD   }/large-config.json`)
  }

  if (fs.existsSync(`${process.env.INIT_CWD   }/ipfs`)) {
    fs.rmdirSync(`${process.env.INIT_CWD   }/ipfs`, { recursive: true })
  } 

  fs.mkdirSync(`${process.env.INIT_CWD   }/ipfs`, { recursive: true })


  //Write files to local filesystem
  for (let action of result.fsActions) {

    if (!fs.existsSync(path.dirname(action.file_path))) {
      fs.mkdirSync(path.dirname(action.file_path), { recursive: true })
    }

    if (action.keepExisting) {

      if (!fs.existsSync(action.file_path)) {
        console.log(`Writing file: ${action.file_path}`)
        fs.writeFileSync(action.file_path, action.content)
      }

    } else {
      console.log(`Writing file: ${action.file_path}`)
      fs.writeFileSync(action.file_path, action.content)
    }


  }

  //Export car file
  if (result.cids) {
    const out = await ipfsService.ipfs.dag.export(result.cids.cid)
    Readable.from(out).pipe(fs.createWriteStream(`${process.env.INIT_CWD}/ipfs/${result.cids.cid}.car`))
  
  
    fs.writeFileSync(`${process.env.INIT_CWD}/ipfs/ipfs.json`, Buffer.from(JSON.stringify({
      cid: result.cids.cid.toString(),
      imageDirectoryCid: result.cids.animationDirectoryCid.toString(),
      animationDirectoryCid: result.cids.imageDirectoryCid.toString(),
      date: new Date().toUTCString()
    })))
  }




}


publish()

export default publish


