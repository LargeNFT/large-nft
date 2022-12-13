import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { ERCEventRepository } from "../repository/erc-event-repository.js"
import { ERCEvent } from "../dto/erc-event.js"
import { BigNumber, Event } from "ethers"

// var pouchCollate = require('pouchdb-collate')
import { toIndexableString } from "pouchdb-collate"

@injectable()
class ERCEventService {

    @inject("ERCEventRepository")
    private ercEventRepository:ERCEventRepository

    constructor() {}


    async get(_id:string): Promise<ERCEvent> {        
        return this.ercEventRepository.get(_id)
    }

    async put(ercEvent:ERCEvent) {

        ercEvent.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(ercEvent, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.ercEventRepository.put(ercEvent)
    }

    async process(event:Event) : Promise<ERCEvent> {

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
        ercEvent.args = event.args
        ercEvent.event = event.event
        ercEvent.eventSignature = event.eventSignature
        // ercEvent.transaction = await event.getTransaction()

        ercEvent._id = toIndexableString([ercEvent.blockHash, ercEvent.transactionHash, ercEvent.logIndex]) 
        ercEvent.dateCreated = new Date().toJSON()

        //Convert BigNumber args to strings
        ercEvent.args = ercEvent.args.map( a => BigNumber.isBigNumber(a) ? a.toString() : a)


        return ercEvent

    }

    async list(limit: number, skip: number): Promise<ERCEvent[]> {
        return this.ercEventRepository.list(limit, skip)
    }

    async getByTokenId(tokenId:number, limit:number, skip:number) : Promise<ERCEvent[]> {
        return this.ercEventRepository.getByTokenId(tokenId, limit, skip)
    }




}

export {
    ERCEventService
}