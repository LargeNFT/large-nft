import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import fs from "fs"
import path from "path"


import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "../sync/service/spawn-service.js"

import { SyncStatus } from "./dto/sync-status.js"


import { getMainContainer, GetMainContainerCommand } from "./inversify.config.js"
import { SyncStatusService } from "./service/sync-status-service.js"

import _initEjs from '../reader/ejs/template/_init.ejs'
import { GenerateService } from "../reader/service/core/generate-service.js"
import { Channel } from "./dto/channel.js"
import { LibraryChannelService } from "./service/library-channel-service.js"
import { SyncLibraryService } from "./service/sync-library-service.js"


let syncLibrary = async () => {

  let config: any = await ProcessConfig.getSyncLibraryConfig()

  if (!config) {
    throw new Error("No configuration found.")
  }

  if (!config?.readers || Object.keys(config.readers)?.length == 0) {
    throw new Error("No repositories configured.")
  }


  let command:GetMainContainerCommand = {
    channelDir: undefined,
    runDir: config.runDir,    
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: undefined,
  }

  let container = await getMainContainer(config, command)

  let spawnService: SpawnService = container.get("SpawnService")
  let syncStatusService: SyncStatusService = container.get("SyncStatusService")
  let syncLibraryService: SyncLibraryService = container.get("SyncLibraryService")

  let libraryChannelService: LibraryChannelService = container.get("LibraryChannelService")
  let generateService: GenerateService = container.get("GenerateService")

  if (!fs.existsSync(`${process.env.INIT_CWD}/data`)) {
    fs.mkdirSync(`${process.env.INIT_CWD}/data`)
  }



  //Init database
  let sequelizeInit:Function = container.get("sequelize")
  let sequelize = await sequelizeInit(path.resolve(process.env.INIT_CWD))

  await sequelize.query("PRAGMA busy_timeout=5000;")
  await sequelize.query("PRAGMA journal_mode=WAL;")


  if (config.clear) {
    await SyncStatus.drop()
    await Channel.drop()
  }

  await sequelize.sync()

  let syncDir = path.resolve(process.env.INIT_CWD, config.syncDir)

  // if (!fs.existsSync(`${syncDir}/l`)) {
  //   fs.mkdirSync(`${syncDir}/l`, { recursive: true })
  // }



  console.log(`Starting Sync Library to env: ${config.env}`)

  let args = process.argv?.slice(2)

  args.push("--sync-rate")
  args.push("0")

  args.push("--sync-dir")
  args.push(syncDir)


  //Generate library pages
  await generateService.generateLibraryPages(config, syncDir)



  for (let slug of Object.keys(config.readers)) {
    
    let reader = config.readers[slug]
    await syncLibraryService.syncAndGenerateChannel(slug, reader, args, config)

  }

  await syncLibraryService.updateLibraryHome(syncDir)


  async function runLoop() {

    console.time('Syncing...')

    for (let slug of Object.keys(config.readers)) {

      let reader = config.readers[slug]

      await syncLibraryService.syncChannel(slug, reader, config)
  
    }

    await syncLibraryService.updateLibraryHome(syncDir)

    console.timeEnd('Syncing...')

    setTimeout(runLoop, config.syncPushRate)

  }


  if (config.env == "production") {
    runLoop()
  }

}







syncLibrary()

export default syncLibrary


