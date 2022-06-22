import { Theme } from "../dto/theme";
import { inject, injectable } from "inversify";
import { ThemeRepository } from "../repository/theme-repository";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception";
import { WalletService } from "./core/wallet-service";
import TYPES from "./core/types";
import Hash from 'ipfs-only-hash'
import { v4 as uuidv4 } from 'uuid';

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
      theme._id = uuidv4()
      theme.dateCreated = new Date().toJSON()
    } else {
      theme.lastUpdated = new Date().toJSON()
    }

  
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

  async delete(theme:Theme) {
    return this.themeRepository.delete(theme)
  }


  async listByChannel(channelId: string, limit: number, skip: number): Promise<Theme[]> {
    return this.themeRepository.listByChannel(channelId, limit, skip)
  }



}


export { ThemeService }

