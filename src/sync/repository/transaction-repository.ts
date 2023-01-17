import { Changeset } from "../../reader/service/core/database-service.js"
import { Transaction } from "../dto/transaction.js"


interface TransactionRepository {
    get(_id:string): Promise<Transaction>
    put(transaction:Transaction) : Promise<void>
    putAll(transactions:Transaction[]) : Promise<void>
    list(limit: number, skip: number): Promise<Transaction[]> 

}

let changesets:Changeset[] = [
    {
        id: '0',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['blockNumber', 'transactionIndex'],
                }
            })
           
        }
    }
]


export {
    TransactionRepository, changesets
}
