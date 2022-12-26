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
import { Transaction } from "./dto/transaction.js"
import { TransactionService } from "./service/transaction-service.js"
import { ProcessedTransactionService } from "./service/processed-transaction-service.js"
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

  await schemaService.load(["erc-events", "contract-states", "token-owners", "items", "transactions", "processed-transactions", "blocks", "tokens"])

  console.log(`Schema loaded`)



  

  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")
  let tokenOwnerService:TokenOwnerService = container.get("TokenOwnerService")
  let processedTransactionService: ProcessedTransactionService = container.get("ProcessedTransactionService")
  let tokenOwnerPageService: TokenOwnerPageService = container.get("TokenOwnerPageService")

  

  const INDEX_RATE = 30*1000 //Every 60 seconds

  let channelContract = await walletService.getContract("Channel")



  //Start the transaction indexer
  async function runTransactionIndexer(){

      await transactionIndexerService.init(channelContract)

      let indexResult:ERCIndexResult

      try {
        indexResult = await transactionIndexerService.index()

        createDirectories()

        console.log(`${Object.keys(indexResult.processedTransactionsToUpdate).length} transactions to update. Writing files.`)
        console.log(`${Object.keys(indexResult.tokensToUpdate).length} tokens to update. Writing files.`)
        console.log(`${Object.keys(indexResult.ownersToUpdate).length} owners to update. Writing files.`)



        //not guaranteed to be sorted in any particular order.
        if (Object.keys(indexResult.processedTransactionsToUpdate)?.length > 0) {

          
          //Write transactions to file
          console.log(`Writing ${Object.keys(indexResult.processedTransactionsToUpdate).length} transactions to disk`)
          for (let _id of Object.keys(indexResult.processedTransactionsToUpdate)) {
            writeTransactionToFile(indexResult.processedTransactionsToUpdate[_id])
          }


          console.log(`Writing ${Object.keys(indexResult.tokensToUpdate).length} updated tokens to disk`)

          //Write changed tokens to file
          for (let tokenId of Object.keys(indexResult.tokensToUpdate)  ) {
            fs.writeFileSync(`${config.publicPath}/sync/tokens/${tokenId}.json`, Buffer.from(JSON.stringify(indexResult.tokensToUpdate[tokenId])))
          }

          //Write changed owners to file
          console.log(`Writing ${Object.keys(indexResult.ownersToUpdate).length} updated token owners to disk`)
          for (let owner of Object.keys(indexResult.ownersToUpdate)) {
            fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${owner}.json`, Buffer.from(JSON.stringify(indexResult.ownersToUpdate[owner])))
          }


          let mostRecent:Transaction = await processedTransactionService.getLatest()

          
          if (mostRecent) {

            console.log(`Saving latest transaction: ${mostRecent._id}`)
          
            //Save latest transaction
            fs.writeFileSync(`${config.publicPath}/sync/transactions/latest.json`, Buffer.from(JSON.stringify({
              _id: mostRecent._id
            })))
          }



        }


        //Generate token owner pages for leaderboard
        let tokenOwners:TokenOwner[] = await tokenOwnerService.list(100000, 0)
        let tokenOwnerPages = await tokenOwnerPageService.buildTokenOwnerPages(tokenOwners, 100)

        //Write token owner pages to files
        let pageCount = 0
        await fs.promises.mkdir(`${config.publicPath}/sync/tokenOwner/pages`, { recursive: true })

        console.log(`Writing ${tokenOwnerPages.length} token owner pages to disk`)
        for (let tokenOwnerPage of tokenOwnerPages) {
          // console.log(`Writing token owner page: ${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`)
          await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`, JSON.stringify(tokenOwnerPage))
          pageCount++
        }

        console.log(`Writing totals to disk`)
        await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/total.json`, JSON.stringify({
          totalPages: tokenOwnerPages.length,
          totalRecords: tokenOwners.length
        }))

        console.log(`Complete...waiting...`)

        //If we're up to date then wait. Otherwise just do it again.

        setTimeout(runTransactionIndexer, INDEX_RATE) 




      } catch(ex) { 
        console.log(ex) 
      }


      


      function createDirectories() {

        // if (!fs.existsSync(`${config.publicPath}/sync/events`)) {
        //   fs.mkdirSync(`${config.publicPath}/sync/events`, { recursive: true })
        // }

        if (!fs.existsSync(`${config.publicPath}/sync/transactions`)) {
          fs.mkdirSync(`${config.publicPath}/sync/transactions`, { recursive: true })
        }

        if (!fs.existsSync(`${config.publicPath}/sync/tokens`)) {
          fs.mkdirSync(`${config.publicPath}/sync/tokens`, { recursive: true })
        }

        if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner`)) {
          fs.mkdirSync(`${config.publicPath}/sync/tokenOwner`, { recursive: true })
        }
        
      }

      // function writeEventToFile(event: ERCEvent) {
        
      //   let clonedEvent = JSON.parse(JSON.stringify(event))
      //   delete clonedEvent._rev
      //   delete clonedEvent['_rev_tree']

      //   fs.writeFileSync(`${config.publicPath}/sync/events/${clonedEvent._id}.json`, Buffer.from(JSON.stringify(clonedEvent)))
      // }


      function writeTransactionToFile(transaction:Transaction) {
        
        let clonedTransaction = JSON.parse(JSON.stringify(transaction))
        delete clonedTransaction._rev
        delete clonedTransaction['_rev_tree']

        fs.writeFileSync(`${config.publicPath}/sync/transactions/${clonedTransaction._id}.json`, Buffer.from(JSON.stringify(clonedTransaction)))
      }


  }
  
  runTransactionIndexer()

}



sync()



