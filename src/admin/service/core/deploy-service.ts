import { ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Channel } from "../../dto/channel.js"
import { ChannelService } from "../channel-service.js"

import TYPES from "./types.js"
import { WalletService } from "./wallet-service.js"


@injectable()
class DeployService {

    constructor(
        private channelService: ChannelService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async deployContract(channel: Channel) {

        if (!channel.publishReaderIPFSStatus?.cid) {
            throw new Error("Not published to IPFS")
        }

        let count = await this.channelService.countItemsByChannel(channel._id)

        if (count <= 0) {
            throw new Error("No NFTs")
        }

        //Deploy contract
        let mintPriceWei = ethers.parseUnits(channel.mintPrice, 'ether')        
        let receipt = await this.deploy(channel.title, channel.symbol, channel.publishReaderIPFSStatus?.cid, mintPriceWei.toString(), count)

        //Update address locally
        channel.contractAddress = receipt.contractAddress
        channel.showActivityPage = true
        channel.showMintPage = true
        await this.channelService.put(channel)

    }

    async updateContract(channel: Channel) {

        if (!channel.publishReaderIPFSStatus?.cid) {
            throw new Error("Not published to IPFS")
        }

        let count = await this.channelService.countItemsByChannel(channel._id)

        if (count <= 0) {
            throw new Error("No NFTs")
        }

        //Deploy contract
        let mintPriceWei = ethers.parseUnits(channel.mintPrice, 'ether') 
        

        let receipt = await this.update(channel, channel.publishReaderIPFSStatus?.cid, mintPriceWei.toString(), count)

        //Update address locally
        channel.showActivityPage = true
        channel.showMintPage = true

        await this.channelService.put(channel)

    }


    private async deploy(name: string, symbol: string, ipfsCid: string, mintFee: string, maxTokenId: number) {

        if (!name || !symbol || !mintFee || !maxTokenId || !ipfsCid) throw new Error("Missing inputs to deploy")

        let wallet = this.walletService.wallet
        if (!wallet) throw new Error("No wallet!")

        const c = this.contracts['Channel']

        const factory = new ethers.ContractFactory(c.abi, c.bytecode, wallet)
        
        let contract = await factory.deploy(
            name, 
            symbol, 
            ipfsCid, 
            BigInt(mintFee.toString()), 
            BigInt(maxTokenId.toString())
        )
        
        return contract.deploymentTransaction().wait()
    }

    private async update(channel:Channel, ipfsCid: string, mintFee: string, maxTokenId: number) {

        if (!mintFee || !maxTokenId || !ipfsCid) throw new Error("Missing inputs to deploy")

        let wallet = this.walletService.wallet
        if (!wallet) throw new Error("No wallet!")

        let contract = await this.channelService.getChannelContract(channel)

        let tx = await contract.update(ipfsCid, BigInt(mintFee.toString()), BigInt(maxTokenId.toString()))


        console.log(tx)

    }



}



export {
    DeployService
}