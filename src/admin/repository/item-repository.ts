import { injectable } from "inversify"
import { Item } from "../dto/item.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"
import { AttributeCount, AttributeSelection } from "../dto/attribute.js"

import { changesets } from "./changesets/item-changeset.js"


@injectable()
class ItemRepository {

    static CHUNK_SIZE = 35

    changesets:Changeset[] = changesets

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-item`, this.changesets)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-item`)
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


    async getByImageId(imageId:string) : Promise<Item[]> {

        let result = await this.db.query('by_image_id', {
            reduce: false,
            include_docs: true,
            key: imageId
        })

        return result.rows?.map( r => r.doc)


    }


    async getByAnimationId(animationId:string) : Promise<Item[]> {

        let response = await this.db.find({
            selector: { "animationId": { $eq: animationId } }
        })

        return response.docs

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