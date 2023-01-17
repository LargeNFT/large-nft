import { truncate } from "fs"
import {  inject, injectable } from "inversify"
import moment from "moment"
import { DatabaseService } from "../../../reader/service/core/database-service.js"
import { ProcessedTransaction, SalesReport, SalesRow } from "../../dto/processed-transaction.js"
import { changesets, ProcessedTransactionRepository } from "../processed-transaction-repository.js"


@injectable()
class ProcessedTransactionRepositoryNodeImpl implements ProcessedTransactionRepository {

    db:any
    dbName:string = "processed-transactions"

    @inject('DatabaseService')
    private databaseService:DatabaseService


    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }

    async get(_id: string): Promise<ProcessedTransaction> {
        return Object.assign(new ProcessedTransaction(), await this.db.get(_id))
    }

    async put(processedTransaction: ProcessedTransaction): Promise<void> {
        await this.db.put(processedTransaction)
    }
  
    async putAll(processedTransactions:ProcessedTransaction[]) : Promise<void> {
        await this.db.bulkDocs(processedTransactions)
    }


    async list(limit: number, skip: number): Promise<ProcessedTransaction[]> {

        let response = await this.db.find({
            selector: { 
                "blockNumber": { 
                    $exists: true 
                },
                "transactionIndex": { 
                    $exists: true 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{"blockNumber": 'desc'}, {"transactionIndex": 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }

        return response.docs

    }

    async getSalesReport(): Promise<SalesReport> {

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

        let records = await this.db.find({
            selector: { 
                timestamp: { 
                    $gt: timestamp ? timestamp : 0  
                }
            },
            fields: ['_id'],
            sort: [{"timestamp": 'desc'}]
        })


        let options:any = {
            reduce: true,
            include_docs: false,
            // group: true,
            // keys: records.docs.map(doc => doc._id)
        }


        console.log(timestamp, options.keys?.length)


        let ethResult = await this.db.query('eth_value', options)

        if (ethResult.rows?.length > 0) {
            salesRow.events = ethResult.rows[0].value.count
            salesRow.ethValue = ethResult.rows[0].value.sum
            salesRow.averageEthValue = salesRow.ethValue / salesRow.events
        }

        let usdResult = await this.db.query('usd_value', options)

        if (usdResult.rows?.length > 0) {
            salesRow.usdValue = usdResult.rows[0].value.sum
            salesRow.averageUsdValue = salesRow.usdValue / salesRow.events 
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

}





export {
    ProcessedTransactionRepositoryNodeImpl
}