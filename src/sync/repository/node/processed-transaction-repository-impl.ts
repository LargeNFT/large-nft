import {  inject, injectable } from "inversify"
import moment from "moment"

import {  AttributeSaleReport, AttributeSalesRow, ProcessedTransaction, Sale, SalesReport, SalesRow } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"


import { createRequire } from 'module'
const require = createRequire(import.meta.url)

@injectable()
class ProcessedTransactionRepositoryNodeImpl implements ProcessedTransactionRepository {

    @inject("sequelize")
    private sequelize:Function

    @inject("baseDir")
    private baseDir:string

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

    async getSalesReport(): Promise<SalesReport> {

        let report:SalesReport = {}

        let yearDate:Date = moment().subtract(1, 'years').toDate()
        let monthDate:Date = moment().subtract(1, 'month').toDate()
        let dayDate:Date = moment().subtract(1, 'day').toDate()


        report.totals = await this.getSalesRow()
        report.yearTotals = await this.getSalesRow( Math.floor(yearDate.getTime() / 1000) )
        report.monthTotals = await this.getSalesRow( Math.floor(monthDate.getTime() / 1000))
        report.dayTotals = await this.getSalesRow( Math.floor(dayDate.getTime() / 1000) )

        return report

    }

    async getAttributeSalesReport(): Promise<AttributeSaleReport> {

        let report:AttributeSaleReport = {}


        let yearDate:Date = moment().subtract(1, 'years').toDate()
        let monthDate:Date = moment().subtract(1, 'month').toDate()
        let dayDate:Date = moment().subtract(1, 'day').toDate()

        report.totals = await this.getAttributeSalesRows()
        // report.yearTotals = await this.getAttributeSalesRow( Math.floor(yearDate.getTime() / 1000) )
        // report.monthTotals = await this.getAttributeSalesRow(  Math.floor(monthDate.getTime() / 1000))
        // report.dayTotals = await this.getAttributeSalesRow(  Math.floor(dayDate.getTime() / 1000) )


        return report
    }

    async getAddressSalesReport(address: string): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }

    async getTokenSalesReport(tokenId: number): Promise<SalesReport> {
        throw new Error("Method not implemented.")
    }



    private async getSalesRow(timestamp?:number) {

        let salesRow:SalesRow = {}

        if (!timestamp) timestamp = 0

        let s = await this.sequelize()
        
        const [queryResults, metadata] = await s.query(`
            select 

            JSON_EXTRACT(transactionValue, '$.tokenPrice') as tokenPrice,
            COUNT(_id) as events, 
        
            SUM(JSON_EXTRACT(transactionValue, '$.totalPrice')) as ethValue, 
            AVG(JSON_EXTRACT(transactionValue, '$.totalPrice')) as averageEthValue,
        
            SUM(JSON_EXTRACT(transactionValue, '$.usdValue')) as usdValue, 
            AVG(JSON_EXTRACT(transactionValue, '$.usdValue')) as averageUsdValue,
            
            m.*
            
            FROM 'processed-transaction' t, JSON_EACH(tokenPrice) m  
            
            WHERE 
                JSON_EXTRACT(transactionValue, '$.totalPrice') > 0 AND
                t.timestamp >= :timestamp
                
        `, {
            replacements: { 
                timestamp: timestamp
            }
        })


        if (queryResults?.length > 0) {
            salesRow.ethValue = queryResults[0].ethValue
            salesRow.averageEthValue = queryResults[0].averageEthValue
            salesRow.events = queryResults[0].events

            salesRow.usdValue = queryResults[0].usdValue
            salesRow.averageUsdValue = queryResults[0].averageUsdValue
        }

        return salesRow

    }

    private async getAttributeSalesRows(timestamp?:number) : Promise<AttributeSalesRow[]> {

        let salesRows:AttributeSalesRow[] = []

        if (!timestamp) timestamp = 0

        let s = await this.sequelize()

        // const self = this

        // return new Promise(function(resolve, reject) {

        //     let db = new sqlite3.Database(`${self.baseDir}/sync/data.sqlite`)

        //     // db.run("UPDATE tbl SET name = $name WHERE id = $id", {
        //     //     $timestamp: timestamp
        //     // });
        //     console.log(1)

        //     db.all(`
    
        //         select 
    
        //             JSON_EXTRACT(transactionValue, '$.tokenPrice') as tokenPrice,
                    
        //             COUNT(t._id) as events,
        //             SUM(JSON_EXTRACT(m.value, '$.price')) as ethValue,
        //             SUM(JSON_EXTRACT(m.value, '$.usdValue')) as usdValue,
                    
        //             AVG(JSON_EXTRACT(m.value, '$.price')) as averageEthValue,
        //             AVG(JSON_EXTRACT(m.value, '$.usdValue')) as averageUsdValue,
                
        //             tok.traitType,
        //             tok.v
                    
        //         FROM (
        //             select 
        //                 DISTINCT JSON_EXTRACT(a.value, '$.traitType') traitType, JSON_EXTRACT(a.value, '$.value') v
        //             FROM 'token' t, JSON_EACH(attributeSelections) a ORDER BY traitType asc, v asc
        //         ) attr
        //         INNER JOIN (
        //             select 
        //                 t.tokenId as tokenId,
        //                 JSON_EXTRACT(a.value, '$.traitType') as traitType,
        //                 JSON_EXTRACT(a.value, '$.value') as v
        //             FROM 'token' t, JSON_EACH(attributeSelections) a
        //         ) tok on tok.traitType = attr.traitType AND tok.v = attr.v
        //         INNER JOIN 'processed-transaction' t, JSON_EACH(tokenPrice) m  on tok.tokenId = m.key
        //         WHERE 
        //             JSON_EXTRACT(transactionValue, '$.totalPrice') > 0 AND
        //             t.timestamp >= ?
        //         GROUP BY tok.traitType, tok.v
        //         order by usdValue desc 
                
        //     `, [timestamp], (err, rows) => {
    
        //         console.log(12)


        //         // close the database connection
        //         db.close()

        //         if (err) {
        //             reject(err)
        //         }

        //         resolve(rows)

        //     })
            


        //     return salesRows
        // })




        
        const [queryResults, metadata] = await s.query(`

            select 

                JSON_EXTRACT(transactionValue, '$.tokenPrice') as tokenPrice,
                
                COUNT(t._id) as events,
                SUM(JSON_EXTRACT(m.value, '$.price')) as ethValue,
                SUM(JSON_EXTRACT(m.value, '$.usdValue')) as usdValue,
                
                AVG(JSON_EXTRACT(m.value, '$.price')) as averageEthValue,
                AVG(JSON_EXTRACT(m.value, '$.usdValue')) as averageUsdValue,
            
                tok.traitType,
                tok.v
                
            FROM (
                select 
                    DISTINCT JSON_EXTRACT(a.value, '$.traitType') traitType, JSON_EXTRACT(a.value, '$.value') v
                FROM 'token' t, JSON_EACH(attributeSelections) a ORDER BY traitType asc, v asc
            ) attr
            INNER JOIN (
                select 
                    t.tokenId as tokenId,
                    JSON_EXTRACT(a.value, '$.traitType') as traitType,
                    JSON_EXTRACT(a.value, '$.value') as v
                FROM 'token' t, JSON_EACH(attributeSelections) a
            ) tok on tok.traitType = attr.traitType AND tok.v = attr.v
            INNER JOIN 'processed-transaction' t, JSON_EACH(tokenPrice) m  on tok.tokenId = m.key
            WHERE 
                JSON_EXTRACT(transactionValue, '$.totalPrice') > 0 AND
                t.timestamp >= :timestamp
            GROUP BY tok.traitType, tok.v
            order by usdValue desc 
             
        `, {
            raw: true,
            nest: false,
            plain: false,
            replacements: { 
                timestamp: timestamp
            }
        })


        if (queryResults?.length > 0) {

            for (let result of queryResults) {

                let salesRow:AttributeSalesRow = {}

                salesRow.traitType = result.traitType
                salesRow.value = result.v
    
                salesRow.ethValue = result.ethValue
                salesRow.averageEthValue = result.averageEthValue
                salesRow.events = result.events
    
                salesRow.usdValue = result.usdValue
                salesRow.averageUsdValue = result.averageUsdValue
    
                salesRows.push(salesRow)
            }

        }

        return salesRows

    }

    private async getAttributes() : Promise<[]> {

        let s = await this.sequelize()

        const [attributeResults, metadata] = await s.query(`
            select 
                DISTINCT JSON_EXTRACT(a.value, '$.traitType') traitType, JSON_EXTRACT(a.value, '$.value') v
            FROM 'token' t, JSON_EACH(attributeSelections) a 
            ORDER BY traitType asc, v asc
        `)

        return attributeResults



    }

    async getLargestSales(limit:number) : Promise<Sale[]> {
    
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
            LIMIT :limit ;
        `, {
            replacements: { limit: limit}
        })

        //Remove "tokenPrice" field. Just used interally for the query. Maybe can find a better fix.
        largestSalesResults.forEach( sale => {
            delete sale.tokenPrice 
        })


        return largestSalesResults

    }

    async getSalesByAttribute(traitType: string, value: string): Promise<Sale[]> {

        let s = await this.sequelize()

        const [largestSalesResults, metadata] = await s.query(`
            select 
                JSON_EXTRACT(transactionValue, '$.tokenPrice') as tokenPrice,
                m.key as tokenId,
                datetime(pt.timestamp, 'unixepoch') as date,
                JSON_EXTRACT(m.value, '$.price') as ethValue,
                JSON_EXTRACT(m.value, '$.currency') as currency,
                JSON_EXTRACT(m.value, '$.usdValue') as usdValue
            FROM 'processed-transaction' pt, JSON_EACH(tokenPrice) m  
            WHERE 
                JSON_EXTRACT(transactionValue, '$.totalPrice') > 0 AND 
                tokenId IN (select 
                                t.tokenId as tokenId
                            FROM 'token' t, JSON_EACH(attributeSelections) a
                            WHERE
                                JSON_EXTRACT(a.value, '$.traitType') = :traitType AND JSON_EXTRACT(a.value, '$.value') = :val
                )
            ORDER BY usdValue desc
        `, {
            replacements: { traitType: traitType, val: value}
        })

        //Remove "tokenPrice" field. Just used interally for the query. Maybe can find a better fix.
        largestSalesResults.forEach( sale => {
            delete sale.tokenPrice 
        })


        return largestSalesResults

    }



}

interface SalesRowInput {
    timestamp?:number
    attribute?: {
        traitType:string 
        value:string
    }
}



export {
    ProcessedTransactionRepositoryNodeImpl
}