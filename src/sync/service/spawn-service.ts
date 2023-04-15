import { inject, injectable } from "inversify"

import { spawn, ChildProcess, exec } from 'child_process'

@injectable()
class SpawnService {

    constructor() {}


    async runProcess(p) {

        return new Promise(function(resolve, reject) {

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


    async spawnGenerateScript(dir:string) {        

        let theArgs = ["--"]

        theArgs.push(...process.argv?.slice(2))

        await this.runProcess(spawn(`npm run generate`, theArgs, { shell: true, cwd: dir }))

    }

    async spawnSyncScript(dir:string) {       
        
        let theArgs = ["--"]

        theArgs.push(...process.argv?.slice(2))

        await this.runProcess(spawn(`npm run sync`, theArgs, { shell: true, cwd: dir }))


    }


    async spawnGenerate(runDir: string, channelDir:string, args:string[]) {        
        
        args.push("--channel-dir")
        args.push(channelDir)

        await this.runProcess(spawn(`node ${runDir}/node_modules/large-nft/public/large/generate/index.js`, args, { shell: true, cwd: runDir }))

        // this.eventEmitter.emit("channel-generate", runDir, channelDir, args)

    }

    async spawnSync(runDir: string, channelDir:string, args:string[]) {       
    
        args.push("--channel-dir")
        args.push(channelDir)

        await this.runProcess(spawn(`node ${runDir}/node_modules/large-nft/public/large/sync/index.js`, args, { shell: true, cwd: runDir }))

        // this.eventEmitter.emit("channel-sync", runDir, channelDir, args)

    }


    
    async spawnGenerateAndSyncScripts(dir:string) {

        // Generate HTML
        await this.spawnGenerateScript(dir)
        await this.spawnSyncScript(dir)

    }


}


export {
    SpawnService
}

