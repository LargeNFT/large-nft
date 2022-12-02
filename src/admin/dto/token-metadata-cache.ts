import { IsNotEmpty, Allow } from 'class-validator'


class TokenMetadataCache {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    tokenMetadata?:TokenMetadata
    
    @Allow()
    dateCreated?:string
    
    
}

interface TokenMetadata {
    tokenId:number
    name: string
    
    image: string
    image_url:string 

    external_url: string 
    animation_url:string
    attributes: [{
        trait_type: string
        value:string
    }]
}



export {
    TokenMetadataCache, TokenMetadata
}