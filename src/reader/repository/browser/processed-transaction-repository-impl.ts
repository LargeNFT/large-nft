import axios from "axios"
import {  inject, injectable } from "inversify"
import { AttributeOverallSales, AttributeSaleReport, ProcessedTransaction, Sale, SalesReport } from "../../dto/processed-transaction.js"
import { TransactionsViewModel, TransactionViewModel } from "../../service/processed-transaction-service.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"



@injectable()
class ProcessedTransactionRepositoryBrowserImpl implements ProcessedTransactionRepository {



    @inject('baseURI') 
    private baseURI:Function

    async get(_id: string): Promise<TransactionViewModel> {

        let processedTransaction
    

        try {
            //Download it.
            let result = await axios.get(`${this.baseURI()}sync/transactions/${_id}.json`)
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
            let result = await axios.get(`${this.baseURI()}sync/sales/overall.json`)
            salesReport = result.data

        } catch(ex) {
            console.log(ex)
        }

        return salesReport

    }

    async getAttributeSalesReport(traitType:string, value:string): Promise<AttributeSaleReport> {

        let attributeSalesReport
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${traitType}::::${value}`)}/attribute.json`)
            attributeSalesReport = result.data

        } catch(ex) {
            console.log(ex)
        }

        return attributeSalesReport
    }

    async getAttributesOverall(): Promise<AttributeOverallSales> {

        let attributeOverallSales
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI()}sync/attributes/totals.json`)
            attributeOverallSales = result.data

        } catch(ex) {
            console.log(ex)
        }

        return attributeOverallSales

    }

    private attributeKeyToInteger(key:string) {

        let hash = 0, i, chr
  
        if (key.length === 0) return hash
  
        for (i = 0; i < key.length; i++) {
  
          chr = key.charCodeAt(i)
          hash = ((hash << 5) - hash) + chr
          hash |= 0 // Convert to 32bit integer
        }
        
        return hash
    }

    async getLargestSales(limit:number): Promise<Sale[]> {

        let largestSales
    
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI()}sync/sales/largest-${limit}.json`)
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