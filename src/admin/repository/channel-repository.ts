import { injectable } from "inversify"
import { Channel } from "../dto/channel.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"


@injectable()
class ChannelRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {

            //Create indexes
            await db.createIndex({ index: { fields: ['dateCreated'] } })
            await db.createIndex({ index: { fields: ['lastUpdated'] } })

        }
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("channel", this.changesets)
    }

    async get(_id: string): Promise<Channel> {
        return Object.assign(new Channel(), await this.db.get(_id))
    }

    async getLatestRevision(_id:string) : Promise<Channel> {
        return Object.assign(new Channel(), await this.databaseService.getLatestRevision(this.db, _id))
    }

    async put(channel: Channel) {
        return this.db.put(channel)
    }

    async list(limit: number, skip: number): Promise<Channel[]> {

        // console.log(await this.db.allDocs({include_docs: true}))

        let response = await this.db.find({
            selector: { "dateCreated": { $exists: true } },
            sort: [{ 'dateCreated': 'desc' }],
            limit: limit,
            skip: skip
        })

        return response.docs

    }

    async delete(channel: Channel): Promise<void> {
        await this.db.remove(channel)
    }


}

export {
    ChannelRepository
}