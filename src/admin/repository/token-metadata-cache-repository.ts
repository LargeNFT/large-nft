import { TokenMetadata, TokenMetadataCache } from "../dto/token-metadata-cache.js"
import { injectable } from "inversify"
import { Author } from "../dto/author.js"
import { DatabaseService } from "../service/core/database-service.js"


@injectable()
class TokenMetadataCacheRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("token-metadata-cache")
    }
    
    async get(_id: string): Promise<TokenMetadataCache> {
        return Object.assign(new TokenMetadataCache(), await this.db.get(_id))
    }

    async put(tokenMetadataCache: TokenMetadataCache) {
        await this.db.put(tokenMetadataCache)
    }

}

export {
    TokenMetadataCacheRepository
}