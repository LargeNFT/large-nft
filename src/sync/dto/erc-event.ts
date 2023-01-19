
class ERCEvent {
    
    _id?:string
    _rev?:string 
    removed?:boolean 
    address?:string 
    data?:string 
    topics?:string[] 
    logIndex?:number 
    args:any[]
    event?:string 
    eventSignature?:string
    isTransfer:boolean
    isMint:boolean
    isBurn:boolean
    namedArgs:any  
    lastUpdated?:string 
    dateCreated?:string

}

export {
    ERCEvent
}