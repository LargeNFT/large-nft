import { inject, injectable } from "inversify"

import { spawn, ChildProcess, exec } from 'child_process'

@injectable()
class SpawnService {

    constructor() {}


    async spawnGenerate(dir:string, args?:[]): Promise<ChildProcess> {        

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

        return generateProcess

    }


    async spawnGenerateAfter(dir:string, args?:[]): Promise<ChildProcess> {        

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

        return generateAfterProcess

    }



    async spawnSync(dir:string, args?:[]): Promise<ChildProcess> {       
        
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

        return syncProcess

    }

    async spawnGenerateAndSync(dir:string) {

        // Generate HTML
        let generateProcess = await this.spawnGenerate(dir)
            
        generateProcess.on('close', (code) => {
        
            console.log(`Generate process exited with code ${code}`)
        
            //Start sync
            return this.spawnSync(dir)
            
        })

    }

}


export {
    SpawnService
}

