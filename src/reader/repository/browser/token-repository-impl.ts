import {  inject, injectable } from "inversify"
import { Token } from "../../dto/token.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { TokenRepository } from "../token-repository.js"


@injectable()
class TokenRepositoryBrowserImpl implements TokenRepository {

    db:any
    dbName:string = "tokens"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }



    async get(_id: string): Promise<Token> {
        return Object.assign(new Token(), await this.db.get(_id))
    }


    async put(token: Token): Promise<void> {
        await this.db.put(token)
    }
  
    async putAll(tokens:Token[]) : Promise<void> {
        await this.db.bulkDocs(tokens)
    }

}





export {
    TokenRepositoryBrowserImpl
}