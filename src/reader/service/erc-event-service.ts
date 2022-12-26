import { inject, injectable } from "inversify"
// import { ERCEventRepository } from "../repository/erc-event-repository.js"
import { ERCEvent } from "../dto/erc-event.js"
import { BigNumber, Event } from "ethers"

import { Block } from "../dto/block.js"

@injectable()
class ERCEventService {

    constructor() {}

    async translateEventToERCEvent(event: Event) : Promise<ERCEvent> {
    
        let ercEvent = new ERCEvent()
    
        ercEvent.blockNumber = event.blockNumber
        ercEvent.blockHash = event.blockHash
        ercEvent.transactionIndex = event.transactionIndex
        ercEvent.removed = event.removed
        ercEvent.address = event.address
        ercEvent.data = event.data
        ercEvent.topics = event.topics
        ercEvent.transactionHash = event.transactionHash
        ercEvent.logIndex = event.logIndex
        //@ts-ignore
        ercEvent.event = event.event
        ercEvent.eventSignature = event.eventSignature
        ercEvent.dateCreated = new Date().toJSON()
    
        //Convert BigNumber args to strings
        ercEvent.args = event.args.map(a => BigNumber.isBigNumber(a) ? a.toString() : a)
    
        //Check wether it's a transfer and if it's newer than the most recently recorded transfer
        switch(ercEvent.event) {
                            
            case "Transfer":
                ercEvent.isTransfer = true
            case "Approval":
                ercEvent.fromAddress = ercEvent.args[0]
                ercEvent.toAddress = ercEvent.args[1]
                ercEvent.tokenId = ercEvent.args[2]
                break
        }
    
        if (ercEvent.isTransfer && ercEvent.fromAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isMint = true
        }

        if (ercEvent.isTransfer && ercEvent.toAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isBurn = true
        }

    
        ercEvent._id = `${ercEvent.blockHash}-${ercEvent.transactionHash}-${ercEvent.logIndex}`

        return ercEvent
    }

}




export {
    ERCEventService
}

