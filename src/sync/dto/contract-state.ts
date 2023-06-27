const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')


@Table({
    tableName: 'contract_state',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class ContractState extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string
    
    @Column(DataType.STRING)
    declare _rev?:string 

    @Column(DataType.BIGINT)
    declare indexRate:number
    
    @Column(DataType.BIGINT)
    declare startBlock:number 
    
    @Column(DataType.BIGINT)
    declare lastIndexedBlock:number 

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date
}

export {
    ContractState
}