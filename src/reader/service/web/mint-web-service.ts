import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import { MintingViewModel } from "../../dto/viewmodel/minting-view-model.js";
import { ChannelService } from "../channel-service.js";
import { SchemaService } from "../core/schema-service.js";
import { WalletService } from "../core/wallet-service.js";
import { ItemService } from "../item-service.js";
import { TokenContractService } from "../token-contract-service.js";
import { ethers } from "ethers";

@injectable()
class MintWebService {

    @inject("TokenContractService")
    private tokenContractService:TokenContractService

    @inject("ChannelService")
    private channelService:ChannelService
    

    @inject("ItemService")
    private itemService:ItemService

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("WalletService")
    private walletService:WalletService

    constructor(
    ) {}

    async getMintingViewModel() : Promise<MintingViewModel> {

        await this.schemaService.load(["channels", "items"])

        let channel:Channel = await this.channelService.get()

        if (channel.contractAddress) {

            let totalMinted:BigInt = await this.tokenContractService.getTotalMinted()       

            let lastMinted = []

            if (Number(totalMinted) > 0 ) {

                let items = await this.itemService.listByTokenId(Number(totalMinted))

                for (let item of items) {

                    try {

                        //@ts-ignore
                        let owner = await this.tokenContractService.ownerOf(item.tokenId)

                        lastMinted.push({
                            owner: await this.walletService.truncateEthAddress(owner),
                            item: item
                        })

                    } catch(ex) {}

                    
                }

            }            


            return {
                totalMinted: Number(totalMinted),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice,
                lastMinted: lastMinted,
                minting: Number(totalMinted) < channel.itemCount
            }
            
        }

    }

    async getHomeMintingViewModel() : Promise<MintingViewModel> {

        await this.schemaService.load(["channels"])

        let channel:Channel = await this.channelService.get()

        if (channel.contractAddress) {

            let totalMinted:BigInt = await this.tokenContractService.getTotalMinted()       

            return {
                totalMinted: Number(totalMinted),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice
            }
            
        }
    }



    async mint(quantity:number) {

        await this.schemaService.load(["channels"])
        let channel:Channel = await this.channelService.get()
        let totalWei = await this.calculateTotalMint(channel, quantity)

        let owner = await this.tokenContractService.owner()

        // console.log(owner.toLowerCase(), this.walletService.address.toLowerCase())

        if (this.walletService.address.toLowerCase() == owner.toLowerCase()) {
            console.log('Minting as owner')
            await this.tokenContractService.mintAsOwner(quantity)
        } else {
            await this.tokenContractService.mint(quantity, totalWei)
        }

        
    }

    async mintFromStartOrFail(quantity:number, start:number) {

        await this.schemaService.load(["channels"])
        let channel:Channel = await this.channelService.get()
        
        let totalWei = await this.calculateTotalMint(channel, quantity)

        await this.tokenContractService.mintFromStartOrFail(quantity, start, totalWei)
    }

    async calculateTotalMint(channel, quantity) {

        let mintPriceWei = ethers.parseUnits(channel.mintPrice, 'ether')

        let total = Number(mintPriceWei) * quantity

        return total.toString()
 
    }

    async updateTotal(mintPriceWei:BigInt, quantity:number) : Promise<string>{
        return ethers.formatUnits(Number(mintPriceWei) * quantity)
    }


    async parseUnits(mintPrice:string) : Promise<BigInt> {
       return ethers.parseUnits(mintPrice, 'ether')

    }

}

export {
    MintWebService
}