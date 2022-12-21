import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { TokenOwnerRepository } from "../repository/token-owner-repository.js"
import { TokenOwner } from "../dto/token-owner.js"
import { LeaderboardRowViewModel, TokenOwnerPage } from "../dto/token-owner-page.js"

@injectable()
class TokenOwnerService {

    @inject("TokenOwnerRepository")
    private tokenOwnerRepository:TokenOwnerRepository

    constructor() {}


    async get(_id:string): Promise<TokenOwner> {        
        return this.tokenOwnerRepository.get(_id)
    }

    async put(tokenOwner:TokenOwner) {

        if (!tokenOwner._id) {
            tokenOwner._id = tokenOwner.address
            tokenOwner.dateCreated = new Date().toJSON()
        } 

        tokenOwner.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(tokenOwner, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.tokenOwnerRepository.put(tokenOwner)
    }



    async list(limit: number, skip: number): Promise<TokenOwner[]> {
        return this.tokenOwnerRepository.list(limit, skip)
    }

    async getByTokenId(tokenId:number, limit:number, skip:number) : Promise<TokenOwner> {
        return this.tokenOwnerRepository.getByTokenId(tokenId, limit, skip)
    }

}


export {
    TokenOwnerService
}
