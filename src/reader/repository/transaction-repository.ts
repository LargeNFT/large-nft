import { ERCEvent } from "../dto/erc-event.js"
import { Transaction } from "../dto/transaction.js"
import { Changeset } from "../service/core/database-service.js"


interface TransactionRepository {
    get(_id:string): Promise<Transaction>
    put(transaction:Transaction) : Promise<void>
}

// let changesets:Changeset[] = [
//     {
//         id: '0',
//         changeset: async (db) => {

           
//         }
//     }
// ]


export {
    TransactionRepository//, changesets
}
