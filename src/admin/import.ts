import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import { getMainContainer } from "./import-inversify.config.js"

import { ProcessConfig } from "../reader/util/process-config.js"
import { ImportService } from "./service/core/import-service.js"
import { WalletService } from "./service/core/wallet-service.js"
import TYPES from "./service/core/types.js"
import { SchemaService } from "./service/core/schema-service.js"
import { IpfsService } from "./service/core/ipfs-service.js"
import { SettingsService } from "./service/core/settings-service.js"
import { Settings } from "./dto/settings.js"
import fs from "fs"

import { ChannelService } from "./service/channel-service.js"

let importCollection = async () => {

  let config: any = await ProcessConfig.getImportConfig()

  if (!config.contract) {
    throw new Error("No contract specified")
  }

  if (!config.alchemy) {
    throw new Error("Alchemy API key not specified")
  }



  if (!fs.existsSync(`${config.baseDir}/data/pouch`)) {
    fs.mkdirSync(`${config.baseDir}/data/pouch`, { recursive: true })
  }



  if (config.alchemy) {

    let container = await getMainContainer(config)

    let importService:ImportService = container.get(ImportService)
    let channelService:ChannelService = container.get(ChannelService)

    let walletService: WalletService = container.get(TYPES.WalletService)
    let schemaService: SchemaService = container.get(SchemaService)
    let ipfsService: IpfsService = container.get(IpfsService)
    let settingsService: SettingsService = container.get(SettingsService)

    //Verify we have an ethereum connection
    await walletService.initWallet()

    //Load schema
    await schemaService.load()

    let settings

    try {
      settings = await settingsService.get()
    } catch (ex) {}

    if (!settings) {
      settings = new Settings()
      settings.ipfsHost = '/ip4/127.0.0.1/tcp/5001'
      await settingsService.put(settings)
    }

    await ipfsService.init()

    let channelId 

    switch (config.forkType) {
  
      case "existing":
        channelId = await importService.importExistingFromContract(config.contract)
        break
    
      case "fork": 
        channelId = await importService.importAsForkFromContract(config.contract)
        break
  
    }


    let channel = await channelService.get(channelId)

    let slug = channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()

    if (!fs.existsSync(`${config.baseDir}/sync/${slug}`)) {
      fs.mkdirSync(`${config.baseDir}/sync/${slug}`, { recursive: true })
    }

    console.log(`Import complete: ${channelId}`)


  } else {
    console.log("No ethereum connection configured.")

  }




}


try {
  importCollection()
} catch(ex) {
  console.log(ex.message)
}


export default importCollection


