import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { TokenRepository } from "../../sync/repository/token-repository.js"
import { Token } from "../../sync/dto/token.js"
import { ValidationException } from "../../reader/util/validation-exception.js"




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

    async put(token:Token, options?:any) {

        if (!token._id) {
            token._id = token.tokenId.toString()
        }

        return this.tokenRepository.put(token, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(tokens:Token[], options?:any) {
        return this.tokenRepository.putAll(tokens, options)
    }


}



export {
    TokenService
}

