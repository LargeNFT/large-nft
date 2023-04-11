import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType, PrimaryKey } = require('sequelize-typescript')



@Table({
    tableName: 'sync-status',
    createdAt: 'dateCreated',
    updatedAt: 'lastUpdated',
    paranoid: false,
})
class SyncStatus extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING)
    declare _id?:string

    @Column(DataType.JSON)
    declare fileStatus?:FileStatus 
    
    @Column(DataType.DATE)
    declare dateCreated?:Date

}

interface FileStatus {
    [key: string] : {
      path:string,
      lastModified:Date
      lastSynced?:Date
    }
  }

export {
    SyncStatus, FileStatus
}