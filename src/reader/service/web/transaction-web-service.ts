// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { ProcessedEvent, ProcessedTransaction } from "../../dto/processed-transaction.js";


import { SchemaService } from "../core/schema-service.js";
import { ItemService } from "../item-service.js";
import { ProcessedTransactionService, TransactionsViewModel } from "../processed-transaction-service.js";

@injectable()
class TransactionWebService {

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("ProcessedTransactionService")
    private processedTransactionService:ProcessedTransactionService



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

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listFrom(limit, startId), lastUpdated)

    }

    async listTo(limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listTo(limit, startId))

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

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenFrom(tokenId, limit, startId), lastUpdated)

    }

    async listByTokenTo(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenTo(tokenId, limit, startId))

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

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressFrom(address, limit, startId), lastUpdated)

    }

    async listByAddressTo(address:string, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        return this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressTo(address, limit, startId))

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

    async getRecentActivity() {

        let result = await axios.get(`${this.baseURI}sync/transactions/recentActivity.json`, {
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



export {
    TransactionWebService
}