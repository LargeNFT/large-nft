import { AttributeSaleReport, ProcessedEvent, ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string, options?:any): Promise<ProcessedTransaction>
    getLatest(beforeBlock?:number, options?:any): Promise<ProcessedTransaction>
    put(processedTransaction:ProcessedTransaction, options?:any) : Promise<ProcessedTransaction>
    putAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void>
    findBetweenBlocks(startBlock: number, endBlock: number, options?:any) : Promise<ProcessedTransaction[]>
    deleteAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void>
    
    // getEventsByTransactions(transactions:ProcessedTransaction[], options?:any) : Promise<ProcessedEvent[]>
    // putEvents(events:ProcessedEvent[], options?:any)
    
    list(limit: number, skip: number, options?:any): Promise<ProcessedTransaction[]> 

    getSalesReport() : Promise<SalesReport>
    getAddressSalesReport(address:string) : Promise<SalesReport>
    getTokenSalesReport(tokenId:number) : Promise<SalesReport>
    getAttributeSalesReport() : Promise<AttributeSaleReport>

    getLargestSales(limit:number) : Promise<Sale[]>
    getSalesByAttribute(traitType:string, value:string) : Promise<Sale[]>

    getPreviousByTokenId(tokenId:number, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> 
    getPreviousByInitiator(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> 
    getPreviousByTrader(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction>
}

export {
    ProcessedTransactionRepository
}
