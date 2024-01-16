import { IsNotEmpty, Allow } from 'class-validator'


class Car {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @IsNotEmpty()
    cid?:string 

    @Allow()
    content?:Uint8Array

    @Allow()
    dateCreated?:string
        
}

export {
    Car
}