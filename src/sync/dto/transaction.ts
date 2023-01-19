import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index } = require('sequelize-typescript')



@Table({
    tableName: 'transaction',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class Transaction extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 
    
    @Column(DataType.STRING)
    declare hash?:string 

    @Column(DataType.STRING)
    declare blockHash: string

    @Index('block-number-transaction-index') 
    @Column(DataType.BIGINT)
    declare blockNumber?:number

    @Index('block-number-transaction-index') 
    @Column(DataType.BIGINT)
    declare transactionIndex?:number

    @Column(DataType.STRING)
    declare data: string

    @Column(DataType.STRING)
    declare from: string

    @Column(DataType.JSON)
    declare gasLimit: {}

    @Column(DataType.JSON)
    declare gasPrice: {}

    @Column(DataType.BIGINT)
    declare nonce: number

    @Column(DataType.JSON)
    declare value: {}

    @Column(DataType.BIGINT)
    declare networkId: number

    @Column(DataType.TEXT)
    declare r: string

    @Column(DataType.TEXT)
    declare s: string

    @Column(DataType.BIGINT)
    declare v: number

    @Column(DataType.TEXT)
    declare raw: string

    @Column(DataType.JSON)
    declare receipt:TransactionReceipt

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}

interface TransactionReceipt {
    
    to?:string
    contractAddress?:string
    cumulativeGasUsed?:string
    effectiveGasPrice?:string
    gasUsed?:string
    logs:[]
}


export {
    Transaction
}