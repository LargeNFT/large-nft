import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import fs from "fs"
import path from "path"

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "../sync/service/spawn-service.js"

import { FileStatus, SyncStatus } from "./dto/sync-status.js"


import { getMainContainer, GetMainContainerCommand } from "./inversify.config.js"
import { SyncStatusService } from "./service/sync-status-service.js"



/**
 * Starts a process that monitors the configured git repo(s) to generate, sync, and push the results to git. 
 * Then it calls the "deploy" script that allows the public folder to be distributed to a static web host.
 * The sync tasks stay running to monitor Ethereum for changes.
 */
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


  console.log(`Starting Sync Library to env: ${config.env}`)


  for (let slug of Object.keys(config.readers)) {

    let reader = config.readers[slug]

    const syncDirectory = path.resolve(config.syncDir, reader.repo)

    let args = process.argv?.slice(2)

    let publicPath = `${syncDirectory}/public`


    await sequelize.transaction(async (t1) => {

      let options = { transaction: t1 }

      //Get current sync status
      let syncStatus:SyncStatus = await syncStatusService.getOrCreate(slug, options)

      if (config.generate) {

        //Don't copy the admin because the library will have its own.
        args.push("--skip-admin")
        args.push("true")

        await spawnService.spawnGenerate(process.env.INIT_CWD, syncDirectory, args)

      } 

      await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)

      //Save new sync status
      await syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)
  


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

      let publicPath = `${syncDirectory}/public`

      await sequelize.transaction(async (t1) => {

        let options = { transaction: t1 }
  
        let syncStatus:SyncStatus = await syncStatusService.getOrCreate(slug, options)

        await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)
  
  
        //Save new sync status
        await syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)


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