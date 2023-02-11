import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { getMainContainer, GetMainContainerCommand } from "../sync/inversify.config.js"



import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

import { ProcessConfig } from "./util/process-config.js"
import { SpawnService } from "../sync/service/spawn-service.js"
import { Container } from "inversify"

let start = async () => {

  let config:any = await ProcessConfig.getConfig() 

  let container = new Container()
  
  let command:GetMainContainerCommand = {
    customContainer: container,
    baseDir: config.baseDir,
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: config.alchemy
  }
  
  
  container = await getMainContainer(command)


  let spawnService:SpawnService = await container.get("SpawnService")



  console.log('Generating reader...')
  
  // Generate HTML
  await spawnService.spawnGenerateAndSync(config.baseDir)
    
  console.log(`${config.baseDir}/public`)
  
  //Start web server
  fastify.register(require('@fastify/static'), {
    root: `${config.baseDir}/public`
  })

  const port = process.env.PORT ? parseInt(process.env.port) : 8081

  fastify.listen({ port: port }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
  })

}

start()

export default start