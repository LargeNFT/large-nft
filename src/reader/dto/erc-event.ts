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
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    ERCEvent
}