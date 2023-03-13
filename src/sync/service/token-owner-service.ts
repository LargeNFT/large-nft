import { inject, injectable } from "inversify"

import { TokenOwnerRepository } from "../../sync/repository/token-owner-repository.js"
import { TokenOwner } from "../../sync/dto/token-owner.js"
import { WalletService } from "../../reader/service/core/wallet-service.js"

@injectable()
class TokenOwnerService {

    @inject("WalletService")
    private walletService:WalletService

    @inject("TokenOwnerRepository")
    private tokenOwnerRepository:TokenOwnerRepository

    constructor() {}


    async get(_id:string, options?:any): Promise<TokenOwner> {        
        return this.tokenOwnerRepository.get(_id, options)
    }

    async getByIds(_ids:string[], options?:any) : Promise<TokenOwner[]> {
        return this.tokenOwnerRepository.getByIds(_ids, options)
    }

    async getDisplayName(_id:string) : Promise<string> {

        if (!_id) return

        let tokenOwner = await this.tokenOwnerRepository.get(_id)

        if (tokenOwner?.ensName) return tokenOwner?.ensName
        return this.walletService.truncateEthAddress(_id)

    }

    async getOrCreate(address:string, options?:any) {

        let tokenOwner: TokenOwner 

        if (!tokenOwner) {
            try {
                tokenOwner = await this.get(address, options)
            } catch (ex) { }
        }

        if (!tokenOwner) {
            tokenOwner = new TokenOwner()
            tokenOwner._id = address
            tokenOwner.tokenIds = []
            tokenOwner.count = 0
            tokenOwner.transactionsViewModel = {
                transactions: [],
                rowItemViewModels: {}
            }

        }

        return tokenOwner

    }


    async put(tokenOwner:TokenOwner, options?:any) {
        return this.tokenOwnerRepository.put(tokenOwner, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param tokenOwners 
     * @returns 
     */
     async putAll(tokenOwners:TokenOwner[], options?:any) {
        return this.tokenOwnerRepository.putAll(tokenOwners, options)
    }


    async list(limit: number, skip: number, options?:any): Promise<TokenOwner[]> {
        return this.tokenOwnerRepository.list(limit, skip, options)
    }

    async rerank(options?:any) : Promise<void> {
        return this.tokenOwnerRepository.rerank(options)
    }



}


export {
    TokenOwnerService
}

