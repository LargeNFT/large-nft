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


    async spawnGenerate(dir:string, args?:[]) {        

        let theArgs = ["--"]

        if (args) {
            theArgs.push(...args)
        } else {
            theArgs.push(...process.argv?.slice(2))
        }

        await this.runProcess(spawn(`npm run generate`, theArgs, { shell: true, cwd: dir }))

    }


    async spawnGenerateAfter(dir:string, args?:[]) {        

        let theArgs = ["--"]

        if (args) {
            theArgs.push(...args)
        } else {
            theArgs.push(...process.argv?.slice(2))
        }

        await this.runProcess(spawn(`npm run generate:after`, theArgs, { shell: true, cwd: dir }))

    }


    async spawnSync(dir:string, args?:string[]) {       
        

        let theArgs = ["--"]

        if (args) {
            theArgs.push(...args)
        } else {
            theArgs.push(...process.argv?.slice(2))
        }

        await this.runProcess(spawn(`npm run sync`, theArgs, { shell: true, cwd: dir }))


    }

    async spawnGenerateAndSync(dir:string, args?:[]) {

        // Generate HTML
        await this.spawnGenerate(dir, args)
        return this.spawnSync(dir, args)

    }




    async spawnGoogleCloudSync(dir:string, bucketName:string, destinationDir:string, args?:[]){        

        await this.runProcess(spawn(`gsutil -m cp -R -Z * gs://${bucketName}/${destinationDir}/public`, [], { shell: true, cwd: `${dir}/public` }))

        //Cache images for a year
        await this.runProcess(spawn(`gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, no-transform" gs://${bucketName}/${destinationDir}/public/**.webp`, [], { shell: true, cwd: `${dir}/public` }))
        await this.runProcess(spawn(`gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, no-transform" gs://${bucketName}/${destinationDir}/public/**.jpg`, [], { shell: true, cwd: `${dir}/public` }))
        await this.runProcess(spawn(`gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, no-transform" gs://${bucketName}/${destinationDir}/public/**.svg`, [], { shell: true, cwd: `${dir}/public` }))

        //Cache javascript for a year
        await this.runProcess(spawn(`gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, no-transform" gs://${bucketName}/${destinationDir}/public/**.js`, [], { shell: true, cwd: `${dir}/public` }))


    }


    async spawnGoogleCloudCopy(dir:string, filepaths:string[], bucketName:string, destinationDir:string): Promise<void> {        

        let commands = []

        for (let filepath of filepaths) {
            filepath = filepath.replace("public/", "")
            commands.push(`gsutil -m cp -Z ${filepath} gs://${bucketName}/${destinationDir}/public/${filepath}`)
        }

        let chunks = []

        const chunkSize = 100

        for (let i = 0; i < commands.length; i += chunkSize) {
            chunks.push(commands.slice(i, i + chunkSize))
        }


        for (let chunk of chunks) {

            let cmd = ""

            for (let command of chunk) {
                cmd += `${command} & `
            }

            await this.runProcess(spawn(cmd, [], { shell: true, cwd: `${dir}/public` }))

        }

    }


}


export {
    SpawnService
}

