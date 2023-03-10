import { AttributeSaleReport, AttributeSalesRow, OwnersByAttribute, ProcessedEvent, ProcessedTransaction, Sale, SalesReport, TokenOwnerSalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string, options?:any): Promise<ProcessedTransaction>
    getByIds(_ids:string[], options?:any) : Promise<ProcessedTransaction[]>
    getLatest(beforeBlock?:number, options?:any): Promise<ProcessedTransaction>
    put(processedTransaction:ProcessedTransaction, options?:any) : Promise<ProcessedTransaction>
    putAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void>
    putEvents(events:ProcessedEvent[], options?:any) : Promise<void>

    findBetweenBlocks(startBlock: number, endBlock: number, options?:any) : Promise<ProcessedTransaction[]>
    findEventsBetweenBlocks(startBlock: number, endBlock: number, options?:any) : Promise<ProcessedEvent[]>

    remove(processedTransaction:ProcessedTransaction, options?:any) : Promise<void>

    getEventsByTransaction(transaction:ProcessedTransaction, options?:any) : Promise<ProcessedEvent[]> 
    getEventsByTokens(tokenIds:number[], options?:any) : Promise<ProcessedEvent[]> 
    // getEventsByTransactions(transactions:ProcessedTransaction[], options?:any) : Promise<ProcessedEvent[]>
    // putEvents(events:ProcessedEvent[], options?:any)
    
    list(limit: number, skip: number, options?:any): Promise<ProcessedTransaction[]> 
    listByTokens(tokenIds:number[], options?:any) : Promise<ProcessedTransaction[]> 
    listByToken(tokenId:number, options?:any) : Promise<ProcessedTransaction[]>
    listByTrader(owner:string, options?:any) : Promise<ProcessedTransaction[]>
    listIds(limit:number, options?:any) : Promise<string[]>

    getSalesReport() : Promise<SalesReport>
    getAddressSalesReport(address:string) : Promise<SalesReport>
    getTokenSalesReport(tokenId:number) : Promise<SalesReport>

    
    getLargestSales(limit:number) : Promise<Sale[]>
    getSalesByAttribute(traitType:string, value:string) : Promise<Sale[]>
    getTokenOwnerSalesReport(_id:string) : Promise<TokenOwnerSalesReport>
    getAttributeSalesRows(timestamp:number, options?:any) : Promise<AttributeSalesRow[]>
    getAttributes() : Promise<any[]>
    getOwnersByAttribute(traitType:string, value:string, options?:any) : Promise<OwnersByAttribute[]>
    getLargestSalesByAttribute(traitType:string, value: string, limit:number, options?:any) : Promise<Sale[]>

    getPreviousByTokenId(tokenId:number, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> 
    getPreviousByInitiator(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> 
    getPreviousByTrader(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction>
}

export {
    ProcessedTransactionRepository
}
