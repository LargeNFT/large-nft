import { ProcessedTransaction } from "../dto/processed-transaction.js"
import { Transaction } from "../dto/transaction.js"
import { Changeset } from "../service/core/database-service.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction>
    put(processedTransaction:ProcessedTransaction) : Promise<void>
    putAll(processedTransactions:ProcessedTransaction[]) : Promise<void>
    list(limit: number, skip: number): Promise<ProcessedTransaction[]> 

}

let changesets:Changeset[] = [
    {
        id: '0',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['transaction.blockNumber', 'transaction.transactionIndex'],
                }
            })
           
        }
    }
]


export {
    ProcessedTransactionRepository, changesets
}
