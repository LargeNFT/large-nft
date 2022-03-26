import { AttributeOptions, AttributeSelection } from "./attribute"

import { MinLength, ArrayNotEmpty, ArrayMinSize ,IsNotEmpty, Allow } from 'class-validator'

class Item {
    
    @Allow()
    _id?:string
    
    @Allow()
    _rev?:string
    
    @IsNotEmpty()
    channelId?:string
    
    @Allow()
    tokenId?:string //Generated when we publish 
    
    @MinLength(3, { message: "Title must be more than 3 characters." })
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
    authorId:string

    @Allow()
    category:string[]

    @Allow()
    attributeSelections: AttributeSelection[] 

    @Allow()
    coverImageId:string

    @Allow()
    datePublished:string

    @Allow()
    dateCreated?:string
    
    @Allow()
    lastUpdated?:string
}


export { Item }