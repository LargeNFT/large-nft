import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import path from "path"

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "./service/spawn-service.js"


/**
 * Starts a process that monitors the configured git repo(s) to generate, sync, and push the results to git. 
 * Then it calls the "deploy" script that allows the public folder to be distributed to a static web host.
 * The sync tasks stay running to monitor Ethereum for changes.
 */
let syncLibrary = async () => {

  let config: any = await ProcessConfig.getSyncPushConfig()

  if (!config) {
    throw new Error("No configuration found.")
  }

  if (!config?.readers || Object.keys(config.readers)?.length == 0) {
    throw new Error("No repositories configured.")
  }


  let spawnService: SpawnService = new SpawnService()

  console.log(`Starting Sync Library to env: ${config.env}`)

  for (let slug of Object.keys(config.readers)) {

    let reader = config.readers[slug]

    const syncDirectory = path.resolve(config.syncDir, reader.repo)

    if (config.generate) {
      await spawnService.spawnGenerateAndSync(process.env.INIT_CWD, syncDirectory, ["--skip-admin", "true"])
    } else {
      await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory)
    }

  }


  async function runLoop() {

    console.log('Starting Sync Library loop')

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

      await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)

    }


    setTimeout(runLoop, config.syncPushRate)

  }

  if (config.env == "production") {
    runLoop()
  }




}

syncLibrary()

export default syncLibrary