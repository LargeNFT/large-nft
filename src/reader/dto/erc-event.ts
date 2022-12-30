import { Allow } from "class-validator"


class ERCEvent {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 


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
    isBurn:boolean

    @Allow()
    namedArgs:any  
 
    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    ERCEvent
}