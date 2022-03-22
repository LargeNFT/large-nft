import { injectable } from "inversify"
import { PinningApi } from "../dto/pinning-api"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class PinningApiRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "pinning-api")
    }
    async get(_id: string): Promise<PinningApi> {
        return Object.assign(new PinningApi(), await this.db.get(_id))
    }

    async put(pinningApi: PinningApi) {
        await this.db.put(pinningApi)
    }

}

export {
    PinningApiRepository
}