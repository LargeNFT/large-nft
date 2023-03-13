import { inject, injectable } from "inversify"


import { ItemService } from "../../reader/service/item-service.js"
import { ProcessedEvent, ProcessedTransaction, Sale, SalesReport, AttributeSaleReport, AttributeOverallSales } from "../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../repository/processed-transaction-repository.js"
import { RowItemViewModel } from "../dto/item-page.js"


@injectable()
class ProcessedTransactionService {

    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    @inject("ItemService")
    private itemService:ItemService

    constructor() {}

    async get(_id:string) : Promise<TransactionViewModel> {
        return this.processedTransactionRepository.get(_id)
    }


    async getRowItemViewModels(processedEvents) {

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

    async getAttributeSalesReport(traitType:string, value:string): Promise<AttributeSaleReport> {
        return this.processedTransactionRepository.getAttributeSalesReport(traitType, value)
    }
    
    async getAttributesOverall(): Promise<AttributeOverallSales> {
        return this.processedTransactionRepository.getAttributesOverall()
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

interface TransactionValue {
    totalPrice?: number
    usdValue?:number
    currency?: string
    tokenPrice?: any,
    markets?: any
    aggregator?:string
    tokenIds?: number[]
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

interface ProcessedEventViewModel {
    isMint: boolean
    isBurn: boolean
    namedArgs: any
    tokenId: number
    fromAddress: string
    toAddress: string
    price: number
    currency: string
    usdValue: number
    event: string
}

interface TransactionViewModel {
    transaction?:ProcessedTransactionViewModel
    events?:ProcessedEventViewModel[]
}













interface SaleViewModel {
    sale:Sale
    item:RowItemViewModel
}


export {
    ProcessedTransactionService, TransactionsViewModel, SaleViewModel, TransactionViewModel
}

