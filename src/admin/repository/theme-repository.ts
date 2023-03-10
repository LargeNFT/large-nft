import { injectable } from "inversify"
import { Theme } from "../dto/theme.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"


@injectable()
class ThemeRepository {

    changesets:Changeset[] = [{
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
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-theme`, this.changesets)
    }
    async get(_id: string): Promise<Theme> {
        return Object.assign(new Theme(), await this.db.get(_id))
    }

    async getLatestRevision(_id:string) : Promise<Theme> {
        return Object.assign(new Theme(), await this.databaseService.getLatestRevision(this.db, _id))
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