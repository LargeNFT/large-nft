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

  async insertIfNew(walletAddress:string) {

    let existing

    try {
      existing = await this.get(walletAddress)
    } catch(ex) {}

    if (!existing) {

      await this.put(Object.assign(new Author(), {
        _id: walletAddress,
        walletAddress: walletAddress
      }))

    }


  }

  getDisplayName(author:Author) : string {
    if (!author) return 
    if (author.name) return author.name
    return author._id

  }



}


export { AuthorService }

