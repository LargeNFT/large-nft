import { Allow } from "class-validator"
import { ERCEvent } from "./erc-event.js"
import { Transaction } from "./transaction.js"


class ProcessedTransaction {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 
    
    @Allow()
    transaction?:Transaction 

    @Allow()
    timestamp?:number

    @Allow()
    ercEvents?:ERCEvent[]

    @Allow()
    tokenIds?:string[]
    
    @Allow()
    previousId?:string

    @Allow()
    previousByTokenIds?:{}

    @Allow()
    previousByTransactionInitiatorId?:{}

    @Allow()
    previousByTokenOwnerId?:{}

    @Allow()
    nextId?:string

    @Allow()
    nextByTokenIds?:{}

    @Allow()
    nextByTokenOwnerId?:{}

    @Allow()
    nextByTransactionInitiatorId?:{}

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string


}

export {
    ProcessedTransaction
}