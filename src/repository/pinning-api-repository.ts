import { injectable } from "inversify"
import { PinningApi } from "../dto/pinning-api"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class PinningApiRepository {

    CREATE_INDEXES = async (db) => {

        //Create indexes
        await db.createIndex({ index: { fields: ['dateCreated'] } })
        
    }


    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "pinning-api", this.CREATE_INDEXES)
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

}

export {
    PinningApiRepository
}