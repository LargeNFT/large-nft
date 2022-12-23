import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
// import { ERCEventRepository } from "../repository/erc-event-repository.js"
import { ERCEvent } from "../dto/erc-event.js"
import { BigNumber, Event } from "ethers"

import { TokenOwnerService } from "./token-owner-service.js"
import { TokenOwner } from "../dto/token-owner.js"
import { Transaction } from "../dto/transaction.js"
import { Block } from "../dto/block.js"

@injectable()
class ERCEventService {

    // @inject("ERCEventRepository")
    // private ercEventRepository:ERCEventRepository

    // @inject("TokenOwnerService")
    // private tokenOwnerService:TokenOwnerService


    constructor() {}


    // async get(_id:string): Promise<ERCEvent> {        
    //     return this.ercEventRepository.get(_id)
    // }

    // async put(ercEvent:ERCEvent) {

    //     ercEvent.lastUpdated = new Date().toJSON()

    //     //Validate
    //     let errors: ValidationError[] = await validate(ercEvent, {
    //         forbidUnknownValues: true,
    //         whitelist: true
    //     })

    //     if (errors.length > 0) {
    //         throw new ValidationException(errors)
    //     }

    //     return this.ercEventRepository.put(ercEvent)
    // }

    // /**
    //  * No validation for speeeeeeeeed
    //  * @param ercEvents 
    //  * @returns 
    //  */
    // async putAll(ercEvents:ERCEvent[]) {

    //     //Update lastUpdated
    //     ercEvents.forEach(e => e.lastUpdated = new Date().toJSON())

    //     return this.ercEventRepository.putAll(ercEvents)
    // }



    // async listFrom(limit:number, startId:string) : Promise<ERCEvent[]> {

    //     let results:ERCEvent[] = []

    //     while (results?.length < limit && startId) {

    //         let event:ERCEvent = await this.get(startId)

    //         results.push(event)

    //         let previousId = event?.previousId

    //         //Get the previous
    //         if (previousId) {

    //             //See 
    //             event = await this.get(event.previousId)

    //             if (event?._id != previousId) break

    //         } else {
    //             event = undefined
    //         }

    //         startId = event?._id
    //     }

    //     return results

    // }

    // async listTo(limit:number, startId:string) : Promise<ERCEvent[]> {

    //     let results:ERCEvent[] = []

    //     while (results?.length < limit && startId) {

    //         let event:ERCEvent = await this.get(startId)

    //         results.push(event)

    //         let nextId = event?.nextId

    //         //Get the previous
    //         if (nextId) {

    //             //See 
    //             event = await this.get(event.nextId)

    //             if (event?._id != nextId) break

    //         } else {
    //             event = undefined
    //         }

    //         startId = event?._id
    //     }

    //     return results

    // }


    // async listByTokenFrom(limit:number, startId:string) : Promise<ERCEvent[]> {

    //     let results:ERCEvent[] = []

    //     while (results?.length < limit && startId) {

    //         let event:ERCEvent = await this.get(startId)

    //         results.push(event)

    //         let previousByTokenId = event?.previousByTokenId

    //         //Get the previous
    //         if (previousByTokenId) {

    //             //See 
    //             event = await this.get(event.previousByTokenId)

    //             if (event?._id != previousByTokenId) break

    //         } else {
    //             event = undefined
    //         }

    //         startId = event?._id
    //     }

    //     return results

    // }

    // async listByTokenTo(limit:number, startId:string) : Promise<ERCEvent[]> {

    //     let results:ERCEvent[] = []

    //     while (results?.length < limit && startId) {

    //         let event:ERCEvent = await this.get(startId)

    //         results.push(event)

    //         let nextByTokenId = event?.nextByTokenId

    //         //Get the previous
    //         if (nextByTokenId) {

    //             //See 
    //             event = await this.get(event.nextByTokenId)

    //             if (event?._id != nextByTokenId) break

    //         } else {
    //             event = undefined
    //         }

    //         startId = event?._id
    //     }

    //     return results

    // }


    // async list(limit: number, skip: number): Promise<ERCEvent[]> {
    //     return this.ercEventRepository.list(limit, skip)
    // }

    // async getLatest() : Promise<ERCEvent> {
    //     let l = await this.ercEventRepository.list(1, 0)

    //     if (l?.length >0) {
    //         return Object.assign(new ERCEvent(), l[0])
    //     }

    // }

    // async getLatestByTokenId(tokenId:number) : Promise<ERCEvent> {

    //     let l = await this.ercEventRepository.getByTokenIdDesc(tokenId, 1, 0)

    //     if (l?.length) {
    //         return Object.assign(new ERCEvent(), l[0])
    //     }


    // }

    // async getByTokenIdDesc(tokenId:number, limit:number, skip:number) : Promise<ERCEvent[]> {
    //     return this.ercEventRepository.getByTokenIdDesc(tokenId, limit, skip)
    // }

    // async getLatestForAllTokens(): Promise<ERCEvent[]> {

    //     return this.ercEventRepository.getLatestForAllTokens()

    // }



    async translateEventToERCEvent(event: Event,  block:Block) : Promise<ERCEvent> {
    
        let ercEvent = new ERCEvent()
    
        // ercEvent.transaction = transaction
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
        // ercEvent.transaction = await event.getTransaction()
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

    
        ercEvent._id = `${ercEvent.blockHash}-${ercEvent.transactionHash}-${ercEvent.logIndex}`

        ercEvent.timestamp = block.timestamp

        return ercEvent
    }


    // async getExistingRev(_id:string) : Promise<string> {

    //     //See if it already exists. If so we need the _rev
    //     let existing:ERCEvent
    //     try {
    //         existing = await this.get(_id)
    //     } catch(ex) {}

    //     if (existing) return existing._rev

    // }
    
}




export {
    ERCEventService
}

