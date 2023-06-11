import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

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
import { PublishService } from "./service/core/publish-service.js"
import { BackupBundle, ExportBundle } from "./dto/export-bundle.js"
import { ExportService } from "./service/core/export-service.js"
import { ChannelService } from "./service/channel-service.js"
import path from "path"

let importCollection = async () => {

  let config: any = await ProcessConfig.getImportConfig()

  if (!config.contract) {
    throw new Error("No contract specified")
  }

  if (!config.slug) {
    throw new Error("Specify a collection slug (aka alice-in-wonderland)")
  }

  if (!fs.existsSync(`${config.baseDir}/data/pouch`)) {
    fs.mkdirSync(`${config.baseDir}/data/pouch`, { recursive: true })
  }

  if (!fs.existsSync(`${config.baseDir}/sync/${config.slug}`)) {
    fs.mkdirSync(`${config.baseDir}/sync/${config.slug}`, { recursive: true })
  }

  if (config.alchemy) {

    let container = await getMainContainer(config)

    let importService:ImportService = container.get(ImportService)
    let publishService:PublishService = container.get(PublishService)
    let exportService:ExportService = container.get(ExportService)
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
    } catch(ex) {}

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

    console.log(`Exporting ${channel.title} to sync folder...`)


    channel.showActivityPage = false
    channel.showMintPage = false
    channel.productionHostname = config.hostname
    channel.productionBaseURI = `/r/${config.slug}`


    //Export 
    let exportBundle:ExportBundle = await exportService.prepareExport(channel, walletService.address)
    let backup:BackupBundle = await exportService.createBackup(exportBundle)


    let feeRecipient = await publishService.getFeeReceipient(exportBundle)

    await publishService.exportToIPFS(exportBundle, backup, feeRecipient)

    let fsActions = await publishService.exportToFS(config.baseDir, channel, exportBundle, backup, feeRecipient)

    let collectionDir = `${config.baseDir}/sync/${config.slug}`

    for (let action of fsActions) {

      if (!fs.existsSync(path.dirname(`${collectionDir}${action.file_path}`))) {
        fs.mkdirSync(path.dirname(`${collectionDir}${action.file_path}`), { recursive: true })
      }

      fs.writeFileSync(`${collectionDir}${action.file_path}`, action.content)
    }

    //Update large-config with library info.
    let buffer = fs.readFileSync(`${collectionDir}/large-config.json`)

    let largeConfig = JSON.parse(buffer.toString())

    largeConfig.libraryURL = config.libraryURL
    largeConfig.largeURL = config.largeURL

    fs.writeFileSync(`${collectionDir}/large-config.json`, Buffer.from(JSON.stringify(largeConfig)))

  } else {
    console.log("No ethereum connection configured.")

  }




}


importCollection()

export default importCollection


