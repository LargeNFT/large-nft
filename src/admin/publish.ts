import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { Readable } from 'stream'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import { getMainContainer } from "./publish-inversify.config.js"

import { PublishService } from "./service/core/publish-service.js"
import fs from "fs"

//@ts-ignore
import contractABI from '../../contracts.json' assert { type: "json" }
import { IpfsService } from "./service/core/ipfs-service.js"
import { ChannelBackup, SchemaService } from "./service/core/schema-service.js"
import { SettingsService } from "./service/core/settings-service.js"
import { Settings } from "./dto/settings.js"
import path from "path"

let publish = async () => {

  let container = await getMainContainer()
  let publishService:PublishService = container.get(PublishService)
  let ipfsService:IpfsService = container.get(IpfsService)
  let schemaService: SchemaService = container.get(SchemaService)
  let settingsService: SettingsService = container.get(SettingsService)


  if (fs.existsSync(`${process.env.INIT_CWD   }/data/pouch`)) {
    fs.rmdirSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })
  }

  fs.mkdirSync(`${process.env.INIT_CWD   }/data/pouch`, { recursive: true })


  //Load schema
  await schemaService.load()


  //Read channel backup
  let channelBackup:ChannelBackup = {
    channel: JSON.parse(fs.readFileSync("./.upload/channel").toString()),
    items: JSON.parse(fs.readFileSync("./.upload/items").toString()),
    animations: JSON.parse(fs.readFileSync("./.upload/animations").toString()),
    images: JSON.parse(fs.readFileSync("./.upload/images").toString()),
    themes: JSON.parse(fs.readFileSync("./.upload/themes").toString()),
    staticPages: JSON.parse(fs.readFileSync("./.upload/staticPages").toString()),
    attributeCounts: JSON.parse(fs.readFileSync("./.upload/attributeCounts").toString())
  }

  await schemaService.loadChannelBackup(channelBackup)

  let settings

  try {
    settings = await settingsService.get()
  } catch(ex) {}

  if (!settings) {
    settings = new Settings()
    settings.ipfsHost = '/ip4/127.0.0.1/tcp/5001'
    await settingsService.put(settings)
  }

  await ipfsService.init()

  //export to IPFS
  let result = await publishService.publish(channelBackup.channel, process.env.INIT_CWD )

  if (fs.existsSync(`${process.env.INIT_CWD   }/large-config.json`)) {
    fs.rmSync(`${process.env.INIT_CWD   }/large-config.json`)
  }


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
  const out = await ipfsService.ipfs.dag.export(result.cid)
  Readable.from(out).pipe(fs.createWriteStream(`${process.env.INIT_CWD}/ipfs.car`))

  //Export JSON with info
  if (fs.existsSync(`${process.env.INIT_CWD   }/ipfs.json`)) {
    fs.rmSync(`${process.env.INIT_CWD   }/ipfs.json`)
  }


  fs.writeFileSync(`${process.env.INIT_CWD}/ipfs.json`, Buffer.from(JSON.stringify({
    cid: result.cid,
    date: new Date().toDateString()
  })))



}


publish()

export default publish


