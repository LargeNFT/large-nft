const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')



@Table({
    tableName: 'block',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class Block extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.STRING)
    declare _rev?:string 

    @Column(DataType.STRING)
    declare hash?: string

    @Column(DataType.STRING)
    declare parentHash?: string

    @Column(DataType.BIGINT)
    declare number:number

    @Column(DataType.DECIMAL)
    declare ethUSDPrice: number

    @Column(DataType.BIGINT)
    declare timestamp: number

    @Column(DataType.STRING)
    declare nonce?: string

    @Column(DataType.STRING)
    declare difficulty?: string

    @Column(DataType.JSON)
    declare gasLimit?: {}

    @Column(DataType.JSON)
    declare gasUsed?: {}

    @Column(DataType.STRING)
    declare miner?: string

    @Column(DataType.STRING)
    declare extraData?: string

    @Column(DataType.JSON)
    declare baseFeePerGas?: {}

    @Column(DataType.DATE)
    declare lastUpdated?:Date 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}

export {
    Block
}