import { ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction>
    put(processedTransaction:ProcessedTransaction, options?:any) : Promise<ProcessedTransaction>
    putAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void>
    list(limit: number, skip: number): Promise<ProcessedTransaction[]> 

    generateSalesReport() : Promise<SalesReport>
    getAddressSalesReport(address:string) : Promise<SalesReport>
    getTokenSalesReport(tokenId:number) : Promise<SalesReport>
    getAttributeSalesReport(attributeName:string, attributeValue:string) : Promise<SalesReport>

    generateLargestSales() : Promise<Sale[]>


}

export {
    ProcessedTransactionRepository
}
