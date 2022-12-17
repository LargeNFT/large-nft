import { Allow } from "class-validator"
import { RowItemViewModel } from "./item-page.js"
import { Item } from "./item.js"
import { ItemViewModel } from "./viewmodel/item-view-model.js"

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
    fromAddress:string

    @Allow()
    toAddress:string

    @Allow()
    tokenId?:number

    @Allow()
    previous?:string

    @Allow()
    rowItemViewModel?:RowItemViewModel

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