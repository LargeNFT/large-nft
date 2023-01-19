import {  inject, injectable } from "inversify"
import moment from "moment"

import { ProcessedTransaction, SalesReport, SalesRow } from "../../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../processed-transaction-repository.js"


import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Op } = require('sequelize-typescript')

@injectable()
class ProcessedTransactionRepositoryNodeImpl implements ProcessedTransactionRepository {

    @inject("sequelize")
    private sequelize:Function

    async get(_id: string): Promise<ProcessedTransaction> {
        return ProcessedTransaction.findByPk(_id)
    }

    async put(processedTransaction: ProcessedTransaction, options?:any): Promise<ProcessedTransaction> {
        return processedTransaction.save(options)
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


        // report.totals = await this.getSalesRow()
        // report.yearTotals = await this.getSalesRow( Math.floor(yearDate.getTime() / 1000))
        // report.monthTotals = await this.getSalesRow(Math.floor(monthDate.getTime() / 1000))
        // report.dayTotals = await this.getSalesRow(Math.floor(dayDate.getTime() / 1000))

        return report

    }


    async getSalesRow(timestamp?:number) {

        let salesRow:SalesRow = {}

        let events = await ProcessedTransaction.count('_id', { 
            where: { 
                "transactionValue.totalPrice": { 
                    [Op.gt]: 0 
                } 
            } 
        })

        salesRow.ethValue = await ProcessedTransaction.sum('transactionValue.totalPrice')
        salesRow.averageEthValue = await ProcessedTransaction.avg('transactionValue.totalPrice')


        salesRow.usdValue = await ProcessedTransaction.sum('transactionValue.usdValue')
        salesRow.averageUsdValue = await ProcessedTransaction.avg('transactionValue.usdValue')

        salesRow.events = events


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

}





export {
    ProcessedTransactionRepositoryNodeImpl
}