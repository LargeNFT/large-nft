import axios from "axios"
import {  inject, injectable } from "inversify"
import { ProcessedTransaction, SalesReport } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"


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


    getSalesReport(): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }
    getAddressSalesReport(address: string): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }
    getTokenSalesReport(tokenId: number): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }
    getAttributeSalesReport(attributeName: string, attributeValue: string): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }

}





export {
    ProcessedTransactionRepositoryBrowserImpl
}