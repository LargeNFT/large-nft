import { inject, injectable } from "inversify"

import { spawn, ChildProcess, exec } from 'child_process'

@injectable()
class SpawnService {

    constructor() {}


    async spawnGenerate(dir:string, args?:[]): Promise<ChildProcess> {        


        return new Promise(function(resolve, reject) {

            let theArgs = ["--"]

            if (args) {
                theArgs.push(...args)
            } else {
                theArgs.push(...process.argv?.slice(2))
            }
    
            let generateProcess = spawn(`npm run generate`, theArgs, { shell: true, cwd: dir })
      
            generateProcess.stdout.on('data', (data) => {
              process.stdout.write(data.toString())
            })
              
            generateProcess.stderr.on('data', (data) => {
              process.stderr.write(data.toString())
            })
    
            generateProcess.on('close', (code) => {
                console.log(`Generate process exited with code ${code}`)
                resolve(generateProcess)
            })

        })



    }


    async spawnGenerateAfter(dir:string, args?:[]): Promise<ChildProcess> {        

        return new Promise(function(resolve, reject) {

            let theArgs = ["--"]

            if (args) {
                theArgs.push(...args)
            } else {
                theArgs.push(...process.argv?.slice(2))
            }
    
            let generateAfterProcess = spawn(`npm run generate:after`, theArgs, { shell: true, cwd: dir })
      
            generateAfterProcess.stdout.on('data', (data) => {
              process.stdout.write(data.toString())
            })
              
            generateAfterProcess.stderr.on('data', (data) => {
              process.stderr.write(data.toString())
            })
    
            generateAfterProcess.on('close', (code) => {
                console.log(`Generate:after process exited with code ${code}`)
                resolve(generateAfterProcess)
            })

        })


    }

    async spawnDeploy(dir:string, args?:[]): Promise<ChildProcess> {        

        return new Promise(function(resolve, reject) {

            let theArgs = ["--"]

            if (args) {
                theArgs.push(...args)
            } else {
                theArgs.push(...process.argv?.slice(2))
            }
    
            let deployProcess = spawn(`npm run deploy`, theArgs, { shell: true, cwd: dir })
      
            deployProcess.stdout.on('data', (data) => {
              process.stdout.write(data.toString())
            })
              
            deployProcess.stderr.on('data', (data) => {
              process.stderr.write(data.toString())
            })
    
            deployProcess.on('close', (code) => {
                console.log(`Deploy process exited with code ${code}`)
                resolve(deployProcess)
            })

            return deployProcess

        })

    }


    async spawnSync(dir:string, args?:[]): Promise<ChildProcess> {       
        

        return new Promise(function(resolve, reject) {

            let theArgs = ["--"]

            if (args) {
                theArgs.push(...args)
            } else {
                theArgs.push(...process.argv?.slice(2))
            }
    
            let syncProcess = spawn(`npm run sync`, theArgs, { shell: true, cwd: dir })
      
            syncProcess.stdout.on('data', (data) => {
                process.stdout.write(data.toString())
            })
            
            syncProcess.stderr.on('data', (data) => {
                process.stderr.write(data.toString())
            })
    
            syncProcess.on('close', (code) => {
                console.log(`Sync process exited with code ${code}`)
                resolve(syncProcess)
            })

        })


    }

    async spawnGenerateAndSync(dir:string, args?:[]) {

        // Generate HTML
        await this.spawnGenerate(dir, args)
        return this.spawnSync(dir, args)

    }


    async spawnGoogleCloudSync(dir:string, bucketName:string, destinationDir:string, args?:[]): Promise<ChildProcess> {        

        return new Promise(function(resolve, reject) {

            let rsyncProcess = spawn(`gsutil -m rsync $* -r ${dir}/public gs://${bucketName}/${destinationDir}`, [], { shell: true, cwd: dir })
  
            rsyncProcess.stdout.on('data', (data) => {
              process.stdout.write(data.toString())
            })
              
            rsyncProcess.stderr.on('data', (data) => {
              process.stderr.write(data.toString())
            })
    
            rsyncProcess.on('close', (code) => {
                console.log(`Google rsync process exited with code ${code}`)
                resolve(rsyncProcess)
            })

        })





    }


}


export {
    SpawnService
}

