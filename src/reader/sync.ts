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
import { ERCEvent } from "./dto/erc-event.js"
import { TokenOwnerService } from "./service/token-owner-service.js"
import { ERCEventService } from "./service/erc-event-service.js"
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

  await schemaService.load(["erc-events", "contract-states", "token-owners", "items", "transactions"])

  console.log(`Schema loaded`)



  

  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")
  let tokenOwnerService:TokenOwnerService = container.get("TokenOwnerService")
  let ercEventService: ERCEventService = container.get("ERCEventService")


  const INDEX_RATE = 30*1000 //Every 30 seconds

  let channelContract = await walletService.getContract("Channel")




  //Start the transaction indexer
  async function runTransactionIndexer(){

      await transactionIndexerService.init(channelContract)

      let events:ERCEvent[]

      try {
        events = await transactionIndexerService.index()
      } catch(ex) { console.log(ex) }


      console.log(`${events?.length} events processed. Generating JSON.`)


      if (!fs.existsSync(`${config.publicPath}/sync/events`)) {
        fs.mkdirSync(`${config.publicPath}/sync/events`, { recursive: true })
      }

      if (!fs.existsSync(`${config.publicPath}/sync/tokenEvents`)) {
        fs.mkdirSync(`${config.publicPath}/sync/tokenEvents`, { recursive: true })
      }

      if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner`)) {
        fs.mkdirSync(`${config.publicPath}/sync/tokenOwner`, { recursive: true })
      }

      if (events?.length > 0) {

        for (let event of events) {

          console.log(`Generating JSON for ${event._id}`)


          let clonedEvent = JSON.parse(JSON.stringify(event))
          delete clonedEvent._rev 
          delete clonedEvent['_rev_tree']

          fs.writeFileSync(`${config.publicPath}/sync/events/${clonedEvent._id}.json`, Buffer.from(JSON.stringify(clonedEvent)))

          //Save id of latest event for token
          if (event.tokenId) {
            fs.writeFileSync(`${config.publicPath}/sync/tokenEvents/${event.tokenId}-latest.json`, Buffer.from(JSON.stringify({
              _id: event._id
            })))
          }

          if (event.fromAddress) {
            let fromTokenOwner = await tokenOwnerService.get(event.fromAddress)
            fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${fromTokenOwner._id}.json`, Buffer.from(JSON.stringify(fromTokenOwner)))
          }

          if (event.toAddress) {
            let toTokenOwner = await tokenOwnerService.get(event.toAddress)
            fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${toTokenOwner._id}.json`, Buffer.from(JSON.stringify(toTokenOwner)))
          }

        }
  
        let mostRecent:ERCEvent = await ercEventService.getLatest()
  
        //Save id of latest event overall
        fs.writeFileSync(`${config.publicPath}/sync/events/latest.json`, Buffer.from(JSON.stringify({
          _id: mostRecent._id
        })))


      }




      setTimeout(runTransactionIndexer, INDEX_RATE) 
  }
  
  runTransactionIndexer()

}



sync()



