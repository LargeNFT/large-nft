import { Allow } from "class-validator"

class ERCEvent {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    blockNumber?:number 

    @Allow()
    blockHash?:string 

    @Allow()
    transactionIndex?:number 

    @Allow()
    removed?:boolean 

    @Allow()
    address?:string 

    @Allow()
    data?:string 

    @Allow()
    topics?:string[] 

    @Allow()
    transactionHash?:string 

    @Allow()
    logIndex?:number 

    @Allow()
    args:any[]

    @Allow()
    event?:string 

    @Allow()
    eventSignature?:string

    @Allow()
    transaction:any


    @Allow()
    isTransfer:boolean

    @Allow()
    fromAddress:string

    @Allow()
    toAddress:string

    @Allow()
    tokenId?:number

    @Allow()
    previous?:string

    @Allow()
    previousByToken?:string


    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    ERCEvent
}