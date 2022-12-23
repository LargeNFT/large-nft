import axios from "axios"
import {  inject, injectable } from "inversify"
import { ProcessedTransaction } from "../../dto/processed-transaction.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { changesets, ProcessedTransactionRepository } from "../processed-transaction-repository.js"


@injectable()
class ProcessedTransactionRepositoryBrowserImpl implements ProcessedTransactionRepository {

    db:any
    dbName:string = "processed-transactions"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    @inject('baseURI') 
    private baseURI

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }



    async get(_id: string): Promise<ProcessedTransaction> {

        let processedTransaction
    
        try {
            processedTransaction = await this.db.get(_id)
        } catch(ex) {}

        if (!processedTransaction) {
            try {
                //Download it.
                let result = await axios.get(`${this.baseURI}sync/transactions/${_id}.json`)
                processedTransaction = result.data

                //Save it
                await this.db.put(processedTransaction)


            } catch(ex) {
                console.log(ex)
            }
        }

        return Object.assign(new ProcessedTransaction(), processedTransaction)


    }


    async put(processedTransaction: ProcessedTransaction): Promise<void> {
        await this.db.put(processedTransaction)
    }
  
    async putAll(processedTransactions:ProcessedTransaction[]) : Promise<void> {
        await this.db.bulkDocs(processedTransactions)
    }


    async list(limit: number, skip: number): Promise<ProcessedTransaction[]> {

        let response = await this.db.find({
            selector: { 
                "transaction.blockNumber": { 
                    $exists: true 
                },
                "transaction.transactionIndex": { 
                    $exists: true 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{"transaction.blockNumber": 'desc'}, {"transaction.transactionIndex": 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }

        return response.docs

    }


}





export {
    ProcessedTransactionRepositoryBrowserImpl
}