import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'

import { Container } from "inversify"

import { getMainContainer, GetMainContainerCommand } from "./node-inversify.config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"


import { ERCIndexResult, TransactionIndexerService } from "./service/core/transaction-indexer-service.js"
import { WalletService } from "./service/core/wallet-service.js"
import { ProcessConfig } from "./util/process-config.js"
import { SchemaService } from "./service/core/schema-service.js"


import { createRequire } from 'module'
import { ERCEvent } from "./dto/erc-event.js"
import { TokenOwnerService } from "./service/token-owner-service.js"
import { ERCEventService } from "./service/erc-event-service.js"
import { TokenOwner } from "./dto/token-owner.js"
import { TokenOwnerPageService } from "./service/token-owner-page-service.js"
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

  await schemaService.load(["erc-events", "contract-states", "token-owners", "items", "transactions", "blocks"])

  console.log(`Schema loaded`)



  

  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")
  let tokenOwnerService:TokenOwnerService = container.get("TokenOwnerService")
  let ercEventService: ERCEventService = container.get("ERCEventService")
  let tokenOwnerPageService: TokenOwnerPageService = container.get("TokenOwnerPageService")

  

  const INDEX_RATE = 30*1000 //Every 30 seconds

  let channelContract = await walletService.getContract("Channel")




  //Start the transaction indexer
  async function runTransactionIndexer(){

      await transactionIndexerService.init(channelContract)

      let indexResult:ERCIndexResult

      try {
        indexResult = await transactionIndexerService.index()
      } catch(ex) { console.log(ex) }


      console.log(`${indexResult.eventsToUpdate?.length} events processed. Generating JSON.`)


      if (!fs.existsSync(`${config.publicPath}/sync/events`)) {
        fs.mkdirSync(`${config.publicPath}/sync/events`, { recursive: true })
      }

      if (!fs.existsSync(`${config.publicPath}/sync/tokenEvents`)) {
        fs.mkdirSync(`${config.publicPath}/sync/tokenEvents`, { recursive: true })
      }

      if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner`)) {
        fs.mkdirSync(`${config.publicPath}/sync/tokenOwner`, { recursive: true })
      }


      console.log(`${indexResult.eventsToUpdate?.length} events to update. Writing files.`)
      console.log(`${indexResult.tokensToUpdate?.size} tokens to update. Writing files.`)
      console.log(`${Object.keys(indexResult.ownersToUpdate).length} owners to update. Writing files.`)



      //eventsToUpdate is not guaranteed to be sorted in any particular order.
      if (indexResult.eventsToUpdate?.length > 0) {

        for (let event of indexResult.eventsToUpdate) {

          console.log(`Generating JSON for ${event._id}`)

          //Write to file
          writeEventToFile(event)

        }
  
        //Write changed tokens to file
        for (let tokenId of indexResult.tokensToUpdate) {
          let latestByToken = await ercEventService.getLatestByTokenId(tokenId)
          fs.writeFileSync(`${config.publicPath}/sync/tokenEvents/${tokenId}-latest.json`, Buffer.from(JSON.stringify({
            _id: latestByToken._id
          })))
        }

        //Write changed owners to file
        for (let owner of Object.keys(indexResult.ownersToUpdate)) {
          fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${indexResult.ownersToUpdate[owner]._id}.json`, Buffer.from(JSON.stringify(indexResult.ownersToUpdate[owner])))
        }

        //Save id of latest event overall
        let mostRecent:ERCEvent = await ercEventService.getLatest()
  
        fs.writeFileSync(`${config.publicPath}/sync/events/latest.json`, Buffer.from(JSON.stringify({
          _id: mostRecent._id
        })))

      }



      //Write token owner pages to files

      //Generate token owner pages for leaderboard
      let tokenOwners:TokenOwner[] = await tokenOwnerService.list(100000, 0)

      let tokenOwnerPages = await tokenOwnerPageService.buildTokenOwnerPages(tokenOwners, 100)


      let pageCount = 0
      await fs.promises.mkdir(`${config.publicPath}/sync/tokenOwner/pages`, { recursive: true })

      for (let tokenOwnerPage of tokenOwnerPages) {
        // console.log(`Writing item page: public/itemPages/${pageCount}.json`)
        await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`, JSON.stringify(tokenOwnerPage))
        pageCount++
      }

      await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/total.json`, JSON.stringify({
        totalPages: tokenOwnerPages.length,
        totalRecords: tokenOwners.length
      }))


      setTimeout(runTransactionIndexer, INDEX_RATE) 



    function writeEventToFile(event: ERCEvent) {
      
      let clonedEvent = JSON.parse(JSON.stringify(event))
      delete clonedEvent._rev
      delete clonedEvent['_rev_tree']

      fs.writeFileSync(`${config.publicPath}/sync/events/${clonedEvent._id}.json`, Buffer.from(JSON.stringify(clonedEvent)))
    }


  }
  
  runTransactionIndexer()

}



sync()



