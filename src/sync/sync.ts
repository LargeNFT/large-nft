import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"

import { Container } from "inversify"

import { getMainContainer, GetMainContainerCommand } from "./inversify.config.js"
import { ChannelWebService } from "../reader/service/web/channel-web-service.js"


import { ERCIndexResult, TransactionIndexerService } from "./service/transaction-indexer-service.js"
import { WalletService } from "../reader/service/core/wallet-service.js"
import { ProcessConfig } from "../reader/util/process-config.js"

//@ts-ignore


import { TokenOwner } from "./dto/token-owner.js"
import { TokenOwnerPageService } from "../reader/service/token-owner-page-service.js"
import { Transaction } from "./dto/transaction.js"






let channelId

// import { simpleGit, CleanOptions } from 'simple-git'
import { ProcessedEvent, ProcessedTransaction, ProcessedTransactionToken } from "./dto/processed-transaction.js"
import { BlockService } from "./service/block-service.js"
import { TransactionService } from "./service/transaction-service.js"
import { TokenOwnerService } from "./service/token-owner-service.js"
import { ProcessedTransactionService, TransactionViewModel } from "./service/processed-transaction-service.js"
import { ContractState } from "./dto/contract-state.js"
import { Token } from "./dto/token.js"
import { SchemaService } from "../reader/service/core/schema-service.js"



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


  let command:GetMainContainerCommand = {
    customContainer: container,
    baseDir: config.baseDir,
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: config.alchemy
  }

  container = await getMainContainer(command)

  //Init item repo
  let schemaService:SchemaService = container.get("SchemaService")

  await schemaService.load(["items"])

  //Verify we have an ethereum connection
  let walletService:WalletService = container.get("WalletService")
  await walletService.initProvider()

  console.log(`Provider initialized`)


  let channelWebService: ChannelWebService = container.get("ChannelWebService")


  //Get channel
  let channelViewModel = await channelWebService.get(0)

  channelId = channelViewModel.channel._id
  //Init database
  let sequelizeInit:Function = container.get("sequelize")
  let sequelize = await sequelizeInit(config.baseDir, channelId)

  await sequelize.query("PRAGMA busy_timeout=5000;")
  await sequelize.query("PRAGMA journal_mode=WAL;")
  // await sequelize.query("PRAGMA read_uncommitted=true;")


  if (config.clear) {

    console.time('Clearing processed transaction data...')

    await ContractState.drop()

    await ProcessedTransactionToken.drop()
    await ProcessedEvent.drop()
    await ProcessedTransaction.drop()

    await Token.drop()
    await TokenOwner.drop()

    console.timeEnd('Clearing processed transaction data...')


  }
  
  console.time('Synchronizing database schema...')
  await sequelize.sync()
  console.timeEnd('Synchronizing database schema...')




  let transactionIndexerService:TransactionIndexerService = container.get("TransactionIndexerService")
  let transactionService:TransactionService = container.get("TransactionService")
  let blockService:BlockService = container.get("BlockService")

  let tokenOwnerService:TokenOwnerService = container.get("TokenOwnerService")
  let processedTransactionService: ProcessedTransactionService = container.get("ProcessedTransactionService")
  let tokenOwnerPageService: TokenOwnerPageService = container.get("TokenOwnerPageService")

  

  let channelContract = await walletService.getContract("Channel")


  

  //Start the transaction indexer
  async function runTransactionIndexer(){

      await sequelize.transaction(async (t1) => {
        await transactionIndexerService.init(channelContract, { transaction: t1 })
      })

      let indexResult:ERCIndexResult     

      try {

        await sequelize.transaction(async (t1) => {
          indexResult = await transactionIndexerService.index({ transaction: t1 })
        })
        
        

        if (Object.keys(indexResult?.processedTransactionViewModels).length > 0) {

          await sequelize.transaction(async (t1) => {
            await writeResultsToDisk(indexResult, { transaction: t1 })
          })

        } else {
          console.log('No results to process.')
        }


        //Save latest transaction
        console.log(`Updating latest info: ${indexResult.mostRecentTransaction?.transaction._id} / ${new Date().toJSON()}`)
            
        fs.writeFileSync(`${config.publicPath}/sync/transactions/latest.json`, Buffer.from(JSON.stringify({
          _id: indexResult.mostRecentTransaction?.transaction._id,
          lastUpdated: new Date().toJSON()
        })))



        //If we're current then wait. If not then just do it again.
        if (indexResult?.isCurrent) {
          setTimeout(runTransactionIndexer, config.syncRate) 
          console.log(`Complete...waiting...`)
        } else {
          console.log(`Complete...`)
          runTransactionIndexer()
        }

      } catch(ex) { 
        console.log(ex) 
      }





  }

  async function writeResultsToDisk(indexResult:ERCIndexResult, options?:any) {

    if (!fs.existsSync(`${config.publicPath}/sync/transactions`)) {
      fs.mkdirSync(`${config.publicPath}/sync/transactions`, { recursive: true })
    }

    if (!fs.existsSync(`${config.publicPath}/sync/tokens`)) {
      fs.mkdirSync(`${config.publicPath}/sync/tokens`, { recursive: true })
    }

    if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner/ens`)) {
      fs.mkdirSync(`${config.publicPath}/sync/tokenOwner/ens`, { recursive: true })
    }

    if (!fs.existsSync(`${config.publicPath}/sync/sales`)) {
      fs.mkdirSync(`${config.publicPath}/sync/sales`, { recursive: true })
    }


    if (!fs.existsSync(`${config.publicPath}/sync/attributes`)) {
      fs.mkdirSync(`${config.publicPath}/sync/attributes`, { recursive: true })
    }

    console.log(`${Object.keys(indexResult.processedTransactionViewModels).length} transactions to update. Writing files.`)
    console.log(`${Object.keys(indexResult.tokensToUpdate).length} tokens to update. Writing files.`)
    console.log(`${Object.keys(indexResult.ownersToUpdate).length} owners to update. Writing files.`)


    //Write transactions to file
    console.time(`Writing ${Object.keys(indexResult.processedTransactionViewModels).length} transactions to disk.`)
    for (let _id of Object.keys(indexResult.processedTransactionViewModels)) {

      //Get transaction
      let transaction:TransactionViewModel = indexResult.processedTransactionViewModels[_id]

      fs.writeFileSync(`${config.publicPath}/sync/transactions/${transaction.transaction._id}.json`, Buffer.from(JSON.stringify(transaction)))

    }
    console.timeEnd(`Writing ${Object.keys(indexResult.processedTransactionViewModels).length} transactions to disk.`)



    console.time(`Writing ${Object.keys(indexResult.tokensToUpdate).length} updated tokens to disk.`)

    //Write changed tokens to file
    for (let tokenId of Object.keys(indexResult.tokensToUpdate)  ) {
      fs.writeFileSync(`${config.publicPath}/sync/tokens/${tokenId}.json`, Buffer.from(JSON.stringify(indexResult.tokensToUpdate[tokenId])))
    }

    console.timeEnd(`Writing ${Object.keys(indexResult.tokensToUpdate).length} updated tokens to disk.`)


    //Write changed owners to file
    console.time(`Writing ${Object.keys(indexResult.ownersToUpdate).length} updated token owners to disk.`)
    for (let owner of Object.keys(indexResult.ownersToUpdate)) {

      //Refetch because ranks could get updated
      let tokenOwner = await tokenOwnerService.get(indexResult.ownersToUpdate[owner]._id)
      let cloned = JSON.parse(JSON.stringify(tokenOwner))

  
      //Generate sales report
      cloned.salesReport = await processedTransactionService.getTokenOwnerSalesReport(owner)

      //Write full profile
      fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${owner}.json`, Buffer.from(JSON.stringify(cloned)))

      //Write latest ENS name
      fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/ens/${owner}.json`, Buffer.from(JSON.stringify({
        name: cloned.ensName
      })))

    }
    console.timeEnd(`Writing ${Object.keys(indexResult.ownersToUpdate).length} updated token owners to disk.`)



    //Get list for home page and save it.
    console.time(`Writing recent activity to disk.`)
    
    

    let recent = await processedTransactionService.translateTransactionsToViewModels(await processedTransactionService.listFrom(15, indexResult.mostRecentTransaction.transaction._id, options), new Date().toJSON())
    fs.writeFileSync(`${config.publicPath}/sync/transactions/recentActivity.json`, Buffer.from(JSON.stringify(recent)))
    console.timeEnd(`Writing recent activity to disk.`)



    //Generate token owner pages for leaderboard

    let tokenOwners:TokenOwner[] = await tokenOwnerService.list(100000, 0, options)

    let tokenOwnerPages = await tokenOwnerPageService.buildTokenOwnerPages(tokenOwners, 100)

    //Write token owner pages to files
    let pageCount = 0
    await fs.promises.mkdir(`${config.publicPath}/sync/tokenOwner/pages`, { recursive: true })

    console.time(`Writing ${tokenOwnerPages.length} token owner pages to disk.`)
    for (let tokenOwnerPage of tokenOwnerPages) {
      // console.log(`Writing token owner page: ${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`)
      await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`, JSON.stringify(tokenOwnerPage))
      pageCount++
    }
    console.timeEnd(`Writing ${tokenOwnerPages.length} token owner pages to disk.`)


    console.log(`Writing totals to disk`)
    await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/total.json`, JSON.stringify({
      totalPages: tokenOwnerPages.length,
      totalRecords: tokenOwners.length
    }))







    //Writing sales reports


    console.time(`Generating sales report...`)
    let salesReport = await processedTransactionService.getSalesReport()
    fs.writeFileSync(`${config.publicPath}/sync/sales/overall.json`, Buffer.from(JSON.stringify(salesReport)))
    console.timeEnd(`Generating sales report...`)


    //Largest sales
    console.time(`Generating largest sales...`)
    let largestSales15 = await processedTransactionService.getLargestSales(15)
    fs.writeFileSync(`${config.publicPath}/sync/sales/largest-15.json`, Buffer.from(JSON.stringify(largestSales15)))

    let largestSales100 = await processedTransactionService.getLargestSales(100)
    fs.writeFileSync(`${config.publicPath}/sync/sales/largest-100.json`, Buffer.from(JSON.stringify(largestSales100)))

    console.timeEnd(`Generating largest sales...`)


    //Sales by attribute
    console.time(`Generating attribute stats...`)
    let attributeSalesReport = await processedTransactionService.getAttributeSalesReport()

    //Write attributes to files
    for (let key of Object.keys(attributeSalesReport.owners)) {

      let totals = attributeSalesReport.totals.filter( total => `${total.traitType}::::${total.value}` == key)

      fs.writeFileSync(`${config.publicPath}/sync/attributes/${processedTransactionService.attributeKeyToInteger(key)}.json`, Buffer.from(JSON.stringify({
        key: key,
        totals: totals?.length > 0 ? totals[0] : undefined,
        owners: attributeSalesReport.owners[key],
        largestSales: attributeSalesReport.largestSales[key]
      })))

    }

    fs.writeFileSync(`${config.publicPath}/sync/attributes/totals.json`, Buffer.from(JSON.stringify(attributeSalesReport.totals)))



    console.timeEnd(`Generating attribute stats...`)
  
  }


  let testTransaction = async () => {

    await transactionIndexerService.init(channelContract)

    let transaction:Transaction = await transactionService.getOrDownload("0x82b5401dcc50b5ad4eb659112bf2eae8cbc3fd1274eb246e83927e64c8b38ad0")

    let ethUSDPrice:number = await blockService.getETHUSDAtBlock(transaction.blockNumber)

    console.log(ethUSDPrice)

    let value = await transactionService.getTransactionValue(transaction, channelContract.address, ethUSDPrice)

    console.log(value)

  }

  // testTransaction()
  runTransactionIndexer()





}



sync()


