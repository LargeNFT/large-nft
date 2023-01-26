import {  inject, injectable } from "inversify"
import moment from "moment"

import {  AttributeSaleReport, AttributeSalesRow, ProcessedEvent, ProcessedTransaction, Sale, SalesReport, SalesRow } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"


import { createRequire } from 'module'


const require = createRequire(import.meta.url)

const { Op } = require("sequelize")


@injectable()
class ProcessedTransactionRepositoryNodeImpl implements ProcessedTransactionRepository {


    @inject("sequelize")
    private sequelize:Function

    @inject("baseDir")
    private baseDir:string

    async get(_id: string, options?:any): Promise<ProcessedTransaction> {
        return ProcessedTransaction.findByPk(_id, options)
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



    async findBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<ProcessedTransaction[]> {

        //Transactions
        return ProcessedTransaction.findAll({
            where: {
                blockNumber: {
                    [Op.and]: {
                        [Op.gte]: startBlock,
                        [Op.lte]: endBlock
                    }
                }
            }
        }, options)




    }

    async deleteAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void> {

        //Delete events
        // const events = await this.getEventsByTransactions(processedTransactions, options)

        // for (let event of events) {
        //     await event.destroy(options)
        // }


        //Transactions
        for (let processedTransaction of processedTransactions) {
            await processedTransaction.destroy(options)
        }
    }

    // async getEventsByTransactions(transactions:ProcessedTransaction[], options?:any) : Promise<ProcessedEvent[]> {

    //     return ProcessedEvent.findAll({
    //         where: {
    //           processedTransactionId: {
    //             [Op.in]: transactions.map(t => t._id)
    //           }
    //         }
    //     }, options)

    // }


    // async putEvent(event: ProcessedEvent, options?:any): Promise<ProcessedEvent> {
        
    //     await event.save(options)
    //     return event 

    // }

    // async putEvents(events:ProcessedEvent[], options?:any) {
     
    //     for (let event of events) {
    //         await this.putEvent(event,options)
    //     }

    // }


    async getLatest(beforeBlock?:number, options?:any): Promise<ProcessedTransaction> {

        let query:any = {
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        }

        if (beforeBlock) {
            query.where = {
                'blockNumber': {
                    [Op.lt]: beforeBlock
                }
            }
        }

        return ProcessedTransaction.findOne(query, options)

    }


    async list(limit: number, skip: number, options?:any): Promise<ProcessedTransaction[]> {

        return ProcessedTransaction.findAll({
            limit: limit,
            offset: skip,
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        }, options)

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

            COUNT(_id) as events, 
        
            SUM(JSON_EXTRACT(transactionValue, '$.totalPrice')) as ethValue, 
            AVG(JSON_EXTRACT(transactionValue, '$.totalPrice')) as averageEthValue,
        
            SUM(JSON_EXTRACT(transactionValue, '$.usdValue')) as usdValue, 
            AVG(JSON_EXTRACT(transactionValue, '$.usdValue')) as averageUsdValue

            FROM 'processed_transaction' t 
            
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
            INNER JOIN 'processed_transaction' t, JSON_EACH(tokenPrice) m  on tok.tokenId = m.key
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
            FROM 'processed_transaction' t, JSON_EACH(tokenPrice) m  
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
            FROM 'processed_transaction' pt, JSON_EACH(tokenPrice) m  
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

    async getPreviousByTokenId(tokenId:number, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {

        let s = await this.sequelize()

        options = Object.assign({}, options)


        const result = await s.query(`
            select 
                t.*
            FROM 'processed_transaction' t, json_each(t.tokenIds) tok
            WHERE 
                tok.value IS NOT NULL AND
                tok.value = :tokenId AND
                (t.blockNumber,t.transactionIndex) < (:blockNumber, :transactionIndex)
            ORDER BY t.blockNumber desc, t.transactionIndex desc
            LIMIT 1;
        `, Object.assign(options, {
            type: s.QueryTypes.SELECT,
            model: ProcessedTransaction,
            mapToModel: true,
            plain: true,
            replacements: { 
                tokenId: tokenId,
                blockNumber: blockNumber,
                transactionIndex: transactionIndex
            }
        }))

        if (result?._id) {
            return ProcessedTransaction.findByPk(result._id, options) //map JSON better...
        }

    }



    async getPreviousByInitiator(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {

        let s = await this.sequelize()

        options = Object.assign({}, options)

        const result = await s.query(`
            select 
                t.*
            FROM 'processed_transaction' t
            WHERE 
                t.transactionFrom = :address AND
                (t.blockNumber,t.transactionIndex) < (:blockNumber, :transactionIndex)
            ORDER BY t.blockNumber desc, t.transactionIndex desc
            LIMIT 1;
        `, Object.assign(options, {
            type: s.QueryTypes.SELECT,
            model: ProcessedTransaction,
            mapToModel: true,
            plain: true,   
            replacements: { 
                address: address,
                blockNumber: blockNumber,
                transactionIndex: transactionIndex
            }
        }))

        if (result?._id) {
            return ProcessedTransaction.findByPk(result._id, options) //map JSON better...
        }

    }

    async getPreviousByTrader(address:string, blockNumber:number, transactionIndex:number, options?:any) : Promise<ProcessedTransaction> {

        let s = await this.sequelize()

        options = Object.assign({}, options)


        const result = await s.query(`
            select 
                t.*
            FROM 'processed_transaction' t, json_each(t.tokenTraders) tr
            WHERE
                tr.value IS NOT NULL AND
                tr.value = :address AND 
                (t.blockNumber,t.transactionIndex) < (:blockNumber, :transactionIndex)
            ORDER BY t.blockNumber desc, t.transactionIndex desc
            LIMIT 1;
        `, Object.assign(options, {
            type: s.QueryTypes.SELECT,
            model: ProcessedTransaction,
            mapToModel: true,
            plain: true,
            replacements: { 
                address: address,
                blockNumber: blockNumber,
                transactionIndex: transactionIndex
            }
        }))

        if (result?._id) {
            return ProcessedTransaction.findByPk(result._id, options) //map JSON better...
        }


    }


    /**
     * This function parses the JSON fields of ProcessedTransaction when using a raw query. Has a side-effect of marking all the models as changed/dirty as far as sequelize goes. Not great. 
     * @param result 
     * @returns 
     */
     private _parseJSON(result: any) {

        if (!result) return

        result.tokenTraders = JSON.parse(result.tokenTraders)
        result.ercEvents = JSON.parse(result.ercEvents)
        result.processedEvents = JSON.parse(result.processedEvents)
        result.transactionValue = JSON.parse(result.transactionValue)
        result.previousByTransactionInitiatorId = JSON.parse(result.previousByTransactionInitiatorId)
        result.previousByTokenOwnerId = JSON.parse(result.previousByTokenOwnerId)
        result.nextByTokenIds = JSON.parse(result.nextByTokenIds)
        result.nextByTokenOwnerId = JSON.parse(result.nextByTokenOwnerId)
        result.nextByTransactionInitiatorId = JSON.parse(result.nextByTransactionInitiatorId)
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