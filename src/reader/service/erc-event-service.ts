import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { ERCEventRepository } from "../repository/erc-event-repository.js"
import { ERCEvent } from "../dto/erc-event.js"
import { BigNumber, Event } from "ethers"

// var pouchCollate = require('pouchdb-collate')
import { toIndexableString } from "pouchdb-collate"
import { TokenOwnerService } from "./token-owner-service.js"
import { TokenOwner } from "../dto/token-owner.js"

@injectable()
class ERCEventService {

    @inject("ERCEventRepository")
    private ercEventRepository:ERCEventRepository

    @inject("TokenOwnerService")
    private tokenOwnerService:TokenOwnerService

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

    async process(ercEvent:ERCEvent, previous:ERCEvent, previousByToken:ERCEvent) : Promise<ProcessResult> {

        let result:ProcessResult = {}


        //If it's a specific token
        if (ercEvent.tokenId) {
            
            console.log(`Processing event ${ercEvent.tokenId}`)

            //Update ownership if this is newer
            let isNewTransfer

            if (previousByToken) {
                isNewTransfer = ercEvent.isTransfer && ercEvent.blockNumber >= previousByToken.blockNumber && ercEvent.logIndex > previousByToken.logIndex
                ercEvent.previousByToken = previousByToken._id
            } else {
                isNewTransfer = ercEvent.isTransfer
            }
             
            //Look up/create the from address
            if (ercEvent.fromAddress) {
                result.fromTokenOwner = await this.getTokenOwner(ercEvent.fromAddress)
                result.fromTokenOwner.ercEventIds.push(ercEvent._id)
            }

            //Look up/create the to address
            if (ercEvent.toAddress) {
                result.toTokenOwner = await this.getTokenOwner(ercEvent.toAddress)
                result.toTokenOwner.ercEventIds.push(ercEvent._id)
            }

            if (isNewTransfer) {

                console.log(`Updating owner of token #${ercEvent.tokenId} from ${ercEvent.fromAddress} to ${ercEvent.toAddress}`)

                //Update previous owner
                if (result.fromTokenOwner.tokenIds.includes(ercEvent.tokenId)) {
                    result.fromTokenOwner.tokenIds = Array.from(result.fromTokenOwner.tokenIds)?.filter(id => id != ercEvent.tokenId)
                    result.fromTokenOwner.count = result.fromTokenOwner.tokenIds.length
                }

                //Update new owner
                result.toTokenOwner.tokenIds.push(ercEvent.tokenId)
                result.toTokenOwner.count = result.toTokenOwner.tokenIds.length

            }

        }

        //Mark the previous event
        ercEvent.previous = previous?._id
        result.ercEvent = ercEvent



        return result


    }

    async list(limit: number, skip: number): Promise<ERCEvent[]> {
        return this.ercEventRepository.list(limit, skip)
    }

    async getLatest() : Promise<ERCEvent> {

        let l = await this.ercEventRepository.list(1, 0)

        if (l?.length >0) {
            return l[0]
        }

    }

    async getLatestByTokenId(tokenId:number) : Promise<ERCEvent> {

        let l = await this.ercEventRepository.getByTokenIdDesc(tokenId, 1, 0)

        if (l?.length) {
            return l[0]
        }


    }

    async getByTokenIdDesc(tokenId:number, limit:number, skip:number) : Promise<ERCEvent[]> {
        return this.ercEventRepository.getByTokenIdDesc(tokenId, limit, skip)
    }


    async getTokenOwner(address: string) {
    
        let tokenOwner
        
        try {
            tokenOwner = await this.tokenOwnerService.get(address)
        } catch (ex) { }
    

        if (!tokenOwner) {
            tokenOwner = new TokenOwner()
            tokenOwner.address = address
            tokenOwner.tokenIds = []
            tokenOwner.ercEventIds = []
            tokenOwner.count = 0
        }


        return tokenOwner
    }


    translateEventToERCEvent(event: Event) : ERCEvent {
    
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
        ercEvent.dateCreated = new Date().toJSON()
    
        //Convert BigNumber args to strings
        ercEvent.args = ercEvent.args.map(a => BigNumber.isBigNumber(a) ? a.toString() : a)
    
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
    
    
        ercEvent._id = `${ercEvent.blockHash}-${ercEvent.transactionHash}-${ercEvent.logIndex}`
    
    
        return ercEvent
    }


    async getExistingRev(_id:string) : Promise<string> {

        //See if it already exists. If so we need the _rev
        let existing:ERCEvent
        try {
            existing = await this.get(_id)
        } catch(ex) {}

        if (existing) return existing._rev

    }
    
}




interface ProcessResult {
    ercEvent?:ERCEvent
    fromTokenOwner?:TokenOwner
    toTokenOwner?:TokenOwner
}



export {
    ERCEventService
}

