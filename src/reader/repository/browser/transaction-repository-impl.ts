import {  inject, injectable } from "inversify"
import { Transaction } from "../../dto/transaction.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { TransactionRepository } from "../transaction-repository.js"


@injectable()
class TransactionRepositoryBrowserImpl implements TransactionRepository {

    db:any
    dbName:string = "transactions"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }



    async get(_id: string): Promise<Transaction> {
        return Object.assign(new Transaction(), await this.db.get(_id))
    }


    async put(transaction: Transaction): Promise<void> {
        await this.db.put(transaction)
    }
  
    async putAll(transactions:Transaction[]) : Promise<void> {
        await this.db.bulkDocs(transactions)
    }


    async list(limit: number, skip: number): Promise<Transaction[]> {

        let response = await this.db.find({
            selector: { 
                "blockNumber": { 
                    $exists: true 
                },
                "transactionIndex": { 
                    $exists: true 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{blockNumber: 'desc'}, {transactionIndex: 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }

        return response.docs

    }


}





export {
    TransactionRepositoryBrowserImpl
}