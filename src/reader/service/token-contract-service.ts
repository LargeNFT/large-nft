import { inject, injectable } from "inversify";
import { MetadataRepository } from "../repository/metadata-repository.js";
import { WalletService } from "./core/wallet-service.js";
import { id } from "ethers"


@injectable()
class TokenContractService {

    @inject("MetadataRepository")
    private metadataRepository:MetadataRepository

    @inject("WalletService")
    private walletService:WalletService

    private mintEventListenerAdded=false

    constructor(
    ) {}

    private lastMintedTokenId=0


    async getBalance(address) : Promise<number> {
        if (!address) return 0

        let channelContract = await this.getChannelContract()

        return parseInt(await channelContract.balanceOf(address))
    }

    async getMetadata(tokenId) : Promise<any> {
        return this.metadataRepository.get(tokenId)      
    }

    async mint(quantity:number, totalMintCost:string) {
        let channelContract = await this.getChannelContract()
        let tx = await channelContract.mint(quantity, { value: totalMintCost })
        return tx.wait()
    }

    async mintFromStartOrFail(quantity:number, start:number, totalMintCost:string) {
        let channelContract = await this.getChannelContract()
        let tx = await channelContract.mintFromStartOrFail(quantity, start, { value: totalMintCost })
        return tx.wait()
    }

    
    async mintAsOwner(quantity:number) {
        let channelContract = await this.getChannelContract()
        let tx = await channelContract.mint(quantity, {})
        return tx.wait()
    }

    async ownerOf(tokenId:number)  {
        let channelContract = await this.getChannelContract()
        return channelContract.ownerOf(tokenId)
    }

    async getTotalMinted() {
        let channelContract = await this.getChannelContract()
        return channelContract.totalMinted()
    }

    async getTotalSupply() {
        let channelContract = await this.getChannelContract()
        return channelContract.totalSupply()
    }

    async owner() {
        let channelContract = await this.getChannelContract()
        return channelContract.owner()
    }

    async getChannelContract() : Promise<ChannelContract> {

        let contract:ChannelContract = await this.walletService.getContract("Channel")
        return contract
    }



}

interface ChannelContract {
    mint(quantity:number, options:any)
    mintFromStartOrFail(quantity:number, start:number,options:any)
    ownerOf(tokenId:number) : string
    tokenURI(tokenId:number) : string
    balanceOf(address) : string
    totalMinted() : BigInt
    totalSupply() : BigInt
    owner() : string
    update(): void
    address:string
    on(filter, listener)
    queryFilter(event, fromBlock, toBlock)
}



export {
    TokenContractService
}