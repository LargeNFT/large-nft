import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'

import { Container } from "inversify"

import { getMainContainer, GetMainContainerCommand } from "./node-inversify.config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"


import { TransactionIndexerService } from "./service/core/transaction-indexer-service.js"
import { WalletService } from "./service/core/wallet-service.js"
import { ProcessConfig } from "./util/process-config.js"
import { SchemaService } from "./service/core/schema-service.js"


import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const PouchDB = require('pouchdb-node')
PouchDB.plugin(require("pouchdb-find"))
PouchDB.plugin(require('pouchdb-quick-search'))


let channelId



let sync = async () => {

  let config:any = await ProcessConfig.getConfig() 

  if (!config.alchemy) {
    throw new Error("No ethereum connection configured.")
  }


  let contract = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract.json`, 'utf8'))
  let contractAbi = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract-abi.json`, 'utf8'))



  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })


  function contracts() {
    if (!contract.contractAddress) return []

    //Override address
    contractAbi['Channel'].address = contract.contractAddress

    return contractAbi
  }

  container.bind("contracts").toConstantValue(contracts())
  container.bind("PouchDB").toConstantValue(PouchDB)


  let command:GetMainContainerCommand = {
    customContainer: container,
    baseDir: config.baseDir,
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: config.alchemy
  }

  container = await getMainContainer(command)


  //Verify we have an ethereum connection
  let walletService:WalletService = container.get("WalletService")
  await walletService.initProvider()

  console.log(`Provider initialized`)


  let channelWebService: ChannelWebService = container.get("ChannelWebService")
  let schemaService: SchemaService = container.get("SchemaService")

  //Get channel
  let channelViewModel = await channelWebService.get(0)

  channelId = channelViewModel.channel._id

  fs.mkdirSync(`./pouch/${channelId}/erc-events`, { recursive: true })
  fs.mkdirSync(`./pouch/${channelId}/contract-states`, { recursive: true })

  await schemaService.load(["erc-events", "contract-states"])

  console.log(`Schema loaded`)



  

  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")


  const INDEX_RATE = 30*1000 //Every 30 seconds

  let channelContract = await walletService.getContract("Channel")




  //Start the transaction indexer
  async function runTransactionIndexer(){
      await transactionIndexerService.init(channelContract)
      await transactionIndexerService.index()
      setTimeout(runTransactionIndexer, INDEX_RATE) 
  }
  
  runTransactionIndexer()

}



sync()



