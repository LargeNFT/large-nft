import { Allow } from "class-validator"
import { RowItemViewModel } from "./item-page.js"


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
    transactionHash?:string 

    @Allow()
    transaction:any

    @Allow()
    removed?:boolean 

    @Allow()
    address?:string 

    @Allow()
    data?:string 

    @Allow()
    topics?:string[] 

    @Allow()
    logIndex?:number 

    @Allow()
    args:any[]

    @Allow()
    event?:string 

    @Allow()
    eventSignature?:string

    @Allow()
    isTransfer:boolean

    @Allow()
    isMint:boolean

    @Allow()
    fromAddress:string

    @Allow()
    toAddress:string

    @Allow()
    tokenId?:number

    @Allow()
    rowItemViewModel?:RowItemViewModel

    @Allow()
    timestamp?:number

    @Allow()
    previousId?:string

    @Allow()
    previousByTokenId?:string

    @Allow()
    nextId?:string

    @Allow()
    nextByTokenId?:string


    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    ERCEvent
}