import { MinLength, ArrayNotEmpty, ArrayMinSize ,IsNotEmpty, Allow } from 'class-validator'

class ContractState {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    indexRate:number
    
    @Allow()
    startBlock:number 
    
    @Allow()
    lastIndexedBlock:number 

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string
}

export {
    ContractState
}