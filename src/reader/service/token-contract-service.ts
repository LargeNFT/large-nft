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


        await channelContract.mint(quantity, { value: totalMintCost })
    }

    async mintFromStartOrFail(quantity:number, start:number, totalMintCost:string) {
        let channelContract = await this.getChannelContract()
        await channelContract.mintFromStartOrFail(quantity, start, { value: totalMintCost })
    }

    
    async mintAsOwner(quantity:number) {
        let channelContract = await this.getChannelContract()
        await channelContract.mint(quantity, {})
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

        //Add event listener for mints if it's not already added. Maybe won't work if we ever add a second listener anywhere
        if (this.walletService.provider && this.walletService.provider.listeners()?.length == 0) {
            
            let filter = {
                address: contract.address,
                topics: [
                    // the name of the event, parnetheses containing the data type of each event, no spaces
                    id("MintEvent(uint256)")
                ]
            }
            
            this.walletService.provider.on( filter, async (e) => {

                let tokenId = parseInt(e.data)

                if (tokenId > this.lastMintedTokenId) {
                    this.lastMintedTokenId = tokenId

                    let mintEvent = new CustomEvent('mint-event')

                    //@ts-ignore
                    mintEvent.tokenId = tokenId
              
                    document.dispatchEvent(mintEvent)

                }

            })

        }

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
    address:string
}



export {
    TokenContractService
}