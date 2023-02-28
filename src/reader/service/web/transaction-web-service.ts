// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { AttributeOverallSales, AttributeSaleReport, SalesReport } from "../../dto/processed-transaction.js";


import { SchemaService } from "../core/schema-service.js";
import { ProcessedTransactionService, SaleViewModel, TransactionsViewModel } from "../processed-transaction-service.js";
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

    async list(page?:number) : Promise<TransactionsViewModel> {

        let latest = await this.getLatest()


        let result = await axios.get(`${this.baseURI}sync/transactions/activity/${page}.json`)

        console.log(result)

        let transactionsViewModel = result.data

        transactionsViewModel.lastUpdated = latest.lastUpdated

        await this.cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }


    async listByAddress(address:string, page:number) : Promise<TransactionsViewModel> {
        
        let result = await axios.get(`${this.baseURI}sync/tokenOwner/${address}/activity/${page}.json`)

        let transactionsViewModel = result.data


        let latest = await this.getLatest()
        transactionsViewModel.lastUpdated = latest.lastUpdated


        await this.cacheENSNames(transactionsViewModel)

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


        await this.cacheENSNames(transactionsViewModel)

        return transactionsViewModel

    }


    getDisplayName(_id) {
        return this._ENSCache[_id]
    }

    async getSalesReport(): Promise<SalesReport> {
        return this.processedTransactionService.getSalesReport()
    }

    async getAttributeSalesReport(traitType:string, value:string): Promise<AttributeSaleReport> {

        let report = await this.processedTransactionService.getAttributeSalesReport(traitType, value)

        if (!report) return

        //@ts-ignore
        report.largestSalesViewModels = await this.processedTransactionService.translateSalesToViewModels(report.largestSales)
        delete report.largestSales

        return report
    }

    async getAttributesOverall(): Promise<AttributeOverallSales> {
        return this.processedTransactionService.getAttributesOverall()
    }


    async getLargestSales(limit:number): Promise<SaleViewModel[]> {

        let sales = await  this.processedTransactionService.getLargestSales(limit)

        return this.processedTransactionService.translateSalesToViewModels(sales)

    }

    abbreviateDollars(number, digits) {

        if (!number) return "$0"

        var SI_SYMBOL = ["", "", "M", "G", "T", "P", "E"]


        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0

        // if zero or thousands, we don't need a suffix
        if(tier == 0 || tier == 1) {
          let result = new Intl.NumberFormat('en-US', { currency: "USD", style:"currency" }).format(number)
          return result
        }

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return new Intl.NumberFormat('en-US', { currency: "USD", style:"currency" }).format(scaled) + suffix
    }

    private async _cacheDisplayName(_id) {

        if (!this._ENSCache[_id]) {
            this._ENSCache[_id] = await this.tokenOwnerService.getDisplayName(_id)
        }

    }

    async cacheENSNames(transactionsViewModel:TransactionsViewModel) {

        for (let transaction of transactionsViewModel.transactions) {

            for (let processedEvent of transaction.events) {

                if (processedEvent.fromAddress ) {
                    await this._cacheDisplayName(processedEvent.fromAddress)
                }
    
    
                if (processedEvent.toAddress ) {
                    await this._cacheDisplayName(processedEvent.toAddress)
                }
    
    
                if (processedEvent.namedArgs.owner ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.owner)
                }
    
    
                if (processedEvent.namedArgs.operator ) {
                    await this._cacheDisplayName(processedEvent.namedArgs.operator)
                }
                
            }


            await this._cacheDisplayName(transaction.transaction.transactionFrom)
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