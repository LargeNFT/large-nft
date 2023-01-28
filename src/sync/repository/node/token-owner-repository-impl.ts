import {  inject, injectable } from "inversify"
import { TokenOwner } from "../../dto/token-owner.js"
import { TokenOwnerRepository } from "../token-owner-repository.js"


@injectable()
class TokenOwnerRepositoryNodeImpl implements TokenOwnerRepository {
  
    constructor() {}

    async getENS(_id: string): Promise<string> {
        throw new Error("Method not implemented.")
    }

    async get(_id:string, options?:any): Promise<TokenOwner> {        
        return TokenOwner.findByPk(_id, options)
    }

    async put(tokenOwner:TokenOwner, options?:any) : Promise<TokenOwner> {

        // options.logging = console.log


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
            // logging: console.log,
            limit: limit,
            offset: skip,
            order: [
                ['count', 'DESC']
            ]
        }

        return TokenOwner.findAll(Object.assign(query, options))

    }



}





export {
    TokenOwnerRepositoryNodeImpl
}