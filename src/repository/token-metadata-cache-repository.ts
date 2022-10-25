import { TokenMetadata, TokenMetadataCache } from "../dto/token-metadata-cache"
import { injectable } from "inversify"
import { Author } from "../dto/author"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class TokenMetadataCacheRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "token-metadata-cache")
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