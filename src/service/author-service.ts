import { Author } from "../dto/author";
import {  injectable } from "inversify";
import { AuthorRepository } from "../repository/author-repository";

@injectable()
class AuthorService {

  db:any

  constructor(
    private authorRepository:AuthorRepository
  ) {}

  async get(_id: string): Promise<Author> {
    return this.authorRepository.get(_id)
  }

  async put(author: Author) {

    let key:string

    if (!author._id) {
      author._id = author.walletAddress
    } 

    await this.authorRepository.put(author)
  }


}


export { AuthorService }

