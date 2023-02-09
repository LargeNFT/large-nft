import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

const exec = require('child_process').exec
import { spawn } from "child_process"


import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

import { ProcessConfig } from "./util/process-config.js"

let start = async () => {

  let config:any = await ProcessConfig.getConfig()
    
  
  console.log('Generating reader...')
  
  
  // Generate HTML
  let generateProcess = spawn(`npm run generate`, ["--", ...process.argv?.slice(2)], { shell: true })
  
  generateProcess.stdout.on('data', (data) => {
    process.stdout.write(data.toString())
  })
    
  generateProcess.stderr.on('data', (data) => {
    process.stderr.write(data.toString())
  })
    
  generateProcess.on('close', (code) => {
  
    console.log(`Generate process exited with code ${code}`)
  
  
    //Start sync
    let syncProcess = spawn(`npm run sync`, ["--", ...process.argv?.slice(2)], { shell: true })
  
    syncProcess.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })
      
    syncProcess.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })
      
    syncProcess.on('close', (code) => {
      console.log(`Sync process exited with code ${code}`);
    })
  
  
    console.log(`${config.baseDir}/public`)
  
    //Start web server
    fastify.register(require('@fastify/static'), {
      root: `${config.baseDir}/public`
    })
  

    fastify.listen({ port: 8081 }, (err, address) => {
      if (err) throw err
      // Server is now listening on ${address}
    })


  })


}

start()

export default start