// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";


import { SchemaService } from "../core/schema-service.js";
import { ProcessedTransactionService, TransactionsViewModel } from "../processed-transaction-service.js";
import { TokenOwnerService } from "../token-owner-service.js";

@injectable()
class TransactionWebService {

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("ProcessedTransactionService")
    private processedTransactionService:ProcessedTransactionService

    @inject("TokenOwnerService")
    private tokenOwnerService:TokenOwnerService


    private _ENSCache = {}

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

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listFrom(limit, startId), lastUpdated)

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }

    async listTo(limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listTo(limit, startId))

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

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

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenFrom(tokenId, limit, startId), lastUpdated)

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }

    async listByTokenTo(tokenId:number, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByTokenTo(tokenId, limit, startId))

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

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

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressFrom(address, limit, startId), lastUpdated)

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }

    async listByAddressTo(address:string, limit:number, startId?:string) : Promise<TransactionsViewModel> {

        await this.schemaService.load(["processed-transactions"])

        let transactionsViewModel = await this.processedTransactionService.translateTransactionsToViewModels(await this.processedTransactionService.listByAddressTo(address, limit, startId))

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

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

    async getRecentActivity() : Promise<TransactionsViewModel> {

        let result = await axios.get(`${this.baseURI}sync/transactions/recentActivity.json`, {
            // query URL without using browser cache
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          })

        let transactionsViewModel:TransactionsViewModel = result.data

        await this._cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }


    async getTokenActivity(tokenId:number) : Promise<TransactionsViewModel> {

        let result = await axios.get(`${this.baseURI}sync/tokens/${tokenId}-activity.json`, {
            // query URL without using browser cache
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          })

          let transactionsViewModel:TransactionsViewModel = result.data

          await this._cacheENSNames(transactionsViewModel)
  
          return transactionsViewModel
    }

    getDisplayName(_id) {
        return this._ENSCache[_id]
    }

    private async _cacheDisplayName(_id) {

        if (!this._ENSCache[_id]) {
            this._ENSCache[_id] = await this.tokenOwnerService.getDisplayName(_id)
        }

    }


    private async _cacheENSNames(transactionsViewModel:TransactionsViewModel) {

        for (let transaction of transactionsViewModel.transactions) {

            for (let processedEvent of transaction.processedEvents) {

                if (processedEvent.namedArgs.fromAddress ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.fromAddress)
                }


                if (processedEvent.namedArgs.toAddress ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.toAddress)
                }


                if (processedEvent.namedArgs.owner ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.owner)
                }


                if (processedEvent.namedArgs.operator ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.operator)
                }
                
            }

            await this._cacheDisplayName(transaction.from)

        }

        
    }


}

interface LatestTransactionInfo {
    _id: string
    lastUpdated:string
}



export {
    TransactionWebService
}