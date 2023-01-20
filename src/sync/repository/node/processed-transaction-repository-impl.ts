import {  inject, injectable } from "inversify"
import moment from "moment"

import {  ProcessedTransaction, Sale, SalesReport, SalesRow } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"



@injectable()
class ProcessedTransactionRepositoryNodeImpl implements ProcessedTransactionRepository {



    @inject("sequelize")
    private sequelize:Function

    async get(_id: string): Promise<ProcessedTransaction> {
        return ProcessedTransaction.findByPk(_id)
    }

    async put(processedTransaction: ProcessedTransaction, options?:any): Promise<ProcessedTransaction> {
        
        await processedTransaction.save(options)
        return processedTransaction 


    }
  
    async putAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void> {

        for (let processedTransaction of processedTransactions) {
            await this.put(processedTransaction,options)
        }
    }


    async list(limit: number, skip: number): Promise<ProcessedTransaction[]> {

        return ProcessedTransaction.findAll({
            limit: limit,
            offset: skip,
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        })

    }

    async generateSalesReport(): Promise<SalesReport> {

        let report:SalesReport = {}

        let yearDate:Date = moment().subtract(1, 'years').toDate()
        let monthDate:Date = moment().subtract(1, 'month').toDate()
        let dayDate:Date = moment().subtract(1, 'day').toDate()


        report.totals = await this.getSalesRow()
        report.yearTotals = await this.getSalesRow( Math.floor(yearDate.getTime() / 1000))
        report.monthTotals = await this.getSalesRow(Math.floor(monthDate.getTime() / 1000))
        report.dayTotals = await this.getSalesRow(Math.floor(dayDate.getTime() / 1000))

        return report

    }


    async getSalesRow(timestamp?:number) {

        let salesRow:SalesRow = {}

        if (!timestamp) timestamp = 0

        let s = await this.sequelize()

        const [totalPriceResults, metadata] = await s.query(`
                select 
                   COUNT(_id) as events, 
                   SUM(JSON_EXTRACT(transactionValue, '$.totalPrice')) as ethValue, 
                   AVG(JSON_EXTRACT(transactionValue, '$.totalPrice')) as averageEthValue 
                FROM 'processed-transaction' t  
                WHERE 
                    JSON_EXTRACT(transactionValue, '$.totalPrice') > 0 AND
                    t.timestamp > :timestamp
        `, {
            replacements: { timestamp: timestamp }
        })

        const [usdValueResults, metadata2] = await s.query(`
                select 
                   COUNT(_id) as events, 
                   SUM(JSON_EXTRACT(transactionValue, '$.usdValue')) as usdValue, 
                   AVG(JSON_EXTRACT(transactionValue, '$.usdValue')) as averageUsdValue 
                FROM 'processed-transaction' t  
                WHERE 
                JSON_EXTRACT(transactionValue, '$.usdValue') > 0 AND
                t.timestamp > :timestamp        
        `, {
            replacements: { timestamp: timestamp }
        })


        if (totalPriceResults?.length > 0) {
            salesRow.ethValue = totalPriceResults[0].ethValue
            salesRow.averageEthValue = totalPriceResults[0].averageEthValue
            salesRow.events = totalPriceResults[0].events
        }


        if (usdValueResults?.length > 0) {
            salesRow.usdValue = usdValueResults[0].usdValue
            salesRow.averageUsdValue = usdValueResults[0].averageUsdValue
        }

        return salesRow

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




    async generateLargestSales() : Promise<Sale[]> {
    
        let s = await this.sequelize()

        const [largestSalesResults, metadata] = await s.query(`
            select 
                JSON_EXTRACT(transactionValue, '$.tokenPrice') as tokenPrice,
                m.key as tokenId,
                datetime(t.timestamp, 'unixepoch') as date,
                JSON_EXTRACT(m.value, '$.price') as ethValue,
                JSON_EXTRACT(m.value, '$.currency') as currency,
                MAX(JSON_EXTRACT(m.value, '$.usdValue')) as usdValue
            FROM 'processed-transaction' t, JSON_EACH(tokenPrice) m  
            WHERE 
                tokenPrice IS NOT NULL
            GROUP BY tokenId
            ORDER BY usdValue desc 
            LIMIT 15;
        `)

        //Remove "tokenPrice" field. Just used interally for the query. Maybe can find a better fix.
        largestSalesResults.forEach( sale => {
            delete sale.tokenPrice 
        })


        return largestSalesResults

    }

}





export {
    ProcessedTransactionRepositoryNodeImpl
}