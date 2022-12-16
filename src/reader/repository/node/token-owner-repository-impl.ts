import {  inject, injectable } from "inversify"
import { TokenOwner } from "../../dto/token-owner.js"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"
import { changesets, TokenOwnerRepository } from "../token-owner-repository.js"


@injectable()
class TokenOwnerRepositoryNodeImpl implements TokenOwnerRepository {
  
    db:any
    dbName:string = "token-owners"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }

    constructor() {}


    async get(_id:string): Promise<TokenOwner> {        
        return Object.assign(new TokenOwner(), await this.db.get(_id))
    }

    async put(tokenOwner:TokenOwner) {
        await this.db.put(tokenOwner)
    }

    async list(limit: number, skip: number): Promise<TokenOwner[]> {

        let response = await this.db.find({
            selector: { 
                "count": { 
                    $gt: 0 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{count: 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }

        return response.docs

    }


    async getByTokenId(tokenId:number, limit:number, skip:number) : Promise<TokenOwner> {
        
        let result = await this.db.query('by_token_id', {
            include_docs: true,
            key: tokenId,
            limit: limit,
            skip: skip
        })

        if (result.rows?.length == 1) {
            return result.rows[0].doc
        }

    }


}





export {
    TokenOwnerRepositoryNodeImpl
}