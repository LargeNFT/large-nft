import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested,IsNotEmpty, Allow } from 'class-validator'


class Image {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @IsNotEmpty()
    blob?:any

    @Allow()
    title?:string
    
    @IsNotEmpty()
    cid?:string 

    @Allow()
    dateCreated?:string
    
    @Allow()
    lastUpdated?:string
    
}

export {
    Image
}