import { Author } from "../dto/author";
import {  injectable } from "inversify";
import { IpfsService } from "./core/ipfs-service";
import { DatabaseService } from "./core/database-service";

@injectable()
class AuthorService {

  db:any

  constructor(
    private databaseService:DatabaseService
  ) {}

  async load(walletAddress:string) {
    this.db = this.databaseService.getDatabase(walletAddress, "author")
  }


  async get(_id: string): Promise<Author> {
    return this.db.get(_id)
  }

  async put(profile: Author) {

    let key:string

    if (profile._id) {
      key = profile._id
    } else {
      key = profile.walletAddress
    }

    await this.db.put(key, profile)
  }


}


export { AuthorService }

