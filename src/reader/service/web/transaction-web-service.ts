// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { ProcessedEvent, ProcessedTransaction } from "../../dto/processed-transaction.js";


import { SchemaService } from "../core/schema-service.js";
import { ItemService } from "../item-service.js";
import { ProcessedTransactionService } from "../processed-transaction-service.js";

@injectable()
class TransactionWebService {

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("ProcessedTransactionService")
    private processedTransactionService:ProcessedTransactionService

    @inject("ItemService")
    private itemService:ItemService

    constructor(
        @inject("baseURI") private baseURI
    ) {}





    async listFrom(limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let lastUpdated

        if (!startId) {
            let latest = await this.getLatest()
            startId = latest._id
            lastUpdated = latest.lastUpdated
        }

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listFrom(limit, startId), lastUpdated)

    }

    async listTo(limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listTo(limit, startId))

    }


    async listByTokenFrom(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let lastUpdated

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/tokens/${tokenId}.json`)
            startId = result.data.latestTransactionId

            let latest = await this.getLatest()
            lastUpdated = latest.lastUpdated

        }

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenFrom(tokenId, limit, startId), lastUpdated)

    }

    async listByTokenTo(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenTo(tokenId, limit, startId))

    }





    async listByAddressFrom(address:string, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let lastUpdated


        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/tokenOwner/${address}.json`)
            startId = result.data.latestTransactionId

            let latest = await this.getLatest()
            lastUpdated = latest.lastUpdated

        }

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressFrom(address, limit, startId), lastUpdated)

    }

    async listByAddressTo(address:string, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressTo(address, limit, startId))

    }








    private async _getRowItemViewModels(processedEvents) {

        let result = {}

        let tokenIds = new Set<number>()

        for (let processedEvent of processedEvents) {

            if (processedEvent.tokenIds?.length) {
                processedEvent.tokenIds?.forEach( tokenId => {
                    if (!tokenId) return
                    tokenIds.add(tokenId)
                })
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

    async getLatest() {
        let result = await axios.get(`${this.baseURI}sync/transactions/latest.json`, {
            // query URL without using browser cache
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          })
        return result.data
    }

}

interface LatestTransactionInfo {
    _id: string
    lastUpdated:string
}

interface TransactionsViewModel {
    lastUpdated?:string
    transactions?:ProcessedTransaction[],
    rowItemViewModels?:{}
}

export {
    TransactionWebService
}