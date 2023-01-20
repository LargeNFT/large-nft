
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index } = require('sequelize-typescript')


import { ERCEvent } from './erc-event.js'

@Table({
    tableName: 'processed-transaction',
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

    @Column(DataType.STRING)
    declare from?:string

    @Column(DataType.BIGINT)
    declare timestamp?:number

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


interface TokenPrice {
    [tokenId: string]: {
        price?:number
        currency?:string
        usdValue?:number
    }
}

interface TransactionValue {
    totalPrice?: number
    usdValue?:number
    currency?: string
    tokenPrice?: TokenPrice,
    market?: string
    tokenIds?: number[]
}


interface ProcessedEvent {
    isMint?:boolean
    isBurn?:boolean
    tokenIds?:number[]
    event?:string 
    namedArgs?:any
    salePrice?:string
}


interface SalesReport {

    totals?:SalesRow

    yearTotals?:SalesRow
    monthTotals?:SalesRow
    weekTotals?:SalesRow
    dayTotals?:SalesRow

}

interface SalesRow {
    
    events?:number

    ethValue?:number
    usdValue?:number

    averageEthValue?:number
    averageUsdValue?:number

}

interface Sale {
    tokenId?:number
    transactionId?:string
    ethValue?:number
    usdValue:number
    date:string 
}



export {
    ProcessedTransaction, ProcessedEvent, TransactionValue, SalesReport, SalesRow, Sale
}