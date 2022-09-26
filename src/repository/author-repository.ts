import { injectable } from "inversify"
import { Author } from "../dto/author"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class AuthorRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "author")
    }
    
    async get(_id: string): Promise<Author> {
        return Object.assign(new Author(), await this.db.get(_id))
    }

    async put(author: Author) {
        await this.db.put(author)
    }

}

export {
    AuthorRepository
}