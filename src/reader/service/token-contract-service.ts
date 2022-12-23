import { BigNumber, utils } from "ethers";
import { inject, injectable } from "inversify";
import { MetadataRepository } from "../repository/metadata-repository.js";
import { WalletService } from "./core/wallet-service.js";


@injectable()
class TokenContractService {

    @inject("MetadataRepository")
    private metadataRepository:MetadataRepository

    @inject("WalletService")
    private walletService:WalletService

    constructor(
    ) {}

    private lastMintedTokenId=0


    public get channelContract() : ChannelContract {

        let contract:ChannelContract = this.walletService.getContract("Channel")

        //Add event listener for mints if it's not already added. Maybe won't work if we ever add a second listener anywhere
        if (this.walletService.provider && this.walletService.provider.listeners()?.length == 0) {
            
            let filter = {
                address: contract.address,
                topics: [
                    // the name of the event, parnetheses containing the data type of each event, no spaces
                    utils.id("MintEvent(uint256)")
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

        return this.walletService.getContract("Channel")
    }

    async getBalance(address) : Promise<number> {
        if (!address) return 0
        return parseInt(await this.channelContract.balanceOf(address))
    }

    async getMetadata(tokenId) : Promise<any> {
        return this.metadataRepository.get(tokenId)      
    }

    async mint(quantity:number, totalMintCost:string) {
        await this.channelContract.mint(quantity, { value: totalMintCost })
    }

    async mintFromStartOrFail(quantity:number, start:number, totalMintCost:string) {
        await this.channelContract.mintFromStartOrFail(quantity, start, { value: totalMintCost })
    }

    
    async mintAsOwner(quantity:number) {
        await this.channelContract.mint(quantity, {})
    }

    async ownerOf(tokenId:number)  {
        return this.channelContract.ownerOf(tokenId)
    }

    async getTotalMinted() {
        return this.channelContract.totalMinted()
    }

    async getTotalSupply() {
        return this.channelContract.totalSupply()
    }

    async owner() {
        return this.channelContract.owner()
    }

}

interface ChannelContract {
    mint(quantity:number, options:any)
    mintFromStartOrFail(quantity:number, start:number,options:any)
    ownerOf(tokenId:number) : string
    tokenURI(tokenId:number) : string
    balanceOf(address) : string
    totalMinted() : BigNumber
    totalSupply() : BigNumber
    owner() : string
    address:string
}



export {
    TokenContractService
}