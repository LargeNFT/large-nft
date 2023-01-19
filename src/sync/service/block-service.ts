import { inject, injectable } from "inversify"
import { Block } from "../dto/block.js"
import { WalletService } from "../../reader/service/core/wallet-service.js"

//@ts-ignore
import linkETHUSDABI from '../../reader/external-abi/link-eth-usd.json' assert { type: "json" }
import { BigNumber, ethers } from "ethers"
import { BlockRepository } from "../repository/block-repository.js"


@injectable()
class BlockService {

    @inject("BlockRepository")
    private blockRepository:BlockRepository


    @inject("WalletService")
    private walletService:WalletService

    constructor() {}


    async getOrDownload(blockNumber:number, options?:any): Promise<Block> {    
        
        let block

        //Check if we've already inserted it into pouch
        try {
            block = await this.blockRepository.get(blockNumber)
        } catch(ex) {}


        if (!block) {

            try {

                block = new Block()
                block._id = blockNumber.toString()

                //Download it.
                let data = await this.walletService.provider.getBlock(blockNumber)


                block.blockNumber = data.blockNumber
                block.hash = data.hash
                block.parentHash = data.parentHash
                block.number = data.number
                block.timestamp = data.timestamp
                block.nonce = data.nonce
                block.difficulty = data.difficulty
                block.gasLimit = data.gasLimit
                block.gasUsed = data.gasUsed
                block.miner = data.miner
                block.extraData = data.extraData
                block.baseFeePerGas = data.baseFeePerGas

                //Get ETH price at block
                block.ethUSDPrice = await this.getETHUSDAtBlock(block.number)

                await this.blockRepository.put(block, options)

            } catch(ex) {
                console.log(ex)
            }
        }

        return block
        
    }

    async put(block:Block, options?:any) {
        return this.blockRepository.put(block, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(blocks:Block[], options?:any) {
        return this.blockRepository.putAll(blocks, options)
    }


    async getETHUSDAtBlock(blockNumber:number) {

        let ethUsdContract = new ethers.Contract("0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", linkETHUSDABI, this.walletService.provider)

        let answer:BigNumber = await ethUsdContract.latestAnswer({blockTag: blockNumber})
        
        return answer.toNumber() / 10**8 //chainlink returns 8 decimals

    }


}



export {
    BlockService
}

