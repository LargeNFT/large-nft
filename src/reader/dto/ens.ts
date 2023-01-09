import { Allow } from "class-validator"

class ENS {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    name?:number

    @Allow()
    lastEnsNameUpdate?:string 

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    ENS
}