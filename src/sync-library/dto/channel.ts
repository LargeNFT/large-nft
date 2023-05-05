import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')



@Table({
    tableName: 'channel',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class Channel extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.JSON)
    declare totals?:any[]

    @Column(DataType.JSON)
    declare latest?:any[]

    @Column(DataType.STRING)
    declare title?:String

    @Column(DataType.STRING)
    declare descriptionHTML?:String

    @Column(DataType.NUMBER)
    declare itemCount?:number

    @Column(DataType.STRING)
    declare coverImageId?:String

    @Column(DataType.DATE)
    declare lastUpdated?:Date

    @Column(DataType.DATE)
    declare dateCreated?:Date

}



export {
  Channel
}