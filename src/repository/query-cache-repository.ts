import { QueryCache } from "../dto/query-cache.js"
import { injectable } from "inversify"
import { DatabaseService } from "../service/core/database-service.js"


@injectable()
class QueryCacheRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("query-cache")
    }

    async get(_id: string): Promise<QueryCache> {
        return Object.assign(new QueryCache(), await this.db.get(_id))
    }

    async put(queryCache: QueryCache) {
        await this.db.put(queryCache)
    }


    async delete(_id:string): Promise<void> {
        await this.db.remove(_id)
    }

}

export {
    QueryCacheRepository
}