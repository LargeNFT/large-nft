import { injectable } from "inversify"
import { Item } from "../dto/item"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class ItemRepository {

    static CHUNK_SIZE = 35

    changesets:Changeset[] = [
        {
            id: '0',
            changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['channelId']
                }
            })
    
            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            })
    
    
            await db.createIndex({
                index: {
                    fields: ['searchableContent']
                }
            })
    
    
            await db.put({
                _id: '_design/item_index',
                views: {
                  by_channel_id: {
                    map: function (doc) { 
                        //@ts-ignore
                        emit(doc.channelId)
                    }.toString(),
                    reduce: '_count'
                  }
                }
            })
    
            await db.put({
                _id: '_design/item_token_id',
                views: {
                  token_id_stats: {
                    map: function (doc) { 
                        //@ts-ignore
                        emit(doc.channelId, doc.tokenId)
                    }.toString(),
                    reduce: '_count'
                  }
                }
            })
            }
        },

        {
            id: '1',
            changeset: async (db) => {

                await db.put({
                    _id: '_design/item_attribute_counts_index',
                    views: {
                      attribute_counts: {
                        map: function (doc) { 

                            if (doc.attributeSelections?.length > 0) {
                                for (let as of doc.attributeSelections) {
                                    //@ts-ignore
                                    emit ([doc.channelId, as.traitType, as.value])
                                }
                            }

                        }.toString(),
                        reduce: '_count'
                      }
                    }
                })


            }
        }
    
]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { 

    }

    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "item", this.changesets)
    }

    async get(_id: string): Promise<Item> {
        return Object.assign(new Item(), await this.db.get(_id))
    }

    async getLatestRevision(_id:string) : Promise<Item> {
        return Object.assign(new Item(), await this.databaseService.getLatestRevision(this.db, _id))
    }

    async getByTokenId(channelId: string, tokenId:string) : Promise<Item> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                tokenId: { $eq: tokenId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: 1,
            skip: 0
        })


        if (response.docs?.length > 0) {
            return Object.assign(new Item(), response.docs[0])
        }
    }

    async put(item: Item) {
        await this.db.put(item)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: limit,
            skip: skip
        })

        return response.docs

    }
    
    async getNext(item:Item) : Promise<Item> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: item.channelId },
                dateCreated: { $gt: item.dateCreated }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: 1,
            skip: 0
        })

        if (response.docs?.length > 0) {
            return Object.assign(new Item(), response.docs[0])
        }
    }

    async getPrevious(item:Item) : Promise<Item> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: item.channelId },
                dateCreated: { $lt: item.dateCreated }
            },
            sort: [{ 'dateCreated': 'desc' }],
            limit: 1,
            skip: 0
        })

        if (response.docs?.length > 0) {
            return Object.assign(new Item(), response.docs[0])
        }
    }

    async countByChannel(channelId:string) : Promise<number> {

        let result = await this.db.query('item_index/by_channel_id', {
            reduce: true,
            key: channelId,
            include_docs: false
        })

        if (result.rows[0]) {
            return result.rows[0].value
        } else {
            return 0
        }
    }

    async delete(item: Item): Promise<void> {
        await this.db.remove(item)
    }

    async getMaxTokenId(channelId:string) : Promise<number> {

        let result = await this.db.query('item_token_id/token_id_stats', {
            reduce: true,
            include_docs: false,
            key: channelId,
            stale: 'update_after',
            limit: 1
        })

        if (result.rows[0]) {
            return result.rows[0].value
        } else {
            return 0
        }

    }

    async getAttributeInfo(channelId:string, attributes:[{ traitType:string, value:string}]) : Promise<AttributeInfo[]> {

        let result = await this.db.query('item_attribute_counts_index/attribute_counts', {
            reduce: true,
            keys: attributes.map(a => [channelId, a.traitType, a.value]),
            include_docs: false,
            stale: 'update_after',
            group_level: 3
        })

        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value
            }
        })

    }

}

interface AttributeInfo {   
    traitType:string
    value:string
    count:number 
    percent:number
}


export {
    ItemRepository, AttributeInfo
}