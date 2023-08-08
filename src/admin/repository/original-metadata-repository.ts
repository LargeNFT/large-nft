import { injectable } from "inversify"
import { Changeset, DatabaseService } from "../service/core/database-service.js"
import { OriginalMetadata } from "../dto/original-metadata.js"


@injectable()
class OriginalMetadataRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {

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
        this.db = await this.databaseService.getDatabase(`${channelId}-original-metadata`, this.changesets)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-original-metadata`)
    }

    async get(_id: string): Promise<OriginalMetadata> {
        return Object.assign(new OriginalMetadata(), await this.db.get(_id))
    }

    async put(originalMetadata: OriginalMetadata) {
        await this.db.put(originalMetadata)
    }

    async delete(originalMetadata: OriginalMetadata): Promise<void> {
        await this.db.remove(originalMetadata)
    }

    async getByIds(ids:string[]) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true

        })

        return results.rows?.map( d => d.doc)
    }

}

export {
    OriginalMetadataRepository
}