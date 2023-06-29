import { Author } from "../dto/author.js";
import { inject, injectable } from "inversify";
import { AuthorRepository } from "../repository/author-repository.js";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception.js";
import { WalletService } from "./core/wallet-service.js";
import TYPES from "./core/types.js";

@injectable()
class AuthorService {

  db: any

  constructor(
    private authorRepository: AuthorRepository,
    @inject(TYPES.WalletService) private walletService: WalletService
  ) { }

  async load(channelId:string) {
    this.db = await this.authorRepository.load(channelId)
  }

  async get(_id: string): Promise<Author> {
    return this.authorRepository.get(_id)
  }

  async put(author: Author) {

    if (!author._id) {
      author._id = author.walletAddress
      author.dateCreated = new Date().toJSON()
    } else {
      author.lastUpdated = new Date().toJSON()
    }

    //Validate
    let errors: ValidationError[] = await validate(author, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    return this.authorRepository.put(author)
  }

  async insertIfNew(walletAddress: string) {

    let existing

    try {
      existing = await this.get(walletAddress)
    } catch (ex) { }

    if (!existing) {

      await this.put(Object.assign(new Author(), {
        _id: walletAddress,
        walletAddress: walletAddress
      }))

    }


  }

  getDisplayName(author: Author): string {
    if (!author) return
    if (author.name) return author.name
    return this.walletService.truncateEthAddress(author._id)
  }



}


export { AuthorService }

