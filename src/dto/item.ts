import { AttributeOptions, AttributeSelection } from "./attribute.js"

import { MinLength, ArrayNotEmpty, ArrayMinSize ,IsNotEmpty, Allow } from 'class-validator'

class Item {
    
    @Allow()
    _id?:string
    
    @Allow()
    _rev?:string

    @Allow()
    forkedFromId?:string
    
    @IsNotEmpty()
    channelId?:string
    
    @IsNotEmpty()
    tokenId?:number 
    
    @Allow()
    title?:string 

    @Allow()
    link?:string 

    @Allow()
    description?:string

    @Allow()
    content?:any

    @Allow()
    contentHTML?:string

    @Allow()
    excerpt?:string

    @Allow()
    authorId?:string

    @Allow()
    category?:string[]

    @Allow()
    attributeSelections?: AttributeSelection[] 

    @Allow()
    coverImageId?:string

    @Allow()
    coverImageGenerated?:boolean

    @Allow()
    animationId?:string

    @Allow()
    themes?:string[]

    @Allow()
    coverImageCSS?:string 

    @Allow()
    animationCSS?:string

    @Allow()
    coverImageAsAnimation?:boolean

    @Allow()
    originalJSONMetadata?:any

    @Allow()
    datePublished?:string

    @Allow()
    dateCreated?:string
    
    @Allow()
    lastUpdated?:string
}





export { Item }