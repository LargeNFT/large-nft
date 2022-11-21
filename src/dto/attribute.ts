import { IsNotEmpty, Allow } from 'class-validator'



interface AttributeOptions {
    id?:string
    traitType?:string
    values?:string[]
}

interface AttributeSelection {
    id?:string
    traitType?:string
    value?:string 
}


class AttributeCount {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    channelId?:string 

    @Allow()
    traitType:string

    @Allow()
    value: string

    @Allow()
    count: number

    @Allow()
    lastUpdated?:string

    @Allow()
    dateCreated?:string
    
    
}

export {
    AttributeOptions, AttributeSelection, AttributeCount
}