import { inject, injectable } from "inversify"

import { ProcessedTransactionRepository } from "../../sync/repository/processed-transaction-repository.js"
import { AttributeSaleReport, ProcessedEvent, ProcessedTransaction, Sale, SalesReport, TokenOwnerSalesReport, TransactionValue } from "../../sync/dto/processed-transaction.js"
import { ItemService } from "../../reader/service/item-service.js"
import { TokenService } from "./token-service.js"
import { TokenOwnerService } from "./token-owner-service.js"
import { ERCIndexResult } from "./transaction-indexer-service.js"
import { Block } from "../dto/block.js"
import { BlockService } from "./block-service.js"
import { Transaction } from "../dto/transaction.js"
import { TransactionService } from "./transaction-service.js"
import { WalletService } from "../../reader/service/core/wallet-service.js"



@injectable()
class ProcessedTransactionService {

    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    @inject("BlockService")
    private blockService:BlockService

    @inject("TransactionService")
    private transactionService:TransactionService

    @inject("ItemService")
    private itemService:ItemService

    @inject("TokenService")
    private tokenService:TokenService

    @inject("TokenOwnerService")
    private tokenOwnerService:TokenOwnerService


    @inject("WalletService")
    private walletService:WalletService

    constructor() {}

    async get(_id:string, options?:any) {
        return this.processedTransactionRepository.get(_id,options)
    }

    async getByIds(_ids:string[], options?:any) : Promise<ProcessedTransaction[]> {
        return this.processedTransactionRepository.getByIds(_ids, options)
    }

    async getViewModel(_id:string, options?:any) : Promise<TransactionViewModel> {

        let transaction = await this.processedTransactionRepository.get(_id, options)
        if (!transaction) return


        let events = await this.processedTransactionRepository.getEventsByTransaction(transaction)

        return {
            transaction: this._translateProcessedTransactionToViewModel(transaction),
            events: events.map( e => this._translateProcessedEventToViewModel(e))
        }


    }

    async put(processedTransaction:ProcessedTransaction, options?:any) {
        return this.processedTransactionRepository.put(processedTransaction, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
    */
    async putAll(transactions:ProcessedTransaction[], options?:any) {
        return this.processedTransactionRepository.putAll(transactions, options)
    }

    async putEvents(events:ProcessedEvent[], options?:any) {
        return this.processedTransactionRepository.putEvents(events, options)
    }


    async list(limit: number, skip: number, options?:any) : Promise<ProcessedTransaction[]> {
        return this.processedTransactionRepository.list(limit, skip, options)
    }


    async listByTokens(tokenIds:number[], limit:number, options?:any) : Promise<ProcessedTransaction[]> {
        return this.processedTransactionRepository.listByTokens(tokenIds, options)
    }

    async listByToken(tokenId:number, limit:number, options?:any) : Promise<ProcessedTransaction[]> {
        return this.processedTransactionRepository.listByToken(tokenId, options)
    }

    async listByTrader(owner:string, options?:any) : Promise<ProcessedTransaction[]> {
        return this.processedTransactionRepository.listByTrader(owner, options)
    }

    async listIds(limit:number, options?:any) : Promise<string[]> {
        return this.processedTransactionRepository.listIds(limit, options)
    }


    async getLatest(beforeBlock?:number, options?:any) : Promise<ProcessedTransaction> {

        return this.processedTransactionRepository.getLatest(beforeBlock, options)

    }

    async getLatestViewModel(beforeBlock?:number, options?:any) : Promise<TransactionViewModel> {

        let transaction = await this.processedTransactionRepository.getLatest(beforeBlock, options)
        if (!transaction) return

        let events = await this.processedTransactionRepository.getEventsByTransaction(transaction)

        return {
            transaction: this._translateProcessedTransactionToViewModel(transaction),
            events: events.map( e => this._translateProcessedEventToViewModel(e))
        }

    }

    public async getRowItemViewModels(processedEvents) {

        let result = {}

        let tokenIds = new Set<number>()


        for (let processedEvent of processedEvents) {

            if (!processedEvent.tokenId) continue
            tokenIds.add(processedEvent.tokenId)
        }

        let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(Array.from(tokenIds))

        for (let rivm of rowItemViewModels) {
            result[rivm.tokenId] = rivm
        }

        return result

    }

    public async getEnsFromEvents(processedEvents, options) {

        let ens = {}

        let addresses = []
        
        for (let processedEvent of processedEvents) {

            if (processedEvent.fromAddress?.length > 0 && !addresses.includes(processedEvent.fromAddress) ) {
                addresses.push(processedEvent.fromAddress)
            }

            if (processedEvent.toAddress?.length > 0  && !addresses.includes(processedEvent.toAddress)) {
                addresses.push(processedEvent.toAddress)
            }

            if (processedEvent.namedArgs.owner?.length > 0  && !addresses.includes(processedEvent.namedArgs.owner) ) {
                addresses.push(processedEvent.namedArgs.owner)
            }


            if (processedEvent.namedArgs.operator?.length > 0  && !addresses.includes(processedEvent.namedArgs.operator) ) {
                addresses.push(processedEvent.namedArgs.operator)
            }

            if (processedEvent.namedArgs.approved?.length > 0  && !addresses.includes(processedEvent.namedArgs.approved)) {
                addresses.push(processedEvent.namedArgs.approved)
            }            

        }

        let tokenOwners = await this.tokenOwnerService.getByIds(addresses, options)


        for (let tokenOwner of tokenOwners) {
            ens[tokenOwner._id] = tokenOwner.ensName ? tokenOwner.ensName : this.walletService.truncateEthAddress(tokenOwner._id)
        }

        return ens
        

    }


    async translateTransactionsToViewModels(transactions:ProcessedTransaction[], lastUpdated?:string, options?:any) : Promise<TransactionsViewModel> {

        let transactionViewModels:TransactionViewModel[] = []

        let allEvents:ProcessedEvent[] = []

        for (let transaction of transactions) {

            let processedEvents:ProcessedEvent[] = await this.processedTransactionRepository.getEventsByTransaction(transaction, options)

            transactionViewModels.push({
                transaction: this._translateProcessedTransactionToViewModel(transaction),
                events: processedEvents.map( e => this._translateProcessedEventToViewModel(e))
            })

            allEvents.push(...processedEvents)
        }

        let results:TransactionsViewModel = {
            lastUpdated: lastUpdated,
            transactions: transactionViewModels,
            rowItemViewModels: await this.getRowItemViewModels(allEvents),
            ens: await this.getEnsFromEvents(allEvents, options)
        }

        return results
    }

    translateTransactionViewModel(transaction:ProcessedTransaction, events:ProcessedEvent[]) : TransactionViewModel {

        return {
            transaction: this._translateProcessedTransactionToViewModel(transaction),
            events: events.map(event => this._translateProcessedEventToViewModel(event))
        }


    }

    private _translateProcessedTransactionToViewModel(transaction:ProcessedTransaction) : ProcessedTransactionViewModel {
        return {
            _id: transaction._id,
            blockNumber: transaction.blockNumber,
            transactionFrom: transaction.transactionFrom,
            tokenTraders: transaction.tokenTraderIds,
            timestamp: transaction.timestamp,
            tokenIds: transaction.tokenIds,
            transactionValue: transaction.transactionValue
        }
    }

    private _translateProcessedEventToViewModel(event:ProcessedEvent) : ProcessedEventViewModel {
        return {
            isMint: event.isMint,
            isBurn: event.isBurn,
            namedArgs: event.namedArgs,
            tokenId: event.tokenId,
            fromAddress: event.fromAddress,
            toAddress: event.toAddress,
            price: event.price,
            currency: event.currency,
            usdValue: event.usdValue,
            event: event.event
        }
    }


    async getSalesReport() : Promise<SalesReport> {
        return this.processedTransactionRepository.getSalesReport()
    }

    async getAttributeSalesReport(options?:any): Promise<AttributeSaleReport> {
    
        let report:AttributeSaleReport = {
            owners: [],
            largestSales: {},
            rowItemViewModels: {}
        }

        report.totals = await this.processedTransactionRepository.getAttributeSalesRows(0, options)

        let attributes = await this.processedTransactionRepository.getAttributes()
        
        for (let attribute of attributes) {

            report.owners[`${attribute.traitType}::::${attribute.v}`] = await this.processedTransactionRepository.getOwnersByAttribute(attribute.traitType, attribute.v, options)
            report.largestSales[`${attribute.traitType}::::${attribute.v}`] = await this.processedTransactionRepository.getLargestSalesByAttribute(attribute.traitType, attribute.v, 50, options)
            
            let tokenIds = report.largestSales[`${attribute.traitType}::::${attribute.v}`].map(s => s.tokenId)
            let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(tokenIds)

            report.rowItemViewModels[`${attribute.traitType}::::${attribute.v}`] = {}

            for (let rowItemViewModel of rowItemViewModels) {
                report.rowItemViewModels[`${attribute.traitType}::::${attribute.v}`][rowItemViewModel.tokenId] = rowItemViewModel
            }


        }


        return report





    }

    async getLargestSales(limit:number) {

        let sales = await this.processedTransactionRepository.getLargestSales(limit)

        let tokenIds = sales?.map( s => s.tokenId)

        let result:any = {
            sales: sales
        }

        if (tokenIds?.length > 0) {
            
            result.rowItemViewModels = {}

            let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(tokenIds)

            for (let rowItemViewModel of rowItemViewModels) {
                result.rowItemViewModels[rowItemViewModel.tokenId] = rowItemViewModel
            }

        }

        return result

    }

    async getSalesByAttribute(traitType:string, value:string) : Promise<Sale[]> {
        return this.processedTransactionRepository.getSalesByAttribute(traitType, value)
    }

    async getTokenOwnerSalesReport(_id:string) : Promise<TokenOwnerSalesReport> {
        return this.processedTransactionRepository.getTokenOwnerSalesReport(_id)
    }


    async deleteBetweenBlocks(result:ERCIndexResult, blockConfirmations:number, options?:any)  {

        // console.log(`Deleting between block #${result.startBlock} - ${result.endBlock}`)

        let processedTransactions:ProcessedTransaction[] = await this.processedTransactionRepository.findBetweenBlocks(result.startBlock, result.endBlock, options)
 

        //Get affected tokens. Reset lastTransactionId and owner
        const tokenIds = Array.from(new Set(processedTransactions.flatMap(({ tokenIds }) => tokenIds)))

        for (let tokenId of tokenIds) {

            if (!result.tokensToUpdate[tokenId]) {
                result.tokensToUpdate[tokenId] = await this.tokenService.get(tokenId, options)
            }

            let token = result.tokensToUpdate[tokenId]

            //Remove ownership history after start block
            // token.ownershipHistory = token.ownershipHistory?.filter(oh => oh.blockNumber < result.startBlock)
            
            //Remove transactions after start block
            token.transactionsViewModel.transactions = token.transactionsViewModel?.transactions.filter( tvm => tvm.transaction.blockNumber < result.startBlock)


            //Clone the view models and reverse them so we can find the previous owner.
            let clonedViewModel = JSON.parse(JSON.stringify(token.transactionsViewModel))

            clonedViewModel.transactions.reverse()

            //Set current owner to the last one before the start block
            let found = false

            for (let viewModel of clonedViewModel.transactions) {

                for (let event of viewModel.events) {
                    if (event.toAddress) {
                        token.currentOwnerId = event.toAddress
                        found = true
                        break
                    }
                }

                if (found) break

            }

        }


 

        //Get affected traders. Reset latestTransactionId
        const tokenTraders = Array.from(new Set(processedTransactions.flatMap(({ tokenTraderIds }) => tokenTraderIds)))
        
        for (let user of tokenTraders) {

            if (!result.ownersToUpdate[user]) {
                result.ownersToUpdate[user] = await this.tokenOwnerService.get(user, options)
            }

            //Remove transactions after start block
            result.ownersToUpdate[user].transactionsViewModel.transactions = result.ownersToUpdate[user].transactionsViewModel?.transactions.filter( tvm => tvm.transaction.blockNumber < result.startBlock)

            //Figure out which tokens they own 
            await this.tokenOwnerService.setTokenIds(result.ownersToUpdate[user])

        }


        //Delete transactions
        for (let transaction of processedTransactions) {
            await this.processedTransactionRepository.remove(transaction, options)

            //Remove from results so we don't retain it.
            delete result.processedTransactionViewModels[transaction._id]
        }



        //Delete any actual blocks or underlying transactions that are more than blockConfirmations old
        let blocks:Block[] = await this.blockService.findBetweenBlocks(result.endBlock - blockConfirmations, result.endBlock, options)
        let transactions:Transaction[] = await this.transactionService.findBetweenBlocks(result.endBlock - blockConfirmations, result.endBlock, options)
        
        
        for (let block of blocks) {
            console.log(`Clearing block #${block._id}`)
            await this.blockService.remove(block, options)
        }

        for (let transaction of transactions) {
            console.log(`Clearing transaction #${transaction._id}`)
            await this.transactionService.remove(transaction, options)
        }


    }

    async remove(processedTransaction:ProcessedTransaction, options?:any) : Promise<void> {
        return this.processedTransactionRepository.remove(processedTransaction, options)
    }

    async getPreviousByTokenId(tokenId:number,blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {
        return this.processedTransactionRepository.getPreviousByTokenId(tokenId, blockNumber, transactionIndex, options)
    }

    async getPreviousByInitiator(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {
        return this.processedTransactionRepository.getPreviousByInitiator(address, blockNumber, transactionIndex, options)
    }

    async getPreviousByTrader(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {
        return this.processedTransactionRepository.getPreviousByTrader(address, blockNumber, transactionIndex, options)
    }


    async buildTransactionPages(transactionsViewModel:TransactionsViewModel, perPage:number, options?:any) : Promise<ProcessedTransactionsPage[]> {

        let result: ProcessedTransactionsPage[] = []

        //Break into rows
        for (let i = 0; i < transactionsViewModel.transactions.length; i += perPage) {

            let allEvents:ProcessedEventViewModel[] = []

            let processedTransactions = transactionsViewModel.transactions.slice(i, i + perPage)

            for (let transaction of processedTransactions) {
                allEvents.push(...transaction.events)
            }

            // console.log(await this.getEnsFromEvents(allEvents, options))


            result.push({
                transactions: processedTransactions,
                rowItemViewModels: await this.getRowItemViewModels(allEvents),
                ens: await this.getEnsFromEvents(allEvents, options)
            })
        }

        return result

    }

    // async getTransactionsByToken(tokenIds:number[], lastUpdated:string, options?:any) {

    //     let allTokenTransactions = await this.listByTokens(tokenIds, options)
    //     let allTokenEvents = await this.processedTransactionRepository.getEventsByTokens(tokenIds)

    //     let transactionsByToken = {}
    

    //     //Add transactions to view models
    //     for (let transaction of allTokenTransactions) {
            
    //         for (let tokenId of transaction.tokenIds) {
    
    //             if (!transactionsByToken[tokenId]) {
    //               transactionsByToken[tokenId] = {
    //                 lastUpdated: lastUpdated,
    //                 transactions: [],
    //                 rowItemViewModels: []
    //               }
    //             }
          


    //             transactionsByToken[tokenId].transactions.push({
    //                 transaction: this._translateProcessedTransactionToViewModel(transaction),
    //                 events: events
    //             })
                        
    //         }

    //     }



    //     for (let tokenId of Object.keys(transactionsByToken)) {
    //         transactionsByToken[tokenId].rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenId(parseInt(tokenId))
    //     }

    //     return transactionsByToken
       

    // }



    attributeKeyToInteger(key:string) {
        let hash = 0, i, chr;

      if (key.length === 0) return hash

      for (i = 0; i < key.length; i++) {

        chr = key.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
      }
      
      return hash
    }

}



interface ProcessedTransactionsPage {
    lastUpdated?:string
    transactions?:TransactionViewModel[]
    rowItemViewModels?:{}
    ens:{}
}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:TransactionViewModel[],
    rowItemViewModels?:{}
    ens?:{}
}

interface ProcessedTransactionViewModel {
    _id?:string
    _rev?:string 
    blockNumber?:number
    transactionIndex?:number
    transactionFrom?:string
    tokenTraders?:string[]
    timestamp?:number
    tokenIds?:number[]
    transactionValue?:TransactionValue
    previousId?:string
}

interface ProcessedEventViewModel {
    isMint: boolean
    isBurn: boolean
    namedArgs: any
    tokenId: number
    fromAddress: string
    toAddress: string
    price: number
    currency: string
    usdValue: number
    event: string
}

interface TransactionViewModel {
    transaction?:ProcessedTransactionViewModel
    events?:ProcessedEventViewModel[]
}



export {
    ProcessedTransactionService, TransactionsViewModel, TransactionViewModel, ProcessedTransactionsPage
}

