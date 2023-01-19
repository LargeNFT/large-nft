import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"

import { TokenOwnerRepository } from "../../sync/repository/token-owner-repository.js"
import { TokenOwner } from "../../sync/dto/token-owner.js"
import { WalletService } from "../../reader/service/core/wallet-service.js"
import { ValidationException } from "../../reader/util/validation-exception.js"

@injectable()
class TokenOwnerService {

    @inject("WalletService")
    private walletService:WalletService

    @inject("TokenOwnerRepository")
    private tokenOwnerRepository:TokenOwnerRepository

    constructor() {}


    async get(_id:string): Promise<TokenOwner> {        
        return this.tokenOwnerRepository.get(_id)
    }

    async getDisplayName(_id:string) : Promise<string> {

        if (!_id) return

        let ens = await this.tokenOwnerRepository.getENS(_id)

        if (ens) return ens
        return this.walletService.truncateEthAddress(_id)

    }

    async getOrCreate(address:string) {

        let tokenOwner: TokenOwner 

        if (!tokenOwner) {
            try {
                tokenOwner = await this.get(address)
            } catch (ex) { }
        }

        if (!tokenOwner) {
            tokenOwner = new TokenOwner()
            tokenOwner._id = address
            tokenOwner.tokenIds = []
            tokenOwner.count = 0
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


    async list(limit: number, skip: number): Promise<TokenOwner[]> {
        return this.tokenOwnerRepository.list(limit, skip)
    }





}


export {
    TokenOwnerService
}

