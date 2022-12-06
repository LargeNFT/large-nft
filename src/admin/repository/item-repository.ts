import { injectable } from "inversify"
import { cacheQuery, QueryCacheService } from "../service/core/query-cache-service.js"
import { Item } from "../dto/item.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"
import { AttributeCount, AttributeSelection } from "../dto/attribute.js"


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
                        
            }
        },

        {
            id: '1',
            changeset: async (db) => {

                await db.put({
                    _id: '_design/attribute_counts',
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
            id: '5',
            changeset: async (db) => {
   
                await db.put({
                    _id: '_design/by_channel_token',
                    views: {
                        by_channel_token: {
                            map: function (doc) { 
                                //@ts-ignore
                                emit([doc.channelId, doc.tokenId])
                            }.toString(),
                        }
                    }
                })

                await db.put({
                    _id: '_design/by_channel_token_stats',
                    views: {
                        by_channel_token_stats: {
                            map: function (doc) { 
                                //@ts-ignore
                                emit(doc.channelId, doc.tokenId)
                            }.toString(),
                            reduce: "_stats"
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

    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-item`, this.changesets)
    }

    async get(_id: string): Promise<Item> {
        return Object.assign(new Item(), await this.db.get(_id))
    }

    async getLatestRevision(_id:string) : Promise<Item> {
        return Object.assign(new Item(), await this.databaseService.getLatestRevision(this.db, _id))
    }

    async getByTokenId(channelId: string, tokenId:number) : Promise<Item> {

        let result = await this.db.query('by_channel_token', {
            reduce: false,
            include_docs: true,
            key: [channelId, tokenId],
            limit: 1
        })
        
        if (result.rows?.length > 0) {
            return Object.assign(new Item(), result.rows[0].doc)
        }
       
    }

    async put(item: Item) {
        await this.db.put(item)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Item[]> {

        let items:Item[] = []

        let result = await this.db.query('by_channel_token', {
            reduce: false,
            include_docs: true,
            startkey: [channelId, 0],
            endkey: [channelId, {}],
            limit: limit,
            skip: skip
        })

        if (result.rows?.length > 0) {

            for (let row of result.rows) {
                items.push(Object.assign(new Item(), row.doc))
            }
        }


        return items

        // let response = await this.db.find({
        //     selector: {
        //         channelId: { $eq: channelId },
        //         tokenId: { $exists: true }
        //     },
        //     sort: [{ 'tokenId': 'asc' }],
        //     limit: limit,
        //     skip: skip
        // })

        // let expl = await this.db.explain({
        //     selector: {
        //         channelId: { $eq: channelId },
        //         tokenId: { $exists: true }
        //     },
        //     sort: [{ 'tokenId': 'asc' }],
        //     limit: limit,
        //     skip: skip
        // })

        // console.log(expl)

        // return response.docs

    }

    async delete(item: Item): Promise<void> {
        await this.db.remove(item)
    }

    async getAttributeCountByChannel(channelId:string) : Promise<AttributeCount[]> {

        let result = await this.db.query('attribute_counts', {
            reduce: true,
            startKey:[channelId, "", ""],
            endKey:[channelId, {}, {}],
            include_docs: false,
            group_level: 3
        })

        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value,
                channelId: channelId
            }
        })

    }

    async getAttributeInfoBySelections(channelId:string, attributeSelections:AttributeSelection[]) : Promise<AttributeCount[]> {

        let result = await this.db.query('attribute_counts', {
            reduce: true,
            keys:attributeSelections.map( as => [channelId, as.traitType, as.value]),
            include_docs: false,
            group_level: 3
        })

        // console.log(result)

        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value,
                channelId: channelId
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