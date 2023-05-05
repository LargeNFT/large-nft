import packageConfig from "../../../package.json"
import baseConfig from '../base-config.json'
import fs from "fs"
import arg from 'arg'


class ProcessConfig {

    static async getConfig(config?:any) {

        let theArgs = ProcessConfig.parseArgumentsIntoOptions(process.argv)

        //A config object can be passed in. If not we will load large-config.json from the baseDir
        if (!config) {
            config = JSON.parse(fs.readFileSync(`${theArgs.channelDir ? theArgs.channelDir : "."}/large-config.json`, 'utf8'))
        }

        config.channelDir = theArgs.channelDir
        config.runDir = process.env.INIT_CWD ? process.env.INIT_CWD : config.channelDir

        config.publicPath = `${config.channelDir}/public`
        config.VERSION = packageConfig.version

        if (theArgs.env == "dev") {

            config.hostname = config?.env?.dev?.hostname || baseConfig.hostname
            config.baseURL = config?.env?.dev?.baseURL || baseConfig.baseURL
            config.libraryURL = config?.env?.dev?.libraryURL || config?.libraryURL 
            config.largeURL = config?.env?.dev?.largeURL || config?.largeURL 

            config.maxItems = baseConfig.maxItems

        } else {

            //Set base URL
            if (!config.baseURL) {
                config.baseURL = baseConfig.baseURL
            }

            //Set hostname
            if (!config.hostname) {
                config.hostname = baseConfig.hostname
            }

            //Set max items
            if (!config.maxItems) {
                config.maxItems = baseConfig.maxItems
            }

        }

        //Create marketplace config from base config + anything set in config
        if (config.marketplaces?.length > 0) {
            for (let marketplace of config.marketplaces) {

                //Look it up in base config
                let matches = baseConfig.marketplaces.filter(m => m.name == marketplace.name)

                if (matches?.length > 0) {

                    //Set asset link
                    if (!marketplace.assetLink) {
                        marketplace.assetLink = matches[0].assetLink
                    }

                    if (!marketplace.link) {
                        marketplace.link = matches[0].link
                    }

                }

            }
        }

        config.alchemy = theArgs.alchemy
        config.syncRate = theArgs.syncRate
        config.syncDir = theArgs.syncDir
        config.env = theArgs.env
        config.clear = theArgs.clear

        return config

    }

    static parseArgumentsIntoOptions(rawArgs) {

        const args = arg(
        {
            '--env': String,
            '--alchemy': String,
            '--sync-rate': String,
            '--sync-dir': String,
            '--channel-dir': String,
            '--clear': String,
            '--generate': String
        },
        {
            argv: rawArgs.slice(2),
        }
        )
    
        return {
            env: args['--env'] || "production",
            alchemy: args['--alchemy'] || "",
            syncRate: args['--sync-rate'] ? parseInt(args['--sync-rate'] ) : 30*1000,
            syncDir: args['--sync-dir'] || "",
            channelDir: args['--channel-dir'] || ".",
            clear:  args['--clear'] == "true"
        }
    
    }
    

    static getSyncLibraryConfig(config?:any) {

        let theArgs = ProcessConfig.parseSyncLibraryArgsIntoOptions(process.argv)

        let baseDir = theArgs.syncDir ? theArgs.syncDir : process.env.INIT_CWD      
        if (!baseDir) baseDir = "."

      
        if (!baseDir) {
            throw new Error("No base directory configured. Use --sync-dir flag on CLI.")
        }


        //A config object can be passed in. If not we will load large-config.json from the baseDir
        if (!config) {
            config = JSON.parse(fs.readFileSync(`${baseDir}/large-config.json`, 'utf8'))
        }

        config.VERSION = packageConfig.version
        config.baseDir = baseDir
        config.generate = theArgs.generate
        config.env = theArgs.env
        config.clear = theArgs.clear
        config.syncPushRate = theArgs.syncPushRate

        return config
        
    }


    static parseSyncLibraryArgsIntoOptions(rawArgs) {

        const args = arg(
        {
            '--sync-dir': String,
            '--env': String,
            '--alchemy': String,
            '--clear': String,
            '--generate': String,
            '--sync-push-rate': String
        },
        {
            argv: rawArgs.slice(2),
        }
        )
    
        return {
            syncDir: args['--sync-dir'] || "",
            env: args['--env'] || "production",
            alchemy: args['--alchemy'] || "",
            clear:  args['--clear'] == "true",
            generate:  args['--generate'] == "true",
            syncPushRate: args['--sync-push-rate'] ? parseInt(args['--sync-push-rate'] ) : 30*1000,
        }
    
    }
















    // static getDeployConfig(config?:any) {

    //     let theArgs = ProcessConfig.parseDeployArgsIntoOptions(process.argv)

    //     let baseDir = theArgs.dir ? theArgs.dir : process.env.INIT_CWD
      
    //     if (!baseDir) baseDir = "."
      

    //     //A config object can be passed in. If not we will load large-config.json from the baseDir
    //     if (!config) {
    //         config = JSON.parse(fs.readFileSync(`${baseDir}/large-config.json`, 'utf8'))
    //     }

    //     config.VERSION = packageConfig.version
    //     config.baseDir = baseDir
        
    //     return config
        
    // }


    // static parseDeployArgsIntoOptions(rawArgs) {

    //     const args = arg(
    //     {
    //         '--dir': String,
    //         '--sync-dir': String,
    //         '--sync-rate': String,
    //         '--alchemy': String,
    //         '--clear': String
    //     },
    //     {
    //         argv: rawArgs.slice(2),
    //     }
    //     )
    
    //     return {
    //         dir: args['--dir'] || "",
    //     }
    
    // }



}

export {
    ProcessConfig
}