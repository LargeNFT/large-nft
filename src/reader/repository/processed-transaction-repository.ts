import { ProcessedTransaction } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction> 
}


export {
    ProcessedTransactionRepository
}
