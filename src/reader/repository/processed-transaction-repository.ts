import { ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction> 
    getSalesReport(): Promise<SalesReport> 
    getLargestSales() : Promise<Sale[]>
}


export {
    ProcessedTransactionRepository
}
