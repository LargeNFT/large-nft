import { IsNotEmpty, Allow } from 'class-validator'


class OriginalMetadata {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    content?:string
    
    @IsNotEmpty()
    cid?:string 

    @Allow()
    dateCreated?:string
    
    
}

export {
    OriginalMetadata
}