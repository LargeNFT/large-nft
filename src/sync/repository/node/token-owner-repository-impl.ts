import {  inject, injectable } from "inversify"
import { TokenOwner } from "../../dto/token-owner.js"
import { TokenOwnerRepository } from "../token-owner-repository.js"


@injectable()
class TokenOwnerRepositoryNodeImpl implements TokenOwnerRepository {
  

    @inject("sequelize")
    private sequelize:Function

    constructor() {}

    async getENS(_id: string): Promise<string> {
        throw new Error("Method not implemented.")
    }

    async get(_id:string, options?:any): Promise<TokenOwner> {        
        return TokenOwner.findByPk(_id, options)
    }

    async put(tokenOwner:TokenOwner, options?:any) : Promise<TokenOwner> {
        await tokenOwner.save(options)
        return tokenOwner
        
    }

    async putAll(tokenOwners:TokenOwner[], options?:any) : Promise<void> {

        for (let tokenOwner of tokenOwners) {
            await this.put(tokenOwner,options)
        }

    }


    async list(limit: number, skip: number, options?:any): Promise<TokenOwner[]> {

        let query = {
            limit: limit,
            offset: skip,
            order: [
                ['count', 'DESC']
            ]
        }

        return TokenOwner.findAll(Object.assign(query, options))

    }


    async rerank(options?:any) : Promise<void> {

        let s = await this.sequelize()

        
        const [queryResults, metadata] = await s.query(`
            WITH ranks AS (
                select 
                    _id,
                    RANK() OVER(ORDER BY count DESC) as overallRank,
                    DENSE_RANK() OVER(ORDER BY count DESC) as rank
                from token_owner
            )
            
            UPDATE 'token_owner'
            SET ('overallRank', 'rank')  = (
                select 
                    overallRank, rank
                from ranks WHERE ranks._id = token_owner._id
            )
        `, Object.assign({
            raw: true,
            nest: false,
            plain: false
        }, options))

    }

}





export {
    TokenOwnerRepositoryNodeImpl
}