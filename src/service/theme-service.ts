import { Theme } from "../dto/theme";
import { inject, injectable } from "inversify";
import { ThemeRepository } from "../repository/theme-repository";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception";
import { WalletService } from "./core/wallet-service";
import TYPES from "./core/types";
import Hash from 'ipfs-only-hash'

@injectable()
class ThemeService {

  db: any

  constructor(
    private themeRepository: ThemeRepository,
    @inject(TYPES.WalletService) private walletService: WalletService
  ) { }

  async get(_id: string): Promise<Theme> {
    return this.themeRepository.get(_id)
  }

  async put(theme: Theme) {

    if (!theme._id) {
      theme.dateCreated = new Date().toJSON()
    }

    theme._id = Hash.of(JSON.stringify(theme))
    
    theme.lastUpdated = new Date().toJSON()


    //Validate
    let errors: ValidationError[] = await validate(theme, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.themeRepository.put(theme)
  }



}


export { ThemeService }

