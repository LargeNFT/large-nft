import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import path from "path"

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "./service/spawn-service.js"

// var Queue = require('better-queue')
import Queue from 'better-queue'



import events from "events"
const eventEmitter = new events.EventEmitter()


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

  let pluginModules = []

  //Limited support for plugins. Just runs some code before start.
  for (let plugin of config.plugins) {
    let module = await import(/*webpackIgnore: true*/`${config.baseDir}/plugins/${plugin}`)
    module.default(eventEmitter)

    pluginModules.push(module)
  }


  let queues = {}

  function getQueue(syncDirectory) {

    if (!queues[syncDirectory]) {
      queues[syncDirectory] = new Queue(function (input, cb) {  

        try {
          
          let promises = []
  
          for (let module of pluginModules) {
            promises.push(module.filesChanged(input))
          }
  
          Promise.all(promises).then((values) => {
            cb(null, {})
          })
  
        } catch(ex) {
          cb(ex, null)
        }
  
  
      }, {
        store: {
          maxRetries: 10, 
          retryDelay: 5000,
          type: 'sql',
          dialect: 'sqlite',
          path: `${syncDirectory}/sync/changelog.json`
        }
      })
    }

    return queues[syncDirectory]

  }
  


  let spawnService: SpawnService = new SpawnService()

  console.log(`Starting Sync Library to env: ${config.env}`)

  for (let slug of Object.keys(config.readers)) {

    let reader = config.readers[slug]

    const syncDirectory = path.resolve(config.syncDir, reader.repo)


    //Create a persistent queue to log changes to files. This way we don't miss any.
    //Actually process the changes (aka call plugin hooks) in the queue handler.
    const changelogQueue = getQueue(syncDirectory)



    let args = process.argv?.slice(2)

    if (config.generate) {

      //Don't copy the admin because the library will have its own.
      args.push("--skip-admin")
      args.push("true")

      await spawnService.spawnGenerateAndSync(process.env.INIT_CWD, syncDirectory, args)

    } else {
      
      await spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)
    
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