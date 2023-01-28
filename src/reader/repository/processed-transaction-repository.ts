import { ProcessedTransaction, Sale, SalesReport } from "../dto/processed-transaction.js"
import { TransactionsViewModel, TransactionViewModel } from "../service/processed-transaction-service.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<TransactionViewModel> 
    getSalesReport(): Promise<SalesReport> 
    getLargestSales(limit:number) : Promise<Sale[]>
}


export {
    ProcessedTransactionRepository
}
