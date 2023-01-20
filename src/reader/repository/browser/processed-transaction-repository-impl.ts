import axios from "axios"
import {  inject, injectable } from "inversify"
import { ProcessedTransaction, Sale, SalesReport } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"



@injectable()
class ProcessedTransactionRepositoryBrowserImpl implements ProcessedTransactionRepository {


    @inject('baseURI') 
    private baseURI

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

    async getSalesReport(): Promise<SalesReport> {

        let salesReport
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/sales/overall.json`)
            salesReport = result.data

        } catch(ex) {
            console.log(ex)
        }

        return salesReport


    }

    async getLargestSales(): Promise<Sale[]> {

        let largestSales
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/sales/largest.json`)
            largestSales = result.data

        } catch(ex) {
            console.log(ex)
        }

        return largestSales
    }



}





export {
    ProcessedTransactionRepositoryBrowserImpl
}