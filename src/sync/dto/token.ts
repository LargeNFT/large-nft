import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey, Index } = require('sequelize-typescript')

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