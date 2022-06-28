import { injectable } from "inversify"
import { StaticPage } from "../dto/static-page"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class StaticPageRepository {

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
        this.db = await this.databaseService.getDatabase(walletAddress, "static-page", this.CREATE_INDEXES)
    }
    async get(_id: string): Promise<StaticPage> {
        return Object.assign(new StaticPage(), await this.db.get(_id))
    }

    async put(staticPage: StaticPage) {
        await this.db.put(staticPage)
    }

    async delete(staticPage:StaticPage) {
        await this.db.remove(staticPage)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<StaticPage[]> {

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

}

export {
    StaticPageRepository
}