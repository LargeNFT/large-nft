import { BigNumber, Contract, ethers, Event } from "ethers";
import { inject, injectable } from "inversify";
import TYPES from "./types";

import { WalletService } from "./wallet-service";



@injectable()
class ERCEventService {

    constructor(
        @inject(TYPES.WalletService) private walletService: WalletService,
    ) {}


    async getMintEventsForContract(contract:Contract) {

        //@ts-ignore
        let startBlock = 0

        //@ts-ignore
        let endBlock = await this.walletService.provider.getBlockNumber()

        console.log(`Fetching mint transfers for blocks: ${startBlock} to ${endBlock}`)

        const events = await contract.queryFilter({
                address: contract.address,
                topics: [
                    ethers.utils.id("Transfer(address,address,uint256)"),
                    ethers.utils.hexZeroPad("0x0000000000000000000000000000000000000000", 32)
                    
                ]
            }, 
            startBlock, 
            endBlock
        )

        return events

    }

    async getTokensForContract(contract:Contract) : Promise<Set<number>> {

        let events:Event[] = await this.getMintEventsForContract(contract)

        let tokens = events.map( e => BigNumber.from(e.topics[3]).toNumber() ).sort( (a, b) => a -b)

        return new Set(tokens)


    }







}


export {
    ERCEventService
}