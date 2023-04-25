import {  inject, injectable } from "inversify"
import { Token } from "../../dto/token.js"
import { TokenRepository } from "../token-repository.js"


@injectable()
class TokenRepositoryNodeImpl implements TokenRepository {

    @inject("sequelize")
    private sequelize:Function

    async get(_id: number, options?:any): Promise<Token> {
        return Token.findByPk(_id, options)
    }

    async put(token: Token, options?:any): Promise<Token> {

        if (token.changed()) {
            await token.save(options)
        }
        
        return token
    
    }
  
    async putAll(tokens:Token[], options?:any) : Promise<void> {
        for (let token of tokens) {
            await this.put(token, options)
        }
    }

    async getTokenIdsByAttribute(traitType: string, value: string, options?: any): Promise<number[]> {
        
        let s = await this.sequelize()

        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            mapToModel: false,
            replacements: { 
                traitType: traitType,
                value: value
            }
        }

        const [attributeResults, metadata] = await s.query(`
            select 
                t._id,
                JSON_EXTRACT(a.value, '$.traitType') traitType, 
                JSON_EXTRACT(a.value, '$.value') v
            FROM 'token' t, JSON_EACH(attributeSelections) a 
            WHERE traitType = :traitType AND v = :value
        `, Object.assign(queryOptions, options))



        return attributeResults.map( ar => parseInt(ar._id))
    }


    async getLatest(options?:any): Promise<Token> {

        let s = await this.sequelize()


        const maxIdToken = await Token.findOne({
            attributes: [[s.fn('max', s.col('_id')), 'max_id']],
        }, options)
          
        return this.get(maxIdToken?.get('max_id', options))
    }

}





export {
    TokenRepositoryNodeImpl
}