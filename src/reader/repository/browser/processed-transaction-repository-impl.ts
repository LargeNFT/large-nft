import axios from "axios"
import {  inject, injectable } from "inversify"
import { ProcessedTransaction } from "../../dto/processed-transaction.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { changesets, ProcessedTransactionRepository } from "../processed-transaction-repository.js"


@injectable()
class ProcessedTransactionRepositoryBrowserImpl implements ProcessedTransactionRepository {

    @inject('baseURI') 
    private baseURI

    async load() {}

    async get(_id: string): Promise<ProcessedTransaction> {

        let processedTransaction
    

        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/transactions/${_id}.json`)
            processedTransaction = result.data

        } catch(ex) {
            console.log(ex)
        }

        return Object.assign(new ProcessedTransaction(), processedTransaction)


    }


    async put(processedTransaction: ProcessedTransaction): Promise<void> {
    }
  
    async putAll(processedTransactions:ProcessedTransaction[]) : Promise<void> {
    }


    async list(limit: number, skip: number): Promise<ProcessedTransaction[]> {
        return 
    }


}





export {
    ProcessedTransactionRepositoryBrowserImpl
}