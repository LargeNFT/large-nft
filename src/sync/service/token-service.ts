import { inject, injectable } from "inversify"
import { TokenRepository } from "../../sync/repository/token-repository.js"
import { Token } from "../../sync/dto/token.js"
import { ItemService } from "../../reader/service/item-service.js"




@injectable()
class TokenService {

    @inject("TokenRepository")
    private tokenRepository:TokenRepository

    @inject("ItemService")
    private itemService:ItemService

    constructor() {}


    async get(_id:number, options?:any): Promise<Token> {        
        return this.tokenRepository.get(_id, options)
    }

    async getOrCreate(_id:number) {

        let token

        try {
            token = await this.get(_id)
        } catch(ex) {}
        
        if (!token) {
            token = new Token()
            token._id = _id
            token.tokenId = _id
            token.ownershipHistory = []
            token.transactionsViewModel = {
                transactions: [],
                rowItemViewModels: {}
            }

            //Look up attributes from item
            let item = await this.itemService.getByTokenId(token._id)

            token.attributeSelections = item.attributeSelections

        }

        return token
    }

    async put(token:Token, options?:any) {

        if (!token._id) {
            token._id = token.tokenId.toString()
        }

        return this.tokenRepository.put(token, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(tokens:Token[], options?:any) {
        return this.tokenRepository.putAll(tokens, options)
    }



    async getTokenIdsByAttribute(traitType: string, value: string, options?: any): Promise<number[]> {
        return this.tokenRepository.getTokenIdsByAttribute(traitType, value, options)
    }



}



export {
    TokenService
}

