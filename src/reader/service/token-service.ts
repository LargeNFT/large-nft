import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { TokenRepository } from "../../sync/repository/token-repository.js"
import { Token } from "../../sync/dto/token.js"




@injectable()
class TokenService {

    @inject("TokenRepository")
    private tokenRepository:TokenRepository

    constructor() {}


    async get(_id:string): Promise<Token> {        
        return this.tokenRepository.get(_id)
    }

    async getOrCreate(_id:string) {

        let token

        try {
            token = await this.get(_id)
        } catch(ex) {}
        
        if (!token) {
            token = new Token()
            token._id = _id
            token.tokenId = _id
        }

        return token
    }

    async put(token:Token) {

        if (!token._id) {
            token._id = token.tokenId.toString()
            token.dateCreated = new Date().toJSON()
        }

        token.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(token, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.tokenRepository.put(token)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(tokens:Token[]) {

        //Update lastUpdated
        tokens.forEach(e => e.lastUpdated = new Date().toJSON())

        return this.tokenRepository.putAll(tokens)
    }


}



export {
    TokenService
}

