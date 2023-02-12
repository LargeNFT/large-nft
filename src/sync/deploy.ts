import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { ProcessConfig } from "../reader/util/process-config.js"
import { SpawnService } from "./service/spawn-service.js"


/**
 * Deploy is called by Sync-Push from an npm script in the reader. 
 * Called after detecting a change in the git repo. Push ./public to wherever it needs to go.
 */
let deploy = async () => {

    let config:any = await ProcessConfig.getDeployConfig() 

    if (!config) {
      throw new Error("No configuration found.")
    }

    let spawnService:SpawnService = new SpawnService()
  
    console.log('Starting Deploy...')
   
    //Currently this is getting tied to Google Cloud but in the future this will allow any service to be configured. 
    await spawnService.spawnGoogleCloudSync(
        config.baseDir, 
        config.deploy.googleCloud.bucketName, 
        config.deploy.googleCloud.destinationDir

    )


}

deploy()

export default deploy