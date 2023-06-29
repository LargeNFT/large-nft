import { injectable } from "inversify"
import { StaticPage } from "../dto/static-page.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"


@injectable()
class StaticPageRepository {

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
        this.db = await this.databaseService.getDatabase(`${channelId}-static-page`, this.changesets)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-static-page`)
    }

    async get(_id: string): Promise<StaticPage> {
        return Object.assign(new StaticPage(), await this.db.get(_id))
    }

    async getLatestRevision(_id:string) : Promise<StaticPage> {
        return Object.assign(new StaticPage(), await this.databaseService.getLatestRevision(this.db, _id))
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