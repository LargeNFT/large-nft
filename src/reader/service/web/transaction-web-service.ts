// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { ERCEvent } from "../../dto/erc-event.js";
import { RowItemViewModel } from "../../dto/item-page.js";
import { Transaction } from "../../dto/transaction.js";

import { SchemaService } from "../core/schema-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { ItemService } from "../item-service.js";
import { TransactionService } from "../transaction-service.js";

@injectable()
class TransactionWebService {

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("TransactionService")
    private transactionService:TransactionService

    @inject("ItemService")
    private itemService:ItemService

    constructor(
        @inject("baseURI") private baseURI
    ) {}

    async get(_id:string) : Promise<TransactionViewModel> {

        await this.schemaService.load(["transactions"])

        let transaction:Transaction = await this.transactionService.get(_id)

        return this.translateTransactionToViewModel(transaction)

    }



    async listFrom(limit:number, startId?:string) : Promise<TransactionViewModel[]> {

        await this.schemaService.load(["transactions"])

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/transactions/latest.json`)
            startId = result.data._id
        }

        return this.translateTransactionsToViewModels(await this.transactionService.listFrom(limit, startId))

    }

    async listTo(limit:number, startId?:string) : Promise<TransactionViewModel[]> {

        await this.schemaService.load(["transactions"])

        return this.translateTransactionsToViewModels(await this.transactionService.listTo(limit, startId))

    }


    async listByTokenFrom(tokenId:number, limit:number, startId?:string) : Promise<TransactionViewModel[]> {

        await this.schemaService.load(["transactions"])

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/tokens/${tokenId}.json`)
            startId = result.data.latestTransactionId
        }

        return this.translateTransactionsToViewModels(await this.transactionService.listByTokenFrom(tokenId, limit, startId))

    }

    async listByTokenTo(tokenId:number, limit:number, startId?:string) : Promise<TransactionViewModel[]> {

        await this.schemaService.load(["transactions"])

        return this.translateTransactionsToViewModels(await this.transactionService.listByTokenTo(tokenId, limit, startId))

    }

    async translateTransactionToViewModel(transaction:Transaction) : Promise<TransactionViewModel>{

        let result:TransactionViewModel = {
            transaction: transaction
        }
    
        return result
    }

    async translateTransactionsToViewModels(transactions:Transaction[]) : Promise<TransactionViewModel[]> {

        let results:TransactionViewModel[] = []

        for (let event of transactions) {
            results.push(await this.translateTransactionToViewModel(event))
        }

        return results
    }

}


interface TransactionViewModel {
    transaction?:Transaction
}

export {
    TransactionWebService
}