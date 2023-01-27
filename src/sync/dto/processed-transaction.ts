
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index, ForeignKey, BelongsTo, AllowNull } = require('sequelize-typescript')

import { ERCEvent } from './erc-event.js'

@Table({
    tableName: 'processed_transaction',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class ProcessedTransaction extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 
    
    @Index('block-number-transaction-index-pt') 
    @Column(DataType.BIGINT)
    declare blockNumber?:number

    @Index('block-number-transaction-index-pt') 
    @Column(DataType.BIGINT)
    declare transactionIndex?:number

    @Index('transactionFrom-pt') 
    @Column(DataType.STRING)
    declare transactionFrom?:string

    @Column(DataType.JSON)
    declare tokenTraders?:string[]

    @Index
    @Column(DataType.BIGINT)
    declare timestamp?:number

    @Column(DataType.JSON)
    declare tokenIds?:number[]

    @Column(DataType.JSON)
    declare ercEvents?:ERCEvent[]

    @Column(DataType.JSON)
    declare processedEvents?:ProcessedEvent[]

    @Column(DataType.JSON)
    declare transactionValue?:TransactionValue

    @Column(DataType.STRING)
    declare previousId?:string

    @Column(DataType.JSON)
    declare previousByTokenIds?:{}

    @Column(DataType.JSON)
    declare previousByTransactionInitiatorId?:{}

    @Column(DataType.JSON)
    declare previousByTokenOwnerId?:{}

    @Column(DataType.STRING)
    declare nextId?:string

    @Column(DataType.JSON)
    declare nextByTokenIds?:{}

    @Column(DataType.JSON)
    declare nextByTokenOwnerId?:{}

    @Column(DataType.JSON)
    declare nextByTransactionInitiatorId?:{}

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}









interface ProcessedEvent  {

    blockNumber?:number
    processedTransactionId?:string 
    isMint?:boolean
    isBurn?:boolean
    tokenId?:number
    price?:number
    currency?:string
    usdValue?:number
    event?:string 
    namedArgs?:[]
    
    fromAddress?:any
    toAddress?:any 


    lastUpdated?:Date 
    dateCreated?:Date
}













// @Table({
//     tableName: 'processed_event',
//     createdAt: 'dateCreated',
//     updatedAt: 'lastUpdated',
//     paranoid: false,
// })
// class ProcessedEvent extends Model {
    
//     @PrimaryKey
//     @Column(DataType.STRING)
//     declare _id?:string

//     @Column(DataType.STRING)
//     declare _rev?:string 

//     // @Index('block-number-pe') 
//     @Column(DataType.BIGINT)
//     declare blockNumber?:number

//     @ForeignKey(() => ProcessedTransaction)
//     @AllowNull(false)	
//     @Column(DataType.STRING)
//     declare processedTransactionId?:string 

//     @Column(DataType.BOOLEAN)
//     declare isMint?:boolean

//     @Column(DataType.BOOLEAN)
//     declare isBurn?:boolean

//     @Column(DataType.BIGINT)
//     declare tokenId?:number

//     @Column(DataType.DECIMAL)
//     declare price?:number

//     @Column(DataType.STRING)
//     declare currency?:string

//     @Column(DataType.DECIMAL)
//     declare usdValue?:number

//     @Column(DataType.STRING)
//     declare event?:string 

//     @Column(DataType.JSON)
//     declare namedArgs?:any

//     @Column(DataType.DATE)
//     declare lastUpdated?:Date 
    
//     @Column(DataType.DATE)
//     declare dateCreated?:Date

// }


























interface TokenPrice {
    price?:number
    currency?:string
    usdValue?:number
}

interface TokenPrices {
    [tokenId: string]: TokenPrice
}

interface Markets {
    [market: string]: {
        currencies: {
            [currency:string] : {
                price?:number
                usdValue?:number
            }
        }
    }
}


interface TransactionValue {
    totalPrice?: number
    usdValue?:number
    currency?: string
    tokenPrice?: TokenPrices,
    markets?: Markets
    aggregator?:string
    tokenIds?: number[]
}



interface SalesReport {

    totals?:SalesRow

    yearTotals?:SalesRow
    monthTotals?:SalesRow
    weekTotals?:SalesRow
    dayTotals?:SalesRow

}

interface AttributeSaleReport {

    totals?:AttributeSalesRow[]

    yearTotals?:AttributeSalesRow[]
    monthTotals?:AttributeSalesRow[]
    weekTotals?:AttributeSalesRow[]
    dayTotals?:AttributeSalesRow[]

}

interface AttributeSalesRow extends SalesRow {
    traitType?:string
    value?:string 
}

interface SalesRow {
    
    events?:number

    ethValue?:number
    usdValue?:number

    averageEthValue?:number
    averageUsdValue?:number

    owners?:number


}

interface Sale {
    tokenId?:number
    transactionId?:string
    ethValue?:number
    usdValue:number
    date:string 
}



export {
    ProcessedTransaction, TransactionValue, SalesReport, SalesRow, Sale, AttributeSalesRow, AttributeSaleReport, TokenPrice, ProcessedEvent
}