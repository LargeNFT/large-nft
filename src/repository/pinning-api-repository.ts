import { injectable } from "inversify"
import { PinningApi } from "../dto/pinning-api"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class PinningApiRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {
            //Create indexes
            await db.createIndex({ index: { fields: ['dateCreated'] } })
        }
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load() {
        this.db = await this.databaseService.getDatabase("pinning-api", this.changesets)
    }
    async get(_id: string): Promise<PinningApi> {
        return Object.assign(new PinningApi(), await this.db.get(_id))
    }

    async list(limit: number, skip: number): Promise<PinningApi[]> {

        let response = await this.db.find({
            selector: { "dateCreated": { $exists: true } },
            sort: [{ 'dateCreated': 'desc' }],
            limit: limit,
            skip: skip
        })

        return response.docs

    }

    

    async put(pinningApi: PinningApi) {
        await this.db.put(pinningApi)
    }

    async delete(pinningApi: PinningApi): Promise<void> {
        await this.db.remove(pinningApi)
    }


}

export {
    PinningApiRepository
}