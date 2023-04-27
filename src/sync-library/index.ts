import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import fs from "fs"
import path from "path"
import * as Eta from 'eta'
import indexEjs from './ejs/index.ejs'

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "../sync/service/spawn-service.js"

import { FileStatus, SyncStatus } from "./dto/sync-status.js"


import { getMainContainer, GetMainContainerCommand } from "./inversify.config.js"
import { SyncStatusService } from "./service/sync-status-service.js"



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
  }

  await sequelize.sync()

  let syncDir = path.resolve(process.env.INIT_CWD, config.syncDir)

  console.log(`Starting Sync Library to env: ${config.env}`)

  let args = process.argv?.slice(2)

  args.push("--sync-rate")
  args.push("0")

  args.push("--sync-dir")
  args.push(syncDir)


  //Generate library pages
  if (config.generate) {
    const indexResult = Eta.render(indexEjs, { })
    fs.writeFileSync(`${syncDir}/index.html`, indexResult)
  }


  for (let slug of Object.keys(config.readers)) {

    let reader = config.readers[slug]

    const syncDirectory = path.resolve(config.syncDir, reader.repo)

    let publicPath = `${syncDirectory}/public`


    await sequelize.transaction(async (t1) => {

      let options = { transaction: t1 }

      //Get current sync status
      let syncStatus:SyncStatus = await syncStatusService.getOrCreate(slug, options)

      if (config.generate) {
        await spawnService.spawnGenerate(process.env.INIT_CWD, syncDirectory, args)
      } 

      await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)


      if (config.env == "production") {
        //Save new sync status
        await syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)
      }


  
      syncStatus.lastModified = new Date()

      await syncStatusService.put(syncStatus, options)


    })

  }


  async function runLoop() {

    console.time('Syncing...')

    for (let slug of Object.keys(config.readers)) {

      let reader = config.readers[slug]

      const syncDirectory = path.resolve(config.syncDir, reader.repo)

      //Sync

      //Remove clear
      let args = process.argv?.slice(2)

      let indexOfClear = args.indexOf("--clear")

      if (indexOfClear > -1) {
        args.splice(indexOfClear, 2)
      }

      args.push("--sync-rate")
      args.push("0")


      let publicPath = `${syncDirectory}/public`

      await sequelize.transaction(async (t1) => {

        let options = { transaction: t1 }
  
        let syncStatus:SyncStatus = await syncStatusService.getOrCreate(slug, options)

        await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)
  
  
        //Save new sync status
        if (config.env == "production") {
          await syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)
        }


        syncStatus.lastModified = new Date()
  
        await syncStatusService.put(syncStatus, options)
  
      })
  
  
    }

    console.timeEnd('Syncing...')

    setTimeout(runLoop, config.syncPushRate)

  }



  if (config.env == "production") {
    runLoop()
  }

}


syncLibrary()

export default syncLibrary