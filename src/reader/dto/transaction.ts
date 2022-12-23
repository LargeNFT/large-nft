import { Allow } from "class-validator"
import { ERCEvent } from "./erc-event.js"
import { RowItemViewModel } from "./item-page.js"
import { Item } from "./item.js"
import { ItemViewModel } from "./viewmodel/item-view-model.js"

class Transaction {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 



    
    @Allow()
    hash?:string 

    @Allow()
    blockHash: string

    @Allow()
    blockNumber:number

    @Allow()
    transactionIndex: number

    @Allow()
    data: string

    @Allow()
    from: string

    @Allow()
    gasLimit: string

    @Allow()
    gasPrice: string

    @Allow()
    nonce: number

    @Allow()
    value: string

    @Allow()
    networkId: number

    @Allow()
    r: string

    @Allow()
    s: string

    @Allow()
    v: number

    @Allow()
    raw: string

    @Allow()
    ercEvents?:{}

    @Allow()
    tokenIds?:string[]
    
    @Allow()
    previousId?:string

    @Allow()
    previousByTokenIds?:{}

    @Allow()
    nextId?:string

    @Allow()
    nextByTokenIds?:{}


    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    Transaction
}