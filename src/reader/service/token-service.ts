import { inject, injectable } from "inversify"
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


}


export {
    TokenService
}

