import { injectable } from "inversify"
import { Author } from "../dto/author.js"
import { DatabaseService } from "../service/core/database-service.js"


@injectable()
class AuthorRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-author`)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-author`)
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