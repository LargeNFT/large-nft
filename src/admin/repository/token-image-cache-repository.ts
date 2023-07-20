import { injectable } from "inversify"
import { DatabaseService } from "../service/core/database-service.js"
import { TokenImageCache } from "../dto/token-image-cache.js"


@injectable()
class TokenImageCacheRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("token-image-cache")
    }
    
    async get(_id: string): Promise<TokenImageCache> {
        return Object.assign(new TokenImageCache(), await this.db.get(_id))
    }

    async put(tokenImageCache: TokenImageCache) {
        await this.db.put(tokenImageCache)
    }

}

export {
    TokenImageCacheRepository
}