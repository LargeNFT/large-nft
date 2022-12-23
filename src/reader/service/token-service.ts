import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { Token } from "../dto/token.js"
import { TokenRepository } from "../repository/token-repository.js"



@injectable()
class TokenService {

    @inject("TokenRepository")
    private tokenRepository:TokenRepository

    constructor() {}


    async get(_id:string): Promise<Token> {        
        return this.tokenRepository.get(_id)
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

