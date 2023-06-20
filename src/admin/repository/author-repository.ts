import { injectable } from "inversify"
import { Author } from "../dto/author.js"
import { DatabaseService } from "../service/core/database-service.js"


@injectable()
class AuthorRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("author")
    }
    
    async get(_id: string): Promise<Author> {
        return Object.assign(new Author(), await this.db.get(_id))
    }

    async put(author: Author) {
        return this.db.put(author)
    }

}

export {
    AuthorRepository
}