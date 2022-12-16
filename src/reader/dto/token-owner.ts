import { Allow } from "class-validator"

class TokenOwner {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    address?:string 

    @Allow()
    count?:number

    @Allow()
    tokenIds?:number[]

    @Allow()
    ercEventIds?:string[]

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string

}

export {
    TokenOwner
}