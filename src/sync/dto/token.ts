import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')

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

    @Column(DataType.BIGINT)
    declare tokenId?:number

    // @Allow()
    // latestErcEventId?:string

    @Column(DataType.STRING)
    declare latestTransactionId?:string

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date



}

export {
    Token
}