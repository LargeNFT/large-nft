
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index, ForeignKey, BelongsTo, AllowNull, BelongsToMany } = require('sequelize-typescript')

import { ERCEvent } from './erc-event.js'
import { TokenOwner } from './token-owner.js'
import { Token } from './token.js'

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
    declare tokenTraderIds?:string[]

    @Index
    @Column(DataType.BIGINT)
    declare timestamp?:number

    @Column(DataType.JSON)
    declare tokenIds?:number[]


    @BelongsToMany(() => Token, () => ProcessedTransactionToken)
    declare tokens: Token[]

    @BelongsToMany(() => TokenOwner, () => ProcessedTransactionTrader)
    declare tokenTraders: TokenOwner[]



    @Column(DataType.JSON)
    declare ercEvents?:ERCEvent[]

    @Column(DataType.JSON)
    declare transactionValue?:TransactionValue

    
    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}





@Table({
    tableName: 'processed_event',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class ProcessedEvent extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 


    @Index('block-number-transaction-index-pe') 
    @Column(DataType.BIGINT)
    declare transactionIndex?:number

    @Index('block-number-transaction-index-pe') 
    @Column(DataType.BIGINT)
    declare blockNumber?:number


    @ForeignKey(() => ProcessedTransaction)
    @AllowNull(false)	
    @Column(DataType.STRING)
    declare processedTransactionId?:string 

    @BelongsTo(() => ProcessedTransaction)
    processedTransaction: ProcessedTransaction





    @Column(DataType.BIGINT)
    declare logIndex?:number

    @Column(DataType.BOOLEAN)
    declare isMint?:boolean

    @Column(DataType.BOOLEAN)
    declare isBurn?:boolean

    @Column(DataType.JSON)
    declare namedArgs?:any


    @Column(DataType.BIGINT)
    declare tokenId?:number

    @Column(DataType.STRING)
    declare fromAddress?:string

    @Column(DataType.STRING)
    declare toAddress?:string
    
    

    @Column(DataType.DECIMAL)
    declare price?:number

    @Column(DataType.STRING)
    declare currency?:string

    @Column(DataType.DECIMAL)
    declare usdValue?:number

    @Column(DataType.STRING)
    declare event?:string 



    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}




@Table({
    tableName: 'processed_transaction_token',
    paranoid: false,
})
class ProcessedTransactionToken extends Model {

  @Index
  @ForeignKey(() => ProcessedTransaction)
  @Column
  declare processedTransactionId: number

  @Index
  @ForeignKey(() => Token)
  @Column
  declare tokenId: number

}



@Table({
    tableName: 'processed_transaction_trader',
    paranoid: false,
})
class ProcessedTransactionTrader extends Model {

  @Index
  @ForeignKey(() => ProcessedTransaction)
  @Column
  declare processedTransactionId: number

  @Index
  @ForeignKey(() => TokenOwner)
  @Column
  declare tokenOwnerId: string

}















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

    owners: []

    largestSales: {
        [key: string]: Sale[]
    }

}


interface TokenOwnerSalesReport {
    sales?:SalesRow
    buys?:SalesRow
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


interface OwnersByAttribute {
    owner: string 
    count: number
    ensName:string
    lastActive:Date
}

export {
    ProcessedTransaction, TransactionValue, SalesReport, SalesRow, Sale, AttributeSalesRow, 
    AttributeSaleReport, TokenPrice, ProcessedEvent, ProcessedTransactionToken, OwnersByAttribute, TokenOwnerSalesReport, ProcessedTransactionTrader
}