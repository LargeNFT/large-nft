import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'

import { Container } from "inversify"

import { getMainContainer } from "./node-inversify.config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"


import { TransactionIndexerService } from "./service/core/transaction-indexer-service.js"
import { WalletService } from "./service/core/wallet-service.js"
import { ProcessConfig } from "./util/process-config.js"


let channelId



let sync = async () => {

  let config:any = await ProcessConfig.getConfig() 

  console.log(config)

  let contract = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract.json`, 'utf8'))
  let contractAbi = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract-abi.json`, 'utf8'))



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






  container = await getMainContainer(container, config.baseURL, config.hostname, config.baseDir)

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



