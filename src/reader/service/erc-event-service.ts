import { inject, injectable } from "inversify"

import { ERCEvent } from "../../sync/dto/erc-event.js"


@injectable()
class ERCEventService {

    constructor() {}

    async translateEventToERCEvent(event: any) : Promise<ERCEvent> {

        let ercEvent = new ERCEvent()
    
        ercEvent.removed = event.removed
        ercEvent.address = event.address
        ercEvent.data = event.data
        ercEvent.topics = event.topics
        ercEvent.logIndex = event.index
        ercEvent.event = event.fragment.name
        ercEvent.eventSignature = event.eventSignature
        ercEvent.dateCreated = new Date().toJSON()
    
        //Convert BigInt args to strings    
        ercEvent.args = event.args.map(a => a.toString())

        ercEvent.namedArgs = {}

        //Check wether it's a transfer and if it's newer than the most recently recorded transfer
        switch(ercEvent.event) {
                                       
            case "Transfer":
                ercEvent.isTransfer = true
                ercEvent.namedArgs.fromAddress = ercEvent.args[0]
                ercEvent.namedArgs.toAddress = ercEvent.args[1]
                ercEvent.namedArgs.tokenId = ercEvent.args[2]
                break
            case "Approval":
                ercEvent.namedArgs.owner = ercEvent.args[0]
                ercEvent.namedArgs.approved = ercEvent.args[1]
                ercEvent.namedArgs.tokenId = ercEvent.args[2]
                break
            case "ApprovalForAll":
                ercEvent.namedArgs.owner = ercEvent.args[0]
                ercEvent.namedArgs.operator = ercEvent.args[1]
                ercEvent.namedArgs.approved = ercEvent.args[2]
                break
        }
    

        if (ercEvent.isTransfer && ercEvent.namedArgs.fromAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isMint = true
        }

        if (ercEvent.isTransfer && ercEvent.namedArgs.toAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isBurn = true
        }

    
        // ercEvent._id = `${ercEvent.blockHash}-${ercEvent.transactionHash}-${ercEvent.logIndex}`

        return ercEvent
    }




}




export {
    ERCEventService
}

