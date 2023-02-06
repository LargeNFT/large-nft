import axios from "axios"
import {  inject, injectable } from "inversify"
import { Token } from "../../dto/token.js"

import { TokenRepository } from "../token-repository.js"


@injectable()
class TokenRepositoryBrowserImpl implements TokenRepository {
  

    @inject('baseURI') 
    private baseURI


    constructor() {}



    async get(_id:string): Promise<Token> {    
        
        try {
            //Download it.
            let result = await axios.get(`${this.baseURI}sync/tokens/${_id}.json`)
            return Object.assign(new Token(), result.data)
        } catch(ex) {
            console.log(ex)
        }

    }



}





export {
    TokenRepositoryBrowserImpl
}