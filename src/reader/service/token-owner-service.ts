import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"

import { WalletService } from "../../reader/service/core/wallet-service.js"
import { ValidationException } from "../../reader/util/validation-exception.js"
import { TokenOwner } from "../dto/token-owner.js"
import { TokenOwnerRepository } from "../repository/token-owner-repository.js"

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


    async put(tokenOwner:TokenOwner) {
        return this.tokenOwnerRepository.put(tokenOwner)
    }

    /**
     * No validation for speeeeeeeeed
     * @param tokenOwners 
     * @returns 
     */
     async putAll(tokenOwners:TokenOwner[]) {

        //Update lastUpdated
        tokenOwners.forEach(tokenOwner => {

            if (!tokenOwner._id) {
                tokenOwner.dateCreated = new Date().toJSON()
            } 
    

            tokenOwner.lastUpdated = new Date().toJSON()
        })

        return this.tokenOwnerRepository.putAll(tokenOwners)
    }


    async list(limit: number, skip: number): Promise<TokenOwner[]> {
        return this.tokenOwnerRepository.list(limit, skip)
    }





}


export {
    TokenOwnerService
}

