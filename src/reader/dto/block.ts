import { Allow } from "class-validator"

class Block {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    blockNumber?:string 

    @Allow()
    data:any

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    Block
}