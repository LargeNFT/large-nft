import { injectable } from "inversify"
import { Theme } from "../dto/theme"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class ThemeRepository {

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
        this.db = await this.databaseService.getDatabase(walletAddress, "theme", this.CREATE_INDEXES)
    }
    async get(_id: string): Promise<Theme> {
        return Object.assign(new Theme(), await this.db.get(_id))
    }

    async put(theme: Theme) {
        await this.db.put(theme)
    }

    async delete(theme:Theme) {
        await this.db.remove(theme)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Theme[]> {

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
    ThemeRepository
}