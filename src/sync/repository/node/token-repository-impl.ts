import {  injectable } from "inversify"
import { Token } from "../../dto/token.js"
import { TokenRepository } from "../token-repository.js"


@injectable()
class TokenRepositoryNodeImpl implements TokenRepository {

    async get(_id: string): Promise<Token> {
        return Token.findByPk(_id)
    }

    async put(token: Token, options?:any): Promise<Token> {

        await token.save(options)
        return token
    
    }
  
    async putAll(tokens:Token[], options?:any) : Promise<void> {
        for (let token of tokens) {
            await this.put(token, options)
        }
    }


}





export {
    TokenRepositoryNodeImpl
}