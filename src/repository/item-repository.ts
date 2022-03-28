import { injectable } from "inversify"
import { Item } from "../dto/item"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class ItemRepository {

    CREATE_INDEXES = async (db) => {

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

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(walletAddress: string) {

        this.db = await this.databaseService.getDatabase(walletAddress, "item", this.CREATE_INDEXES)
    }
    async get(_id: string): Promise<Item> {
        return Object.assign(new Item(), await this.db.get(_id))
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


    async delete(item: Item): Promise<void> {
        await this.db.remove(item)
    }

}

export {
    ItemRepository
}