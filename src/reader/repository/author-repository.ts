import { Author } from "../dto/author.js"

interface AuthorRepository {
    get(_id:string): Promise<Author>
}

export {
    AuthorRepository
}
