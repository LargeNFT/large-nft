import { AttributeOptions, AttributeSelection } from "./attribute"

import { MinLength, ArrayNotEmpty, ArrayMinSize ,IsNotEmpty, Allow } from 'class-validator'

class Item {
    
    @Allow()
    _id?:string
    
    @Allow()
    _rev?:string
    
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
    animationId?:string

    @Allow()
    themeId?:string

    @Allow()
    coverImageCSS?:string 

    @Allow()
    animationCSS?:string

    @Allow()
    coverImageAsAnimation?:boolean

    @Allow()
    datePublished?:string

    @Allow()
    dateCreated?:string
    
    @Allow()
    lastUpdated?:string
}


export { Item }