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



import { TokenOwner } from "./dto/token-owner.js"
import { TokenOwnerPageService } from "./service/token-owner-page-service.js"




let channelId

import { ProcessedEvent, ProcessedTransaction, ProcessedTransactionToken, ProcessedTransactionTrader } from "./dto/processed-transaction.js"
import { TokenOwnerService } from "./service/token-owner-service.js"
import { ProcessedTransactionService, ProcessedTransactionsPage, TransactionViewModel } from "./service/processed-transaction-service.js"
import { ContractState } from "./dto/contract-state.js"
import { Token } from "./dto/token.js"
import { SchemaService } from "../reader/service/core/schema-service.js"
import { ContractStateService } from "./service/contract-state-service.js"
import { ItemService } from "../reader/service/item-service.js"
import { TokenService } from "./service/token-service.js"
import { TransactionService } from "./service/transaction-service.js"
import { BlockService } from "./service/block-service.js"

let transactionService:TransactionService
let blockService:BlockService

let sync = async () => {

  let config: any = await ProcessConfig.getConfig()

  if (config.alchemy) {


    let container = new Container()

    container.bind("channelId").toConstantValue(() => {
      return channelId
    })

    container.bind("contracts").toConstantValue(async () => {

      let contract = JSON.parse(fs.readFileSync(`${config.channelDir}/backup/contract/contract.json`, 'utf8'))
      let contractAbi = JSON.parse(fs.readFileSync(`${config.channelDir}/backup/contract/contract-abi.json`, 'utf8'))

      if (!contract.contractAddress) return []

      //Override address
      contractAbi['Channel'].address = contract.contractAddress

      return contractAbi

    })

    let command: GetMainContainerCommand = {
      customContainer: container,
      channelDir: config.channelDir,
      runDir: config.runDir,
      baseURI: config.baseURI,
      hostname: config.hostname,
      alchemy: config.alchemy
    }

    container = await getMainContainer(command)

    //Init item repo
    let schemaService: SchemaService = container.get("SchemaService")

    await schemaService.load(["items"])

    //Verify we have an ethereum connection
    let walletService: WalletService = container.get("WalletService")
    await walletService.initProvider()

    // console.log(`Provider initialized`)

    let channelWebService: ChannelWebService = container.get("ChannelWebService")

    //Get channel
    let channelViewModel = await channelWebService.get(0)

    channelId = channelViewModel.channel._id

    //Init database
    let sequelizeInit: Function = container.get("sequelize")
    let sequelize = await sequelizeInit(config.channelDir, channelId)

    await sequelize.query("PRAGMA busy_timeout=5000;")
    await sequelize.query("PRAGMA journal_mode=WAL;")


    if (config.clear) {

      console.time('Clearing processed transaction data...')

      await ContractState.drop()

      await ProcessedTransactionToken.drop()
      await ProcessedTransactionTrader.drop()
      await ProcessedEvent.drop()
      await ProcessedTransaction.drop()

      await Token.drop()
      await TokenOwner.drop()


      if (fs.existsSync(`${config.publicPath}/sync`)) {
        fs.rmSync(`${config.publicPath}/sync`, { recursive: true })
      }

      console.timeEnd('Clearing processed transaction data...')


    }

    // console.time('Synchronizing database schema...')
    await sequelize.sync()
    // console.timeEnd('Synchronizing database schema...')

    transactionService = container.get("TransactionService")
    blockService = container.get("BlockService")


    let transactionIndexerService: TransactionIndexerService = container.get("TransactionIndexerService")
    let tokenService: TokenService = container.get("TokenService")

    let tokenOwnerService: TokenOwnerService = container.get("TokenOwnerService")
    let processedTransactionService: ProcessedTransactionService = container.get("ProcessedTransactionService")
    let tokenOwnerPageService: TokenOwnerPageService = container.get("TokenOwnerPageService")
    let contractStateService: ContractStateService = container.get("ContractStateService")
    let itemService: ItemService = container.get("ItemService")

    let channelContract = await walletService.getContract("Channel")

    let indexResult: ERCIndexResult = {
      processedTransactionViewModels: {},
      ownersToUpdate: {},
      tokensToUpdate: {}
    }

    await sequelize.transaction(async (t1) => {
      await transactionIndexerService.init(channelContract, { transaction: t1 })
    })

    //Start the transaction indexer
    async function runTransactionIndexer() {

      try {

        await sequelize.transaction(async (t1) => {

          if (!indexResult) {
            indexResult = {
              processedTransactionViewModels: {},
              ownersToUpdate: {},
              tokensToUpdate: {}
            }
          }

          indexResult = await transactionIndexerService.index(indexResult, { transaction: t1 })
        })


        //If we're current then wait. If not then just do it again.
        if (indexResult?.isCurrent) {

          //Once we're current flush the results to disk.
          if (indexResult?.processedTransactionViewModels && Object.keys(indexResult?.processedTransactionViewModels).length > 0) {

            await sequelize.transaction(async (t1) => {
              await writeResultsToDisk(indexResult, { transaction: t1 })
            })

            await updateLatestInfo(indexResult)

            //Clear results
            indexResult = {
              processedTransactionViewModels: {},
              ownersToUpdate: {},
              tokensToUpdate: {}
            }

          } else {

            await updateLatestInfo(indexResult)


            console.log('No results to process.')
          }

          //Save contract state
          await contractStateService.put(transactionIndexerService.contractState)


          if (config.syncRate > 0) {

            setTimeout(runTransactionIndexer, config.syncRate)
            console.log(`Complete...waiting...`)

          } else {

            //Just end.
            console.log(`Sync complete.`)
          }

        } else {

          if (indexResult) {
            console.log(`Batch complete. Indexed to block #${indexResult.endBlock} of #${indexResult.blockNumber}`)
          } else {
            console.log(`Batch complete.`)
          }
          runTransactionIndexer()
        }

      } catch (ex) {
        console.log(ex.message)
      }

    }

    async function writeResultsToDisk(indexResult: ERCIndexResult, options?: any) {

      await createDirectories(config)

      //Write transactions to file
      await writeTransactionsToDisk(indexResult)
      await writeTokensToDisk(indexResult, options)
      await writeTokenOwnersToDisk(indexResult, options)
      await writeActivityFeedToDisk(indexResult, options)

      //Generate token owner pages for leaderboard
      await writeTokenOwnerPagesToDisk(options)

      //Sales reports
      await writeSalesReportsToDisk()

      //Write home page model
      await writeHomeToDisk(options)

    }

    async function writeHomeToDisk(options?: any) {

      let homeViewModel: any = {}

      homeViewModel.recent = await processedTransactionService.translateTransactionsToViewModels(await processedTransactionService.list(5, 0, options), new Date().toJSON())
      homeViewModel.largestSales = await processedTransactionService.getLargestSales(15)

      // //Write top 10 to put on homepage
      // let top10: TokenOwner[] = await tokenOwnerService.list(10, 0, options)

      // if (top10?.length > 0) {
      //   let top10Pages = await tokenOwnerPageService.buildTokenOwnerPages(top10, 10)
      //   homeViewModel.leaderboard = top10Pages[0]
      // }

      homeViewModel.salesReport = await processedTransactionService.getSalesReport()


      await fs.promises.writeFile(`${config.publicPath}/sync/home.json`, Buffer.from(JSON.stringify(homeViewModel)))



    }

    async function writeActivityFeedToDisk(indexResult, options?: any) {

      console.time(`Writing activity feed to disk.`)


      //Grab 10 pages worth of activity
      let transactions: ProcessedTransaction[] = await processedTransactionService.list(25 * 10, 0, options)

      //Reverse them

      let transactionsViewModel = await processedTransactionService.translateTransactionsToViewModels(transactions)

      let transactionPages: ProcessedTransactionsPage[] = await processedTransactionService.buildTransactionPages(transactionsViewModel, 25)


      let i = 1
      for (let page of transactionPages) {
        fs.writeFileSync(`${config.publicPath}/sync/transactions/activity/${i}.json`, Buffer.from(JSON.stringify(page)))
        i++
      }

      console.timeEnd(`Writing activity feed to disk.`)

    }

    async function writeSalesReportsToDisk() {

      console.time(`Generating sales report...`)
      let salesReport = await processedTransactionService.getSalesReport()
      fs.writeFileSync(`${config.publicPath}/sync/sales/overall.json`, Buffer.from(JSON.stringify(salesReport)))
      console.timeEnd(`Generating sales report...`)


      //Largest sales
      console.time(`Generating largest sales...`)
      let largestSales100 = await processedTransactionService.getLargestSales(100)
      fs.writeFileSync(`${config.publicPath}/sync/sales/largest-100.json`, Buffer.from(JSON.stringify(largestSales100)))
      console.timeEnd(`Generating largest sales...`)


      //Sales by attribute
      console.time(`Generating attribute stats...`)
      let attributeSalesReport = await processedTransactionService.getAttributeSalesReport()


      //Write attributes to files
      for (let key of Object.keys(attributeSalesReport.owners)) {

        let totals = attributeSalesReport.totals.filter(total => `${total.traitType}::::${total.value}` == key)

        if (!fs.existsSync(`${config.publicPath}/sync/attributes/${processedTransactionService.attributeKeyToInteger(key)}`)) {
          fs.mkdirSync(`${config.publicPath}/sync/attributes/${processedTransactionService.attributeKeyToInteger(key)}`)
        }

        //Write attribute file
        fs.writeFileSync(`${config.publicPath}/sync/attributes/${processedTransactionService.attributeKeyToInteger(key)}/attribute.json`, Buffer.from(JSON.stringify({
          key: key,
          totals: totals?.length > 0 ? totals[0] : undefined,
          owners: attributeSalesReport.owners[key],
          largestSales: attributeSalesReport.largestSales[key],
          rowItemViewModels: attributeSalesReport.rowItemViewModels[key]
        })))

      }

      fs.writeFileSync(`${config.publicPath}/sync/attributes/totals.json`, Buffer.from(JSON.stringify(attributeSalesReport.totals)))
      console.timeEnd(`Generating attribute stats...`)


    }

    async function writeTokenOwnerPagesToDisk(options?: any) {

      console.time(`Writing token owner pages to disk.`)

      let tokenOwners: TokenOwner[] = await tokenOwnerService.list(100000, 0, options)

      let tokenOwnerPages = await tokenOwnerPageService.buildTokenOwnerPages(tokenOwners, 100)

      //Write token owner pages to files
      let pageCount = 0
      await fs.promises.mkdir(`${config.publicPath}/sync/tokenOwner/pages`, { recursive: true })

      for (let tokenOwnerPage of tokenOwnerPages) {
        await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/${pageCount}.json`, JSON.stringify(tokenOwnerPage))
        pageCount++
      }

      await fs.promises.writeFile(`${config.publicPath}/sync/tokenOwner/pages/total.json`, JSON.stringify({
        totalPages: tokenOwnerPages.length,
        totalRecords: tokenOwners.length
      }))

      console.timeEnd(`Writing token owner pages to disk.`)


    }

    async function writeTokenOwnersToDisk(indexResult: ERCIndexResult, options?: any) {

      console.time(`Writing ${Object.keys(indexResult.ownersToUpdate).length} updated token owners to disk.`)

      for (let owner of Object.keys(indexResult.ownersToUpdate)) {

        let tokenOwner = indexResult.ownersToUpdate[owner]

        //Refetch because ranks could get updated
        let refetchedOwner = await tokenOwnerService.get(indexResult.ownersToUpdate[owner]._id)

        tokenOwner.rank = refetchedOwner.rank
        tokenOwner.overallRank = refetchedOwner.overallRank

        // let tokenOwner = await tokenOwnerService.get(indexResult.ownersToUpdate[owner]._id)
        let cloned = JSON.parse(JSON.stringify(tokenOwner))

        //Create activity folder
        if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner/${owner}/activity`)) {
          fs.mkdirSync(`${config.publicPath}/sync/tokenOwner/${owner}/activity`, { recursive: true })
        }

        if (!fs.existsSync(`${config.publicPath}/sync/tokenOwner/${owner}/tokens`)) {
          fs.mkdirSync(`${config.publicPath}/sync/tokenOwner/${owner}/tokens`, { recursive: true })
        }



        //Reverse order of transactions
        cloned.transactionsViewModel?.transactions?.reverse()


        let transactionPages: ProcessedTransactionsPage[] = await processedTransactionService.buildTransactionPages(cloned.transactionsViewModel, 25, options)


        //Remove transactions before writing to JSON
        delete cloned.transactionsViewModel

        cloned.salesReport = await processedTransactionService.getTokenOwnerSalesReport(cloned._id)


        //Write activity
        let i = 1
        for (let page of transactionPages) {
          fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${owner}/activity/${i}.json`, Buffer.from(JSON.stringify(page)))
          i++
        }

        cloned.totalTransactionPages = transactionPages?.length

        //Write full profile
        fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${owner}/tokenOwner.json`, Buffer.from(JSON.stringify(cloned)))

        //Write latest ENS name
        fs.writeFileSync(`${config.publicPath}/sync/tokenOwner/${owner}/ens.json`, Buffer.from(JSON.stringify({
          name: cloned.ensName
        })))


        //Get token rowItemViewModels
        let tokenIds = cloned.tokenIds.map(a => parseInt(a))

        tokenIds.sort((a, b) => a - b)

        let rowItemViewModels = await itemService.getRowItemViewModelsByTokenIds(tokenIds)


        //Write pages full of rowItemViewModels for the tokens they own.
        await writeTokenOwnerRowItems(rowItemViewModels, `${config.publicPath}/sync/tokenOwner/${owner}/tokens`)



        //Update sales report in database
        refetchedOwner.salesReport = cloned.salesReport

        await tokenOwnerService.put(refetchedOwner, options)

      }

      console.timeEnd(`Writing ${Object.keys(indexResult.ownersToUpdate).length} updated token owners to disk.`)

    }

    async function writeTokensToDisk(indexResult: ERCIndexResult, options?: any) {

      console.time(`Writing ${Object.keys(indexResult.tokensToUpdate).length} updated tokens to disk.`)

      //Write changed tokens to file
      for (let tokenId of Object.keys(indexResult.tokensToUpdate)) {

        //Remove activity if it exists.
        if (!fs.existsSync(`${config.publicPath}/sync/tokens/${tokenId}`)) {
          fs.mkdirSync(`${config.publicPath}/sync/tokens/${tokenId}`, { recursive: true })
        }


        //Grab ENS
        let allEvents = []

        indexResult.tokensToUpdate[tokenId].transactionsViewModel.transactions.map(t => allEvents.push(...t.events))

        indexResult.tokensToUpdate[tokenId].transactionsViewModel.ens = await processedTransactionService.getEnsFromEvents(allEvents, options)


        //Save token
        fs.writeFileSync(`${config.publicPath}/sync/tokens/${tokenId}/token.json`, Buffer.from(JSON.stringify(indexResult.tokensToUpdate[tokenId])))

      }

      console.timeEnd(`Writing ${Object.keys(indexResult.tokensToUpdate).length} updated tokens to disk.`)

    }

    async function writeTransactionsToDisk(indexResult: ERCIndexResult) {

      console.time(`Writing ${Object.keys(indexResult.processedTransactionViewModels).length} transactions to disk.`)
      for (let _id of Object.keys(indexResult.processedTransactionViewModels)) {

        //Get transaction
        let transaction: TransactionViewModel = indexResult.processedTransactionViewModels[_id]

        fs.writeFileSync(`${config.publicPath}/sync/transactions/${transaction.transaction._id}.json`, Buffer.from(JSON.stringify(transaction)))

      }
      console.timeEnd(`Writing ${Object.keys(indexResult.processedTransactionViewModels).length} transactions to disk.`)

    }

    async function writeTokenOwnerRowItems(rowItemViewModels: any[], filepath: string) {

      fs.mkdirSync(filepath, { recursive: true })

      //Write rowItemViewModels in pages 
      let perPage = 35

      let chunks = []

      //Break into rows
      for (let i = 0; i < rowItemViewModels.length; i += perPage) {
        let chunk = rowItemViewModels.slice(i, i + perPage)
        chunks.push(chunk)
      }

      let i = 1
      for (let chunk of chunks) {

        fs.writeFileSync(`${filepath}/${i}.json`, Buffer.from(JSON.stringify({
          items: chunk,
          totalMatches: rowItemViewModels.length
        })))

        i++

      }

    }

    async function updateLatestInfo(indexResult: ERCIndexResult) {

      //Save latest transaction
      console.log(`Updating latest info: ${indexResult?.mostRecentTransaction?.transaction._id} / ${new Date().toJSON()}`)

      if (!fs.existsSync(`${config.publicPath}/sync/transactions`)) {
        fs.mkdirSync(`${config.publicPath}/sync/transactions`, { recursive: true })
      }

      let latest = await tokenService.getLatest()

      fs.writeFileSync(`${config.publicPath}/sync/transactions/latest.json`, Buffer.from(JSON.stringify({
        _id: indexResult?.mostRecentTransaction?.transaction._id,
        latestToken: latest?.tokenId,
        lastUpdated: new Date().toJSON()
      })))



    }

    // let testTransaction = async () => {

    //   await transactionIndexerService.init(channelContract)

    //   let transaction: Transaction = await transactionService.getOrDownload("0x82b5401dcc50b5ad4eb659112bf2eae8cbc3fd1274eb246e83927e64c8b38ad0")

    //   let ethUSDPrice: number = await blockService.getETHUSDAtBlock(transaction.blockNumber)

    //   let value = await transactionService.getTransactionValue(transaction, await channelContract.getAddress(), ethUSDPrice)

    //   console.log(value)

    // }

    // testTransaction()
    runTransactionIndexer()

  } else {
    console.log("No ethereum connection configured.")
  }

}



async function createDirectories(config: any) {
  if (!fs.existsSync(`${config.publicPath}/sync/transactions/activity`)) {
    fs.mkdirSync(`${config.publicPath}/sync/transactions/activity`, { recursive: true })
  }

  if (!fs.existsSync(`${config.publicPath}/sync/tokens`)) {
    fs.mkdirSync(`${config.publicPath}/sync/tokens`, { recursive: true })
  }

  if (!fs.existsSync(`${config.publicPath}/sync/sales`)) {
    fs.mkdirSync(`${config.publicPath}/sync/sales`, { recursive: true })
  }

  if (!fs.existsSync(`${config.publicPath}/sync/attributes`)) {
    fs.mkdirSync(`${config.publicPath}/sync/attributes`, { recursive: true })
  }
}







sync()










export {
  sync
}

