import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"


import { ItemService } from "../../reader/service/item-service.js"
import { ValidationException } from "../../reader/util/validation-exception.js"
import { ProcessedEvent, ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../repository/processed-transaction-repository.js"
import { RowItemViewModel } from "../dto/item-page.js"


@injectable()
class ProcessedTransactionService {

    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    @inject("ItemService")
    private itemService:ItemService

    constructor() {}

    async get(_id:string) {
        return this.processedTransactionRepository.get(_id)
    }

    async listFrom(limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)
            results.push(processedTransaction)

            let previousId = processedTransaction?.transaction.previousId

            //Get the previous
            if (previousId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(previousId)

                if (processedTransaction?.transaction._id != previousId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listTo(limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextId = processedTransaction?.transaction.nextId

            //Get the previous
            if (nextId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction.transaction.nextId)

                if (processedTransaction?.transaction._id != nextId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByTokenFrom(tokenId:number, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTokenId = processedTransaction?.transaction.previousByTokenIds[tokenId]

            //Get the previous
            if (previousByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.previousByTokenIds[tokenId])

                if (processedTransaction?.transaction._id != previousByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByTokenTo(tokenId:number, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.transaction.nextByTokenIds[tokenId]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.nextByTokenIds[tokenId])

                if (processedTransaction?.transaction._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByAddressInitiatedFrom(address:string, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.transaction.previousByTransactionInitiatorId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.previousByTransactionInitiatorId[address])

                if (processedTransaction?.transaction._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByAddressInitiatedTo(address:string, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.transaction.nextByTransactionInitiatorId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.nextByTransactionInitiatorId[address])

                if (processedTransaction?.transaction._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByAddressFrom(address:string, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.transaction.previousByTokenOwnerId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.previousByTokenOwnerId[address])

                if (processedTransaction?.transaction._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

    }

    async listByAddressTo(address:string, limit:number, startId:string) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:TransactionViewModel = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.transaction.nextByTokenOwnerId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.transaction.nextByTokenOwnerId[address])

                if (processedTransaction?.transaction._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?.transaction._id
        }

        return results

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

    async translateTransactionsToViewModels(transactions:TransactionViewModel[], lastUpdated?:string) : Promise<TransactionsViewModel> {

        let processedEvents:ProcessedEvent[] = []

        for (let transaction of transactions) {
            if (transaction.events?.length > 0) {
                processedEvents.push(...transaction.events)
            }
        }

        let results:TransactionsViewModel = {
            lastUpdated: lastUpdated,
            transactions: transactions,
            rowItemViewModels: await this._getRowItemViewModels(processedEvents)
        }

        return results
    }

    async translateSalesToViewModels(sales:Sale[]) : Promise<SaleViewModel[]> {

        let viewModels:SaleViewModel[] = []

        for (let sale of sales) {
            viewModels.push({
                sale: sale,
                item: await this.itemService.getRowItemViewModelsByTokenId(sale.tokenId)
            })
        }

        return viewModels
    }

    async getSalesReport(): Promise<SalesReport> {
        return this.processedTransactionRepository.getSalesReport()
    }

    async getLargestSales(limit:number) : Promise<Sale[]> {
        return this.processedTransactionRepository.getLargestSales(limit)
    }

}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:TransactionViewModel[],
    rowItemViewModels?:{}
}

interface TransactionViewModel {
    transaction?:ProcessedTransaction
    events?:ProcessedEvent[]
}

interface SaleViewModel {
    sale:Sale
    item:RowItemViewModel
}

export {
    ProcessedTransactionService, TransactionsViewModel, SaleViewModel, TransactionViewModel
}

