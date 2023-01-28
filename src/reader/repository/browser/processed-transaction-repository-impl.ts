import axios from "axios"
import {  inject, injectable } from "inversify"
import { ProcessedTransaction, Sale, SalesReport } from "../../dto/processed-transaction.js"
import { TransactionsViewModel, TransactionViewModel } from "../../service/processed-transaction-service.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"



@injectable()
class ProcessedTransactionRepositoryBrowserImpl implements ProcessedTransactionRepository {


    @inject('baseURI') 
    private baseURI

    async get(_id: string): Promise<TransactionViewModel> {

        let processedTransaction
    

        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/transactions/${_id}.json`)
            processedTransaction = result.data

        } catch(ex) {
            console.log(ex)
        }

        return processedTransaction


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

    async getLargestSales(limit:number): Promise<Sale[]> {

        let largestSales
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/sales/largest-${limit}.json`)
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