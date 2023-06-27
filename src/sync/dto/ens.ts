// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')


@Table({
    tableName: 'ens',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class ENS extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 

    @Column(DataType.STRING)
    declare name?:string

    @Column(DataType.DATE)
    declare lastEnsNameUpdate?:Date 

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date



}

export {
    ENS
}