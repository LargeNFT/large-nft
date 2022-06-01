import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested,IsNotEmpty, Allow } from 'class-validator'


class Image {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @IsNotEmpty()
    buffer?:any

    @Allow()
    svg?:string

    @Allow()
    title?:string
    
    @IsNotEmpty()
    cid?:string 

    @Allow()
    generated?:boolean

    @Allow()
    dateCreated?:string
    
    
}

export {
    Image
}