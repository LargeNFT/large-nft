import {  inject, injectable } from "inversify"
import { Author } from "../../dto/author.js"
import fs from "fs"
import { AuthorRepository } from "../author-repository.js"

@injectable()
class AuthorRepositoryNodeImpl implements AuthorRepository {

    constructor(
        @inject('baseDir') private baseDir
    ) {}
    async get(_id:string): Promise<Author> {        
        
        const authors = JSON.parse(fs.readFileSync(`${this.baseDir}/backup/export/backup/authors.json`, 'utf8'))
        
        let author:Author = authors.filter( author => author._id == _id)[0]

        return author
    }

}

export {
    AuthorRepositoryNodeImpl
}