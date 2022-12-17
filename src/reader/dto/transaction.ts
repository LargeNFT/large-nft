import { Allow } from "class-validator"
import { RowItemViewModel } from "./item-page.js"
import { Item } from "./item.js"
import { ItemViewModel } from "./viewmodel/item-view-model.js"

class Transaction {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    transactionHash?:string 

    @Allow()
    data:any

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    Transaction
}