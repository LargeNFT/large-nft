import { BigNumber, Contract, ethers, Event } from "ethers";
import { inject, injectable } from "inversify";
import TYPES from "./types.js";

import { WalletService } from "./wallet-service.js";



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

        console.log(`Fetching mint transfers...`)

        let events = []

        let eventResult = {
            endBlock: endBlock,
            events: []
        }

        do {

            eventResult = await this.getEvents(contract, startBlock, endBlock)
            events.push(...eventResult.events)

            console.log(`...fetched batch of ${eventResult.events?.length} from ${startBlock} to ${eventResult.endBlock} of ${endBlock}`)

            startBlock = eventResult.endBlock

        } while(eventResult.endBlock < endBlock)


        console.log(`Found ${events.length} events`)


        return events

    }





    async getEvents(contract:Contract, startBlock:number, endBlock:number){

        let events = []

        let tryAgain = true

        while (tryAgain) {

            try {
            
                events = await contract.queryFilter({
                    address: contract.address,
                    topics: [
                        ethers.utils.id("Transfer(address,address,uint256)"),
                        ethers.utils.hexZeroPad("0x0000000000000000000000000000000000000000", 32)
                        
                    ]
                }, 
                    startBlock, 
                    endBlock
                )
    
                tryAgain = false
    
            } catch(ex) {
                
                //Catch the error with their suggested range and try it again.
                let message = JSON.parse(ex.body)?.error?.message
    
                let startEnd = message.substring(message.indexOf('[') + 1, message.indexOf(']'))?.split(',')
    
                if (startEnd?.length > 1) {
    
                    endBlock = parseInt(startEnd[1])
    
                } else {
                    endBlock = startBlock //Make sure to say we didn't do anything.
                    tryAgain = false
                }
    
            }
        }


        return {
            events: events,
            endBlock: endBlock
        }

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