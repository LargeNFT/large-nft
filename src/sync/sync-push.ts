import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import path from "path"

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "./service/spawn-service.js"
import { simpleGit, CleanOptions } from 'simple-git'


/**
 * Starts a process that monitors the configured git repo(s) to generate, sync, and push the results to git. 
 * Then it calls the "deploy" script that allows the public folder to be distributed to a static web host.
 * The sync tasks stay running to monitor Ethereum for changes.
 */
let syncPush = async () => {

    let config:any = await ProcessConfig.getSyncPushConfig() 

    if (!config) {
      throw new Error("No configuration found.")
    }

    if (!config?.repos || config.repos.length == 0) {
      throw new Error("No repositories configured.")
    }


    let spawnService:SpawnService = new SpawnService()
  
    console.log('Starting Sync/Push...')
    
    for (let repo of config.repos) {

      const syncDirectory = path.resolve(config.baseDir, repo)
  

      //TODO only generate if there's been a version change.
      // await spawnService.spawnGenerate(syncDirectory)

    }



    async function runLoop(){

      console.log('Starting sync/push/deploy loop')

      for (let repo of config.repos) {

        const syncDirectory = path.resolve(config.baseDir, repo)

        //Sync
        await spawnService.spawnSync(syncDirectory)

        //Push
        const git = simpleGit(syncDirectory)

        try {
  
            let status = await git.status()
  
            let branch = status.current
  
            let isClean = status.isClean()
  
            if (!isClean) {
                
                console.log(`Files have been changed in ${syncDirectory}`)
                
                await git.add('./')
                await git.commit('Committing changes')
                await git.push('origin', branch)
  
                //Deploy
                await spawnService.spawnDeploy(syncDirectory)
  
            } else {
                console.log(`No changes in ${syncDirectory}`)
            }
  
        } catch(ex) {
            console.error(`Error checking git status in ${syncDirectory}:`, ex)
        }
  
      }

      setTimeout(runLoop, config.syncRate) 

    }


    runLoop()


}

syncPush()

export default syncPush