import { Allow } from "class-validator"

class TokenOwner {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    count?:number

    @Allow()
    tokenIds?:number[]

    @Allow()
    latestTransactionInitiatorId?:string

    @Allow()
    latestTransactionId?:string

    @Allow()
    lastActive?:string 

    @Allow()
    ensName?:string

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string

}

export {
    TokenOwner
}