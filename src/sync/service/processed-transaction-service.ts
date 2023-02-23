import { inject, injectable } from "inversify"

import { ProcessedTransactionRepository } from "../../sync/repository/processed-transaction-repository.js"
import { AttributeSaleReport, ProcessedEvent, ProcessedTransaction, Sale, SalesReport, TokenOwnerSalesReport, TransactionValue } from "../../sync/dto/processed-transaction.js"
import { ItemService } from "../../reader/service/item-service.js"
import { Token } from "../dto/token.js"
import { TokenService } from "./token-service.js"
import { TokenOwner } from "../dto/token-owner.js"
import { TokenOwnerService } from "./token-owner-service.js"
import { ERCIndexResult } from "./transaction-indexer-service.js"
import { Block } from "../dto/block.js"
import { BlockService } from "./block-service.js"
import { Transaction } from "../dto/transaction.js"
import { TransactionService } from "./transaction-service.js"


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

    constructor() {}

    async get(_id:string, options?:any) {
        return this.processedTransactionRepository.get(_id,options)
    }

    async getViewModel(_id:string, options?:any) : Promise<TransactionViewModel> {

        let transaction = await this.processedTransactionRepository.get(_id, options)
        if (!transaction) return


        let events = await this.processedTransactionRepository.getEventsByTransaction(transaction)

        return {
            transaction: transaction,
            events: events
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

    async getLatest(beforeBlock?:number, options?:any) : Promise<ProcessedTransaction> {

        return this.processedTransactionRepository.getLatest(beforeBlock, options)

    }

    async getLatestViewModel(beforeBlock?:number, options?:any) : Promise<TransactionViewModel> {

        let transaction = await this.processedTransactionRepository.getLatest(beforeBlock, options)
        if (!transaction) return

        let events = await this.processedTransactionRepository.getEventsByTransaction(transaction)

        return {
            transaction: transaction,
            events: events
        }

    }

    private async _getRowItemViewModels(processedEvents) {

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

    async translateTransactionsToViewModels(transactions:ProcessedTransaction[], lastUpdated?:string, options?:any) : Promise<TransactionsViewModel> {

        let transactionViewModels:TransactionViewModel[] = []

        let allEvents:ProcessedEvent[] = []

        for (let transaction of transactions) {

            let processedEvents:ProcessedEvent[] = await this.processedTransactionRepository.getEventsByTransaction(transaction, options)

            transactionViewModels.push({
                transaction: {
                    _id: transaction._id,
                    _rev: transaction._rev,
                    blockNumber: transaction.blockNumber,
                    transactionIndex: transaction.transactionIndex,
                    transactionFrom: transaction.transactionFrom,
                    tokenTraders: transaction.tokenTraders,
                    timestamp: transaction.timestamp,
                    tokenIds: transaction.tokenIds,
                    transactionValue: transaction.transactionValue,
                    previousId: transaction.previousId
                },
                events: processedEvents
            })

            allEvents.push(...processedEvents)
        }

        let results:TransactionsViewModel = {
            lastUpdated: lastUpdated,
            transactions: transactionViewModels,
            rowItemViewModels: await this._getRowItemViewModels(allEvents)
        }

        return results
    }

    async getSalesReport() : Promise<SalesReport> {
        return this.processedTransactionRepository.getSalesReport()
    }

    async getAttributeSalesReport(): Promise<AttributeSaleReport> {
        return this.processedTransactionRepository.getAttributeSalesReport()
    }

    async getLargestSales(limit:number) : Promise<Sale[]> {
        return this.processedTransactionRepository.getLargestSales(limit)
    }

    async getSalesByAttribute(traitType:string, value:string) : Promise<Sale[]> {
        return this.processedTransactionRepository.getSalesByAttribute(traitType, value)
    }

    async getTokenOwnerSalesReport(_id:string) : Promise<TokenOwnerSalesReport> {
        return this.processedTransactionRepository.getTokenOwnerSalesReport(_id)
    }


    async deleteBetweenBlocks(result:ERCIndexResult, blockConfirmations:number, options?:any)  {

        console.log(`Deleting between block #${result.startBlock} - ${result.endBlock}`)

        let processedTransactions:ProcessedTransaction[] = await this.processedTransactionRepository.findBetweenBlocks(result.startBlock, result.endBlock, options)
 

        //Get affected tokens. Reset lastTransactionId and owner
        const tokenIds = Array.from(new Set(processedTransactions.flatMap(({ tokenIds }) => tokenIds)))

        for (let tokenId of tokenIds) {

            let token:Token = await this.tokenService.get(tokenId, options)

            //Remove ownership history after start block
            token.ownershipHistory = token.ownershipHistory?.filter(oh => oh.blockNumber < result.startBlock)
            
            //Set current owner to the last one before the start block
            if (token.ownershipHistory?.length > 0) {
                token.currentOwnerId = token.ownershipHistory[token.ownershipHistory.length-1].owner
            }

            result.tokensToUpdate[token._id] = token

        }


        //Not sure if this part with the users accomplishes anything. I don't think it hurts. Leaving for now.


        //Get affected initiators. Add to list to get updated.
        const initiators = Array.from(new Set(processedTransactions.map(t => t.transactionFrom)))

        for (let user of initiators) {
            let tokenOwner:TokenOwner = await this.tokenOwnerService.get(user, options)
            result.ownersToUpdate[tokenOwner._id] = tokenOwner
        }

        //Get affected traders. Reset latestTransactionId
        const tokenTraders = Array.from(new Set(processedTransactions.flatMap(({ tokenTraders }) => tokenTraders)))
        
        for (let user of tokenTraders) {
            let tokenOwner:TokenOwner = await this.tokenOwnerService.get(user, options)
            result.ownersToUpdate[tokenOwner._id] = tokenOwner
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


    async buildTransactionPages(transactionsViewModel:TransactionsViewModel, perPage:number) : Promise<ProcessedTransactionsPage[]> {

        let result: ProcessedTransactionsPage[] = []

        //Break into rows
        for (let i = 0; i < transactionsViewModel.transactions.length; i += perPage) {

            let allEvents:ProcessedEvent[] = []

            let processedTransactions = transactionsViewModel.transactions.slice(i, i + perPage)

            for (let transaction of processedTransactions) {
                allEvents.push(...transaction.events)
            }

            result.push({
                processedTransactions: processedTransactions,
                rowItemViewModels: await this._getRowItemViewModels(allEvents)
            })
        }

        return result

    }



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
    processedTransactions?:TransactionViewModel[]
    rowItemViewModels?:{}
}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:TransactionViewModel[],
    rowItemViewModels?:{}
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


interface TransactionViewModel {
    transaction?:ProcessedTransactionViewModel
    events?:ProcessedEvent[]
}



export {
    ProcessedTransactionService, TransactionsViewModel, TransactionViewModel, ProcessedTransactionsPage
}

