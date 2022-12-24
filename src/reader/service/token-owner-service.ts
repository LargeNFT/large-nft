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

    async getOrCreate(address:string) {

        let tokenOwner: TokenOwner 

        if (!tokenOwner) {
            try {
                tokenOwner = await this.get(address)
            } catch (ex) { }
        }

        if (!tokenOwner) {
            tokenOwner = new TokenOwner()
            tokenOwner._id = address
            tokenOwner.tokenIds = []
            tokenOwner.count = 0
        }

        return tokenOwner

    }


    async put(tokenOwner:TokenOwner) {

        if (!tokenOwner._id) {
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

    /**
     * No validation for speeeeeeeeed
     * @param tokenOwners 
     * @returns 
     */
     async putAll(tokenOwners:TokenOwner[]) {

        //Update lastUpdated
        tokenOwners.forEach(tokenOwner => {

            if (!tokenOwner._id) {
                tokenOwner.dateCreated = new Date().toJSON()
            } 
    

            tokenOwner.lastUpdated = new Date().toJSON()
        })

        return this.tokenOwnerRepository.putAll(tokenOwners)
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

