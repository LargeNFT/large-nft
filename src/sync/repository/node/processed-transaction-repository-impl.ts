import {  inject, injectable } from "inversify"
import moment from "moment"

import {  AttributeSaleReport, AttributeSalesRow, OwnersByAttribute, ProcessedEvent, ProcessedTransaction, ProcessedTransactionToken, ProcessedTransactionTrader, Sale, SalesReport, SalesRow, TokenOwnerSalesReport } from "../../dto/processed-transaction.js"
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

    async getEvent(_id: string, options?:any): Promise<ProcessedEvent> {
        return ProcessedEvent.findByPk(_id, options)
    }

    async getByIds(_ids:string[], options?:any) : Promise<ProcessedTransaction[]> {

        let query = {
            where: {
                _id: {
                    [Op.in]: _ids
                }
            },
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        }

        query = Object.assign(query, options)

        //Transactions
        return ProcessedTransaction.findAll(query)


    }

    async put(processedTransaction: ProcessedTransaction, options?:any): Promise<ProcessedTransaction> {
        
        if (processedTransaction.changed()) {

            await processedTransaction.save(options)
        
            if (processedTransaction.tokens) {
                for (let token of processedTransaction.tokens) {
                    await processedTransaction.addToken(token, Object.assign({through: ProcessedTransactionToken}, options))
                }
            }

            if (processedTransaction.tokenTraders) {
                for (let tokenTrader of processedTransaction.tokenTraders) {
                    await processedTransaction.addTokenTrader(tokenTrader, Object.assign({through: ProcessedTransactionTrader}, options))
                }
            }

        }

        return processedTransaction 

    }
  
    async putAll(processedTransactions:ProcessedTransaction[], options?:any) : Promise<void> {

        for (let processedTransaction of processedTransactions) {
            await this.put(processedTransaction,options)
        }
    }

    async findBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<ProcessedTransaction[]> {

        let query = {
            where: {
                blockNumber: {
                    [Op.and]: {
                        [Op.gte]: startBlock,
                        [Op.lte]: endBlock
                    }
                }
            }
        }

        query = Object.assign(query, options)

        //Transactions
        return ProcessedTransaction.findAll(query)




    }

    async findEventsBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<ProcessedEvent[]> {

        let query = {
            where: {
                blockNumber: {
                    [Op.and]: {
                        [Op.gte]: startBlock,
                        [Op.lte]: endBlock
                    }
                }
            }
        }

        query = Object.assign(query, options)

        //events
        return ProcessedEvent.findAll(query)




    }

    async remove(processedTransaction:ProcessedTransaction, options?:any) : Promise<void> {

        //Delete events
        const events = await this.getEventsByTransaction(processedTransaction, options)

        for (let event of events) {
            await event.destroy(options)
        }


        //Remove relation to tokens
        if (processedTransaction.tokens) {
            for (let token of processedTransaction.tokens) {
                await processedTransaction.removeToken(token, options)
            }
        }

        if (processedTransaction.tokenTraders) {
            for (let tokenTrader of processedTransaction.tokenTraders) {
                await processedTransaction.removeTokenTrader(tokenTrader, options)
            }
        }


        await processedTransaction.destroy(options)

    }

    async getEventsByTransaction(transaction:ProcessedTransaction, options?:any) : Promise<ProcessedEvent[]> {

        return ProcessedEvent.findAll({
            where: {
              processedTransactionId: {
                [Op.eq]: transaction._id
              }
            }
        }, options)

    }


    async getEventsByTokens(tokenIds:number[], options?:any) : Promise<ProcessedEvent[]>  {

        let s = await this.sequelize()

        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            model: ProcessedTransaction,
            mapToModel: true,
            replacements: { 
                tokenIds: tokenIds
            }
        }

        const [queryResults, metadata] = await s.query(`
            select 
                pe._id
            FROM 
                'processed_event' pe
            WHERE 
                pe.tokenId IN (:tokenIds)
            ORDER BY pe.blockNumber desc, pe.transactionIndex desc
        `, Object.assign(queryOptions, options))


        let results:ProcessedEvent[] = []

        for (let result of queryResults) {
            results.push(await this.getEvent(result._id, options))
        }

        return results

    }





    async putEvent(event: ProcessedEvent, options?:any): Promise<ProcessedEvent> {
        
        await event.save(options)
        return event 

    }

    async putEvents(events:ProcessedEvent[], options?:any) {
     
        for (let event of events) {
            await this.putEvent(event,options)
        }

    }

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

        query = Object.assign(query, options)

        return ProcessedTransaction.findOne(query)

    }

    async list(limit: number, skip: number, options?:any): Promise<ProcessedTransaction[]> {

        let query = {
            limit: limit,
            offset: skip,
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        }

        return ProcessedTransaction.findAll(Object.assign(query, options))

    }

    async listByToken(tokenId:number, options?:any) : Promise<ProcessedTransaction[]>  {

        let s = await this.sequelize()

        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            model: ProcessedTransaction,
            mapToModel: true,
            replacements: { 
                tokenId: tokenId
            }
        }

        const [queryResults, metadata] = await s.query(`
            select 
                *
            FROM 
                'processed_transaction' t
            INNER JOIN 'processed_transaction_token' ptt on t._id = ptt.processedTransactionId
            WHERE 
                ptt.tokenId = :tokenId 
            ORDER BY t.blockNumber desc, t.transactionIndex desc
        `, Object.assign(queryOptions, options))


        let results:ProcessedTransaction[] = []

        for (let result of queryResults) {
            results.push(await this.get(result._id, options))
        }

        return results

    }

    async listByTokens(tokenIds:number[], options?:any) : Promise<ProcessedTransaction[]>  {

        let s = await this.sequelize()

        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            model: ProcessedTransaction,
            mapToModel: true,
            replacements: { 
                tokenIds: tokenIds
            }
        }

        const [queryResults, metadata] = await s.query(`
            select 
                *
            FROM 
                'processed_transaction' t
            INNER JOIN 'processed_transaction_token' ptt on t._id = ptt.processedTransactionId
            WHERE 
                ptt.tokenId IN (:tokenIds)
            ORDER BY t.blockNumber desc, t.transactionIndex desc
        `, Object.assign(queryOptions, options))


        let results:ProcessedTransaction[] = []

        for (let result of queryResults) {
            results.push(await this.get(result._id, options))
        }

        return results

    }

    async listByTrader(owner:string, options?:any) : Promise<ProcessedTransaction[]>  {

        let s = await this.sequelize()

        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            model: ProcessedTransaction,
            mapToModel: true,
            replacements: { 
                owner: owner
            }
        }

        const [queryResults, metadata] = await s.query(`
            select 
                *
            FROM 
                'processed_transaction' t
            INNER JOIN 'processed_transaction_trader' ptt on t._id = ptt.processedTransactionId
            WHERE 
                ptt.tokenOwnerId = :owner 
            ORDER BY t.blockNumber desc, t.transactionIndex desc
        `, Object.assign(queryOptions, options))


        let results:ProcessedTransaction[] = []

        for (let result of queryResults) {
            results.push(await this.get(result._id, options))
        }

        return results

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

    async getAttributeSalesReport(options?:any): Promise<AttributeSaleReport> {

        let report:AttributeSaleReport = {
            owners: [],
            largestSales: {}
        }

        report.totals = await this.getAttributeSalesRows(0, options)

        let attributes = await this.getAttributes()
        
        for (let attribute of attributes) {
            report.owners[`${attribute.traitType}::::${attribute.v}`] = await this.getOwnersByAttribute(attribute.traitType, attribute.v, options)
            report.largestSales[`${attribute.traitType}::::${attribute.v}`] = await this.getLargestSalesByAttribute(attribute.traitType, attribute.v, 50, options)
        }


        return report
    }

    async getTokenOwnerSalesReport(_id:string): Promise<TokenOwnerSalesReport> {

        let report:TokenOwnerSalesReport = {}

        report.buys = await this.getTokenOwnerBuysSalesRow(_id)
        report.sales = await this.getTokenOwnerSalesSalesRow(_id)

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

    private async getAttributeSalesRows(timestamp:number, options?:any) : Promise<AttributeSalesRow[]> {

        let salesRows:AttributeSalesRow[] = []


        let s = await this.sequelize()

        
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

    private async getTokenOwnerBuysSalesRow(_id:string) {

        let salesRow:SalesRow = {}

        let s = await this.sequelize()
        
        const [queryResults, metadata] = await s.query(`
            select 

            COUNT(_id) as events, 
        
            SUM(price) as ethValue, 
            AVG(price) as averageEthValue,
        
            SUM(usdValue) as usdValue, 
            AVG(usdValue) as averageUsdValue

            FROM 'processed_event' pe 
            
            WHERE 
                price > 0 AND
                toAddress = :_id
                
        `, {
            replacements: { 
                _id: _id
            }
        })


        if (queryResults?.length > 0) {
            salesRow.ethValue = queryResults[0].ethValue || 0
            salesRow.averageEthValue = queryResults[0].averageEthValue || 0
            salesRow.events = queryResults[0].events || 0

            salesRow.usdValue = queryResults[0].usdValue || 0
            salesRow.averageUsdValue = queryResults[0].averageUsdValue || 0
        }

        return salesRow

    }

    private async getTokenOwnerSalesSalesRow(_id:string) {

        let salesRow:SalesRow = {}

        let s = await this.sequelize()
        
        const [queryResults, metadata] = await s.query(`
            select 

            COUNT(_id) as events, 
        
            SUM(price) as ethValue, 
            AVG(price) as averageEthValue,
        
            SUM(usdValue) as usdValue, 
            AVG(usdValue) as averageUsdValue

            FROM 'processed_event' pe 
            
            WHERE 
                price > 0 AND
                fromAddress = :_id
                
        `, {
            replacements: { 
                _id: _id
            }
        })


        if (queryResults?.length > 0) {
            salesRow.ethValue = queryResults[0].ethValue || 0
            salesRow.averageEthValue = queryResults[0].averageEthValue || 0
            salesRow.events = queryResults[0].events || 0

            salesRow.usdValue = queryResults[0].usdValue || 0
            salesRow.averageUsdValue = queryResults[0].averageUsdValue || 0
        }

        return salesRow

    }

    private async getOwnersByAttribute(traitType:string, value:string, options?:any) : Promise<OwnersByAttribute[]>{

        let s = await this.sequelize()

        
        const [queryResults, metadata] = await s.query(`
            SELECT 
                JSON_EXTRACT(a.value, "$.traitType") as traitType,
                JSON_EXTRACT(a.value, "$.value") as v,
                t.currentOwnerId,
                COUNT (t.tokenId) as c,
                toko.ensName,
                toko.lastActive
            FROM token t, JSON_EACH(attributeSelections) a
            INNER JOIN token_owner toko on t.currentOwnerId = toko._id
            WHERE traitType = :traitType AND v = :value
            GROUP BY currentOwnerId
            ORDER BY c desc
            LIMIT 15 
        `, Object.assign({
            raw: true,
            nest: false,
            plain: false,
            replacements: { 
                traitType: traitType,
                value: value
            }
        }, options))

        let owners = queryResults?.map( r => {
            return {
                _id: r.currentOwnerId,
                count: r.c,
                lastActive: r.lastActive,
                ensName: r.ensName
            }
        })



        let rank = 0
        let lastRankCount


        for (let i=0; i < owners.length; i++) {

            let owner = owners[i]

            if (!lastRankCount || owner.count < lastRankCount) {
                rank++
            }

            //Add any with new rankings to our changeset to save.
            if (owner.rank != rank || owner.overallRank != i+1) {
                owner.rank = rank
                owner.overallRank = i+1
            }

            lastRankCount = owner.count

        }

        return owners

    }

    private async getAttributes() : Promise<any[]> {

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

    async getLargestSalesByAttribute(traitType:string, value: string, limit:number, options?:any) : Promise<Sale[]> {
    
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
                tokenPrice IS NOT NULL AND
                tokenId IN (select 
                    t.tokenId
                FROM 'token' t, JSON_EACH(attributeSelections) a
                WHERE
                    JSON_EXTRACT(a.value, '$.traitType') = :traitType AND JSON_EXTRACT(a.value, '$.value') = :value
            )
            GROUP BY tokenId
            ORDER BY usdValue desc 
            LIMIT :limit ;
        `, Object.assign({
            replacements: { 
                limit: limit,
                traitType: traitType,
                value: value
            }
        }, options))

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