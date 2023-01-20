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

    async listFrom(limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)
            results.push(processedTransaction)

            let previousId = processedTransaction?.previousId

            //Get the previous
            if (previousId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(previousId)

                if (processedTransaction?._id != previousId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listTo(limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextId = processedTransaction?.nextId

            //Get the previous
            if (nextId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction.nextId)

                if (processedTransaction?._id != nextId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByTokenFrom(tokenId:number, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            console.log(startId)
            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            console.log(processedTransaction)

            results.push(processedTransaction)

            let previousByTokenId = processedTransaction?.previousByTokenIds[tokenId]

            //Get the previous
            if (previousByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTokenIds[tokenId])

                if (processedTransaction?._id != previousByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByTokenTo(tokenId:number, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTokenIds[tokenId]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTokenIds[tokenId])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressInitiatedFrom(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.previousByTransactionInitiatorId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTransactionInitiatorId[address])

                if (processedTransaction?._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressInitiatedTo(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTransactionInitiatorId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTransactionInitiatorId[address])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressFrom(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.previousByTokenOwnerId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTokenOwnerId[address])

                if (processedTransaction?._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressTo(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTokenOwnerId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTokenOwnerId[address])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

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

        let processedEvents:ProcessedEvent[] = []

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

    async getLargestSales() : Promise<Sale[]> {
        return this.processedTransactionRepository.getLargestSales()
    }

}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:ProcessedTransaction[],
    rowItemViewModels?:{}
}

interface SaleViewModel {
    sale:Sale
    item:RowItemViewModel
}

export {
    ProcessedTransactionService, TransactionsViewModel, SaleViewModel
}

