import { inject, injectable } from "inversify"

import { ProcessedTransactionRepository } from "../../sync/repository/processed-transaction-repository.js"
import { AttributeSaleReport, ProcessedEvent, ProcessedTransaction, Sale, SalesReport } from "../../sync/dto/processed-transaction.js"
import { ItemService } from "../../reader/service/item-service.js"


@injectable()
class ProcessedTransactionService {



    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    @inject("ItemService")
    private itemService:ItemService

    constructor() {}

    async get(_id:string, options?:any) {
        return this.processedTransactionRepository.get(_id,options)
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

    async listFrom(limit:number, startId:string, options?:any) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId, options)

            results.push(processedTransaction)

            let previousId = processedTransaction?.previousId

            //Get the previous
            if (previousId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(previousId, options)

                if (processedTransaction?._id != previousId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByTokenFrom(tokenId:number, limit:number, startId:string, options?:any) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {
            
            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId, options)

            if (!processedTransaction) {
                throw new Error(`Transaction not found ${startId}`)
            }

            results.push(processedTransaction)

            let previousByTokenId = processedTransaction?.previousByTokenIds[tokenId]

            //Get the previous
            if (previousByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTokenIds[tokenId], options)

                if (processedTransaction?._id != previousByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }




        return results

    }

    async getLatest(beforeBlock?:number, options?:any) : Promise<ProcessedTransaction> {
        return this.processedTransactionRepository.getLatest(beforeBlock, options)
    }

    private async _getRowItemViewModels(processedEvents) {

        let result = {}

        let tokenIds = new Set<number>()


        for (let processedEvent of processedEvents) {

            if (processedEvent.tokenIds?.length > 0) {

                for (let tokenId of processedEvent.tokenIds) {
                    if (!tokenId) continue
                    tokenIds.add(tokenId)
                }

            }

        }

        let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(Array.from(tokenIds))

        for (let rivm of rowItemViewModels) {
            result[rivm.tokenId] = rivm
        }

        return result

    }

    async translateTransactionsToViewModels(transactions:ProcessedTransaction[], lastUpdated?:string) : Promise<TransactionsViewModel> {

        let processedEvents:ProcessedEvent[] = [] //await this.getEventsByTransactions(transactions)

        for (let transaction of transactions) {
            if (transaction.processedEvents?.length > 0) {
                processedEvents.push(...transaction.processedEvents)
            }
        }

        let results:TransactionsViewModel = {
            lastUpdated: lastUpdated,
            transactions: transactions,
            rowItemViewModels: await this._getRowItemViewModels(processedEvents)
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

    async deleteBetweenBlocks(startBlock: number, endBlock: number, options?:any) {
        return this.processedTransactionRepository.deleteBetweenBlocks(startBlock, endBlock, options)
    }

    async deleteAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void> {
        return this.processedTransactionRepository.deleteAll(processedTransactions, options)
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

    // async putEvents(events:ProcessedEvent[], options?:any) {
    //     return this.processedTransactionRepository.putEvents(events, options)
    // }

    // async getEventsByTransactions(transactions:ProcessedTransaction[], options?:any) : Promise<ProcessedEvent[]> {
    //     return this.processedTransactionRepository.getEventsByTransactions(transactions, options)
    // }

}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:ProcessedTransaction[],
    rowItemViewModels?:{}
}



export {
    ProcessedTransactionService, TransactionsViewModel
}

