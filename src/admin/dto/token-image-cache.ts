import { IsNotEmpty, Allow } from 'class-validator'


class TokenImageCache {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    svg?:string

    @Allow()
    buffer?:any
    
    @Allow()
    dateCreated?:string
    
    
}




export {
    TokenImageCache
}