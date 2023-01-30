import { createRequire } from 'module'
import { ProcessedTransaction, ProcessedTransactionToken } from './processed-transaction.js'
import { TokenOwner } from './token-owner.js'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index, ForeignKey, BelongsTo, AllowNull, BelongsToMany } = require('sequelize-typescript')

@Table({
    tableName: 'token',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class Token extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 

    @Index
    @Column(DataType.BIGINT)
    declare tokenId?:number

    @Column(DataType.JSON)
    declare attributeSelections?:[{
        traitType: string
        value: string
    }]

    @BelongsToMany(() => ProcessedTransaction, () => ProcessedTransactionToken)
    declare processedTransactions: ProcessedTransaction[]




    @ForeignKey(() => TokenOwner)
    @Column(DataType.STRING)
    declare currentOwnerId?:string 

    @BelongsTo(() => TokenOwner)
    currentOwner: TokenOwner

    @Column(DataType.JSON)
    declare ownershipHistory?:OwnershipHistory[]



    @Column(DataType.STRING)
    declare latestTransactionId?:string

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date



}

interface OwnershipHistory {
    owner:string,
    blockNumber:number
    transactionIndex:number
    transactionHash:string
    timestamp:number
}


export {
    Token
}