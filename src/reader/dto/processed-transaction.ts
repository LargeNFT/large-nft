import { Allow } from "class-validator"
import { ERCEvent } from "./erc-event.js"


class ProcessedTransaction {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 
    
    @Allow()
    blockNumber?:number

    @Allow()
    transactionIndex?:number

    @Allow()
    from?:string

    @Allow()
    timestamp?:number

    @Allow()
    ercEvents?:ERCEvent[]

    @Allow()
    processedEvents?:ProcessedEvent[]

    @Allow()
    transactionValue?:TransactionValue

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


interface TokenPrice {
    [tokenId: string]: {
        price?:number
        currency?:string
    }
}

interface TransactionValue {
    totalPrice?: number
    currency?: string
    tokenPrice?: TokenPrice,
    market?: string
    tokenIds?: number[]
}


interface ProcessedEvent {
    isMint?:boolean
    isBurn?:boolean
    tokenIds?:number[]
    event?:string 
    namedArgs?:any
    salePrice?:string
}

export {
    ProcessedTransaction, ProcessedEvent, TransactionValue
}