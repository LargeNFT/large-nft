import axios from "axios"
import {  inject, injectable } from "inversify"
import { TokenOwner } from "../../dto/token-owner.js"
import { DatabaseService } from "../../../reader/service/core/database-service.js"
import { changesets, TokenOwnerRepository } from "../token-owner-repository.js"


@injectable()
class TokenOwnerRepositoryBrowserImpl implements TokenOwnerRepository {
  
    db:any
    dbName:string = "token-owners"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    @inject('baseURI') 
    private baseURI


    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }

    constructor() {}

    async getENS(_id: string): Promise<string> {

        let name

        try {
            //Download it.
            let result:any = await axios.get(`${this.baseURI}sync/tokenOwner/ens/${_id}.json`)
            name = result.data?.name
        } catch(ex) {}

        return name
    }


    async get(_id:string): Promise<TokenOwner> {    
        
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/tokenOwner/${_id}.json`)
            return Object.assign(new TokenOwner(), result.data)
        } catch(ex) {
            console.log(ex)
        }

    }

    async put(tokenOwner:TokenOwner) {
    }

    async putAll(tokenOwners:TokenOwner[]) : Promise<void> {
        return
    }

    async list(limit: number, skip: number): Promise<TokenOwner[]> {
        return
    }


    async getByTokenId(tokenId:number, limit:number, skip:number) : Promise<TokenOwner> {
        return
    }


}





export {
    TokenOwnerRepositoryBrowserImpl
}