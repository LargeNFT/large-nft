import {  inject, injectable } from "inversify"
import { TokenOwner } from "../../dto/token-owner.js"
import { TokenOwnerRepository } from "../token-owner-repository.js"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Op } = require("sequelize")

@injectable()
class TokenOwnerRepositoryNodeImpl implements TokenOwnerRepository {
  

    @inject("sequelize")
    private sequelize:Function

    constructor() {}

    // async getENS(_id: string): Promise<string> {
        
    //     //This is just to match the interface. Probably rethink the entire getENS method at some point.
    //     let tokenOwner = await this.get(_id)
    //     return tokenOwner?.ensName

    // }

    async get(_id:string, options?:any): Promise<TokenOwner> {        
        return TokenOwner.findByPk(_id, options)
    }

    async getByIds(_ids:string[], options?:any) {

        let query = {
            where: {
                _id: {
                    [Op.in]: _ids
                }
            },
            order: [
                ['count', 'DESC']
            ]
        }

        return TokenOwner.findAll(Object.assign(query, options))
    }


    async put(tokenOwner:TokenOwner, options?:any) : Promise<TokenOwner> {

        if (tokenOwner.changed()) {
            await tokenOwner.save(options)
        } 
        
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