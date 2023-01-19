import {  injectable } from "inversify"
import { Token } from "../../dto/token.js"
import { TokenRepository } from "../token-repository.js"


@injectable()
class TokenRepositoryNodeImpl implements TokenRepository {

    async get(_id: string): Promise<Token> {
        return Token.findByPk(_id)
    }

    async put(token: Token, options?:any): Promise<Token> {
        return token.save(options)
    }
  
    async putAll(tokens:Token[], options?:any) : Promise<void> {

        // let toInsert = tokens.filter(t => !t.dateCreated)
        // let toUpdate = tokens.filter(t => t.dateCreated)

        // await Token.bulkCreate(toInsert)

        for (let token of tokens) {
            await this.put(token, options)
        }
    }


}





export {
    TokenRepositoryNodeImpl
}