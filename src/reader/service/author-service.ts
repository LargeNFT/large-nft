import { Author } from "../dto/author.js";
import { inject, injectable } from "inversify";
import { AuthorRepository } from "../repository/author-repository.js";
import { WalletService } from "./core/wallet-service.js";


@injectable()
class AuthorService {

  @inject("AuthorRepository")
  private authorRepository:AuthorRepository

  @inject("WalletService")
  private walletService:WalletService

  constructor() { }

  async get(_id: string): Promise<Author> {
    return this.authorRepository.get(_id)
  }

  getDisplayName(author: Author): string {
    if (!author) return
    if (author.name) return author.name
    return this.walletService.truncateEthAddress(author._id)
  }


}


export { AuthorService }

