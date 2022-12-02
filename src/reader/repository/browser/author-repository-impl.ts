import {  inject, injectable } from "inversify"
import { Author } from "../../dto/author.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { AuthorRepository } from "../author-repository.js"

@injectable()
class AuthorRepositoryBrowserImpl implements AuthorRepository {

    db:any
    dbName:string = "authors"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true
        })
    }

    constructor(
    ) {}


    async get(_id:string): Promise<Author> {        
        return Object.assign(new Author(), await this.db.get(_id))
    }

}

export {
    AuthorRepositoryBrowserImpl
}