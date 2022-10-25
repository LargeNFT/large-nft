import { injectable } from "inversify"
import { cacheQuery, QueryCacheService } from "../service/core/query-cache-service"
import { Item } from "../dto/item"
import { Changeset, DatabaseService } from "../service/core/database-service"
import { AggregateStats } from "dto/aggregate-stats"


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
        },

        {
            id: '3',
            changeset: async (db) => {

                await db.createIndex({
                    index: {
                        fields: ['channelId', 'tokenId']
                    }
                })


                        
                await db.put({
                    _id: '_design/token_id_stats',
                    views: {
                    token_id_stats: {
                        map: function (doc) { 
                            //@ts-ignore
                            emit(doc.channelId, doc.tokenId)
                        }.toString(),
                        reduce: '_stats'
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

    async getByTokenId(channelId: string, tokenId:number) : Promise<Item> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                tokenId: { $eq: tokenId },
            },
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
    

    
    @cacheQuery('token_id_stats_by_channel')
    async getTokenIdStatsByChannel(channelId:string) : Promise<AggregateStats> {

        let result = await this.db.query('token_id_stats', {
            reduce: true,
            include_docs: false,
            key: channelId,
            limit: 1
        })

        let tokenIdStats = result.rows[0].value

        return tokenIdStats

    }






    async delete(item: Item): Promise<void> {
        await this.db.remove(item)
    }


    @cacheQuery('attribute_info_by_channel_trait_type_value')
    async getAttributeInfo(channelId:string, traitType:string, value:string) : Promise<AttributeInfo> {

        let result = await this.db.query('item_attribute_counts_index/attribute_counts', {
            reduce: true,
            key:[channelId, traitType, value],
            include_docs: false,
            group_level: 3
        })

        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value
            }
        })[0]

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