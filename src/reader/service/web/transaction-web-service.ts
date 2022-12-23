// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { ProcessedTransaction } from "../../dto/processed-transaction.js";


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

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/transactions/latest.json`)
            startId = result.data._id
        }

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listFrom(limit, startId))

    }

    async listTo(limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listTo(limit, startId))

    }


    async listByTokenFrom(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/tokens/${tokenId}.json`)
            startId = result.data.latestTransactionId
        }

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenFrom(tokenId, limit, startId))

    }

    async listByTokenTo(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenTo(tokenId, limit, startId))

    }

    // async translateTransactionToViewModel(transaction:Transaction) : Promise<TransactionsViewModel>{

    //     let result:TransactionsViewModel = {
    //         transactions: [transaction],
    //         rowItemViewModels: await this._getRowItemViewModels(transaction.ercEvents)
    //     }

    //     return result
    // }

    private async _getRowItemViewModels(ercEvents) {

        let result = {}

        let tokenIds = new Set<number>()

        for (let ercEvent of ercEvents) {

            if (ercEvent.tokenId) {
                tokenIds.add(ercEvent.tokenId)
            }

        }


        let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(Array.from(tokenIds))

        for (let rivm of rowItemViewModels) {
            result[rivm.tokenId] = rivm
        }

        return result

    }


    async translateTransactionsToViewModels(transactions:ProcessedTransaction[]) : Promise<TransactionsViewModel> {

        let ercEvents = []

        for (let transaction of transactions) {
            if (transaction.ercEvents?.length > 0) {
                ercEvents.push(...transaction.ercEvents)
            }
        }

        let results:TransactionsViewModel = {
            transactions: transactions,
            rowItemViewModels: await this._getRowItemViewModels(ercEvents)
        }



        return results
    }

}


interface TransactionsViewModel {
    transactions?:ProcessedTransaction[],
    rowItemViewModels:{}
}

export {
    TransactionWebService
}