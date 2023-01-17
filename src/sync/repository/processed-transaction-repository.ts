import { Changeset } from "../../reader/service/core/database-service.js"
import { ProcessedTransaction, SalesReport } from "../dto/processed-transaction.js"


interface ProcessedTransactionRepository {
    get(_id:string): Promise<ProcessedTransaction>
    put(processedTransaction:ProcessedTransaction) : Promise<void>
    putAll(processedTransactions:ProcessedTransaction[]) : Promise<void>
    list(limit: number, skip: number): Promise<ProcessedTransaction[]> 

    getSalesReport() : Promise<SalesReport>
    getAddressSalesReport(address:string) : Promise<SalesReport>
    getTokenSalesReport(tokenId:number) : Promise<SalesReport>
    getAttributeSalesReport(attributeName:string, attributeValue:string) : Promise<SalesReport>

}

let changesets:Changeset[] = [
    {
        id: '0',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['blockNumber', 'transactionIndex'],
                }
            })

            await db.createIndex({
                index: {
                    fields: ['timestamp']
                }
            })
           
        }
    },

    {
        id: '1',
        changeset: async (db) => {

            await db.put({
                _id: '_design/usd_value',
                views: {
                    usd_value: {
                        map: function (doc) {
                            if (doc.transactionValue?.usdValue > 0) {
                                //@ts-ignore
                                emit(doc._id, doc.transactionValue?.usdValue)
                            }



                        }.toString(),
                        reduce: "_stats"
                    }
                }
            })

            await db.put({
                _id: '_design/eth_value',
                views: {
                    eth_value: {
                        map: function (doc) {
                            
                            if (doc.transactionValue?.totalPrice > 0) {
                                //@ts-ignore
                                emit(doc._id, doc.transactionValue?.totalPrice)
                            }

                        }.toString(),
                        reduce: "_stats"
                    }
                }
            })


        }


    }
]


export {
    ProcessedTransactionRepository, changesets
}
