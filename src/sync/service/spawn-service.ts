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

    // async spawnDeploy(dir:string, args?:[]): Promise<ChildProcess> {        

    //     return new Promise(function(resolve, reject) {

    //         let theArgs = ["--"]

    //         if (args) {
    //             theArgs.push(...args)
    //         } else {
    //             theArgs.push(...process.argv?.slice(2))
    //         }
    
    //         let deployProcess = spawn(`npm run deploy`, theArgs, { shell: true, cwd: dir })
      
    //         deployProcess.stdout.on('data', (data) => {
    //           process.stdout.write(data.toString())
    //         })
              
    //         deployProcess.stderr.on('data', (data) => {
    //           process.stderr.write(data.toString())
    //         })
    
    //         deployProcess.on('close', (code) => {
    //             console.log(`Deploy process exited with code ${code}`)
    //             resolve(deployProcess)
    //         })

    //         return deployProcess

    //     })

    // }


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

            let rsyncProcess = spawn(`gsutil -m cp -R -J * gs://${bucketName}/${destinationDir}/public`, [], { shell: true, cwd: `${dir}/public` })
  
            rsyncProcess.stdout.on('data', (data) => {
              process.stdout.write(data.toString())
            })
              
            rsyncProcess.stderr.on('data', (data) => {
              process.stderr.write(data.toString())
            })
    
            rsyncProcess.on('close', (code) => {
                console.log(`Google cp process exited with code ${code}`)
                resolve(rsyncProcess)
            })

        })

    }


    async spawnGoogleCloudCopy(dir:string, filepaths:string[], bucketName:string, destinationDir:string): Promise<void> {        

        let commands = []

        for (let filepath of filepaths) {
            filepath = filepath.replace("public/", "")
            commands.push(`gsutil -m cp -J ${filepath} gs://${bucketName}/${destinationDir}/public/${filepath}`)
        }

        let chunks = []

        const chunkSize = 100

        for (let i = 0; i < commands.length; i += chunkSize) {
            chunks.push(commands.slice(i, i + chunkSize))
        }

        const runCommand = async (cmd) => {

            return new Promise(function(resolve, reject) {
    
                let p = spawn(cmd, [], { shell: true, cwd: `${dir}/public` })
    
                p.stdout.on('data', (data) => {
                    process.stdout.write(data.toString())
                })
                
                p.stderr.on('data', (data) => {
                    process.stderr.write(data.toString())
                })
    
                p.on('close', (code) => {
                    resolve(p)
                })
            })

        }

        for (let chunk of chunks) {

            let cmd = ""

            for (let command of chunk) {
                cmd += `${command} & `
            }

            await runCommand(cmd)

        }

    }


}


export {
    SpawnService
}

