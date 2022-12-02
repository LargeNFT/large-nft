import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'

import { Container } from "inversify"

// import PouchDB from 'pouchdb-node';


import { getMainContainer } from "./node-inversify.config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"
import { ChannelService } from "./service/channel-service.js"
import { ItemWebService } from "./service/web/item-web-service.js"
import { StaticPageService } from "./service/static-page-service.js"

import baseConfig from './base-config.json'



import { TransactionIndexerService } from "./service/core/transaction-indexer-service.js"
import { WalletService } from "./service/core/wallet-service.js"


let channelId


function parseArgumentsIntoOptions(rawArgs) {

  const args = arg(
    {
      '--dir': String,
      '--env': String
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    dir: args['--dir'] || "",
    env: args['--env'] || "production"
  }

}




let sync = async () => {

  let theArgs = parseArgumentsIntoOptions(process.argv)

  let baseDir = theArgs.dir ? theArgs.dir : process.env.INIT_CWD

  if (!baseDir) baseDir = "."

  let config = JSON.parse(fs.readFileSync(`${baseDir}/large-config.json`, 'utf8'))

  config.publicPath = `${baseDir}/public`

  if (theArgs.env == "dev") {

    config.hostname = baseConfig.hostname
    config.baseURL = baseConfig.baseURL
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

  let contract = JSON.parse(fs.readFileSync(`${baseDir}/backup/contract/contract.json`, 'utf8'))
  let contractAbi = JSON.parse(fs.readFileSync(`${baseDir}/backup/contract/contract-abi.json`, 'utf8'))

  console.log(config)



  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })

  container.bind("PouchDB").toConstantValue({})  
  // container.bind("PouchDB").toConstantValue(PouchDB)  

  function contracts() {
    if (!contract.contractAddress) return []

    //Override address
    contractAbi['Channel'].address = contract.contractAddress

    return contractAbi
  }

  container.bind("contracts").toConstantValue(contracts())






  container = await getMainContainer(container, config.baseURL, config.hostname, baseDir)

  let channelWebService: ChannelWebService = container.get("ChannelWebService")


  //Get channel
  let channelViewModel = await channelWebService.get(0)

  channelId = channelViewModel.channel._id

  

  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")
  let walletService:WalletService = container.get("WalletService")


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



