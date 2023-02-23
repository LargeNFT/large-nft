import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')

@Table({
    tableName: 'token_owner',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class TokenOwner extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 

    @Column(DataType.BIGINT)
    declare count?:number

    @Column(DataType.BIGINT)
    declare rank?:number

    @Column(DataType.BIGINT)
    declare overallRank?:number

    @Column(DataType.JSON)
    declare tokenIds?:number[]

    // @Column(DataType.STRING)
    // declare latestTransactionInitiatorId?:string

    // @Column(DataType.STRING)
    // declare latestTransactionId?:string

    @Column(DataType.STRING)
    declare ensName?:string

    @Column(DataType.STRING)
    declare lastActive?:string 

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}

export {
    TokenOwner
}