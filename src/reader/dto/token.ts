import { Allow } from "class-validator"

class Token {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    tokenId?:number

    @Allow()
    latestErcEventId?:string

    @Allow()
    latestTransactionId?:string

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    Token
}