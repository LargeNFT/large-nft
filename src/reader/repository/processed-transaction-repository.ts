import { ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction> 
    getSalesReport(): Promise<SalesReport> 
    getLargestSales(limit:number) : Promise<Sale[]>
}


export {
    ProcessedTransactionRepository
}
