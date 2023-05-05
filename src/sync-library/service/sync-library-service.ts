import { inject, injectable } from "inversify"
import fs from "fs"
import path from "path";


import { SyncStatusRepository } from "../repository/sync-status-repository.js"
import { FileStatus, SyncStatus } from "../dto/sync-status.js"
import { SpawnService } from "../../sync/service/spawn-service.js";
import { SyncStatusService } from "./sync-status-service.js";
import { Channel } from "../dto/channel.js";
import { LibraryChannelService } from "./library-channel-service.js";
import { ChannelValue } from "../repository/node/library-channel-repository-impl.js";


@injectable()
class SyncLibraryService {

    @inject("SpawnService")
    private spawnService: SpawnService

    @inject("SyncStatusService")
    private syncStatusService: SyncStatusService

    @inject("LibraryChannelService")
    private libraryChannelService: LibraryChannelService

    @inject("sequelize")
    private sequelize:Function


    constructor() { }

    async syncAndGenerateChannel(slug, reader, args, config) {

        let s = await this.sequelize()

        const syncDirectory = path.resolve(config.syncDir, reader.repo)

        let publicPath = `${syncDirectory}/public`
    
        await s.transaction(async (t1) => {
    
          let options = { transaction: t1 }
    
          //Get current sync status
          let syncStatus:SyncStatus = await this.syncStatusService.getOrCreate(slug, options)
    
          if (config.generate) {
            await this.spawnService.spawnGenerate(process.env.INIT_CWD, syncDirectory, args)
          } 
    
          await this.spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)
    
    
          //Load totals
          if (!reader.domain) {
            await this.updateChannelTotals(publicPath, slug, options)
          }
    
    
          if (config.env == "production") {
            //Save new sync status
            await this.syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)
          }
      
          syncStatus.lastModified = new Date()
    
          await this.syncStatusService.put(syncStatus, options)
    
    
        })

    }

    async syncChannel(slug, reader, config) {

      let s = await this.sequelize()

      const syncDirectory = path.resolve(config.syncDir, reader.repo)

      //Remove clear
      let args = process.argv?.slice(2)

      let indexOfClear = args.indexOf("--clear")

      if (indexOfClear > -1) {
        args.splice(indexOfClear, 2)
      }

      args.push("--sync-rate")
      args.push("0")


      let publicPath = `${syncDirectory}/public`

      await s.transaction(async (t1) => {

        let options = { transaction: t1 }
  
        let syncStatus:SyncStatus = await this.syncStatusService.getOrCreate(slug, options)

        await this.spawnService.spawnSync(process.env.INIT_CWD, syncDirectory, args)
  
        //Load totals
        if (!reader.domain) {
          await this.updateChannelTotals(publicPath, slug, options)
        }

        //Save new sync status
        if (config.env == "production") {
          await this.syncStatusService.handleChangedFiles(slug, publicPath, syncStatus?.lastModified)
        }


        syncStatus.lastModified = new Date()
  
        await this.syncStatusService.put(syncStatus, options)
  
      })


    }

    async updateChannelTotals(publicPath: string, slug: string, options:any) {

        let channel: Channel = await this.libraryChannelService.getOrCreate(slug, options)
        
        channel.totals = JSON.parse(fs.readFileSync(`${publicPath}/sync/sales/overall.json`).toString())
        channel.latest = JSON.parse(fs.readFileSync(`${publicPath}/sync/transactions/latest.json`).toString())

        let info = JSON.parse(fs.readFileSync(`${publicPath}/backup/export/backup/channels.json`).toString())[0]

        channel.title = info.title
        channel.descriptionHTML = info.descriptionHTML
        channel.itemCount = info.itemCount
        channel.coverImageId = info.coverImageId
        channel.symbol = info.symbol



        await this.libraryChannelService.put(channel, options)
    
    }

    async updateLibraryHome(syncDir: string) {

        let s = await this.sequelize()

        await s.transaction(async (t1) => {

            let options = { transaction: t1 }

            let channelList:ChannelValue[] = await this.libraryChannelService.listByValue(options)

            //Write file to library folder
            fs.writeFileSync(`${syncDir}/l/home.json`, JSON.stringify(channelList))

        })

    }

}



export {
    SyncLibraryService
}

