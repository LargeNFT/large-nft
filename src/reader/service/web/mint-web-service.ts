import { BigNumber, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import { MintingViewModel } from "../../dto/viewmodel/minting-view-model.js";
import { ChannelService } from "../channel-service.js";
import { SchemaService } from "../core/schema-service.js";
import { WalletService } from "../core/wallet-service.js";
import { ItemService } from "../item-service.js";
import { TokenService } from "../token-service.js";
import { ItemWebService } from "./item-web-service.js";

@injectable()
class MintWebService {

    @inject("TokenService")
    private tokenService:TokenService

    @inject("ChannelService")
    private channelService:ChannelService
    
    @inject("ItemWebService")
    private itemWebService:ItemWebService

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

            let totalMinted:BigNumber = await this.tokenService.getTotalMinted()       

            let lastMinted = []

            if (totalMinted?.gt(0)) {

                let items = await this.itemService.listByTokenId(totalMinted.toNumber())

                for (let item of items) {

                    try {

                        //@ts-ignore
                        let owner = await this.tokenService.ownerOf(item.tokenId)

                        lastMinted.push({
                            owner: await this.walletService.truncateEthAddress(owner),
                            item: item
                        })

                    } catch(ex) {}

                    
                }

            }            

            return {
                totalMinted: totalMinted.toNumber(),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice,
                lastMinted: lastMinted,
                minting: totalMinted.toNumber() < channel.itemCount
            }
            
        }

    }

    async getHomeMintingViewModel() : Promise<MintingViewModel> {

        await this.schemaService.load(["channels"])

        let channel:Channel = await this.channelService.get()

        if (channel.contractAddress) {

            let totalMinted:BigNumber = await this.tokenService.getTotalMinted()       

            return {
                totalMinted: totalMinted.toNumber(),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice
            }
            
        }
    }



    async mint(quantity:number) {

        await this.schemaService.load(["channels"])
        let channel:Channel = await this.channelService.get()
        let totalWei = this.calculateTotalMint(channel, quantity)

        let owner = await this.tokenService.owner()

        // console.log(owner.toLowerCase(), this.walletService.address.toLowerCase())

        if (this.walletService.address.toLowerCase() == owner.toLowerCase()) {
            console.log('Minting as owner')
            await this.tokenService.mintAsOwner(quantity)
        } else {
            await this.tokenService.mint(quantity, totalWei)
        }

        
    }

    async mintFromStartOrFail(quantity:number, start:number) {

        await this.schemaService.load(["channels"])
        let channel:Channel = await this.channelService.get()
        
        let totalWei = this.calculateTotalMint(channel, quantity)

        await this.tokenService.mintFromStartOrFail(quantity, start, totalWei)
    }

    calculateTotalMint(channel, quantity) {

        let mintPriceWei = globalThis.ethers.utils.parseUnits(channel.mintPrice, 'ether')

        return mintPriceWei.mul(quantity).toString()
 
    }



}

export {
    MintWebService
}