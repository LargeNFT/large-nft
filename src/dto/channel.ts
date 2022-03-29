import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsNotEmpty, Allow } from 'class-validator'

import { AttributeOptions } from "./attribute";

class Channel {

    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    authorId:string

    @MinLength(3, { message: "Title must be more than 3 characters." })
    title?:string

    @IsNotEmpty()
    symbol?:string

    @Allow()
    link?:string

    @Allow()
    description?:string

    @Allow()
    descriptionHTML?:string

    @Allow()
    descriptionMarkdown?:string
    
    @Allow()
    category?:string[]

    @Allow()
    copyright?:string

    @Allow()
    language?:string

    @Allow()
    coverImageId?:string

    @Allow()
    coverBannerId?:string

    @Allow()
    mintPrice?:string

    @Allow()
    attributeOptions:AttributeOptions[]

    @Allow()
    sellerFeeBasisPoints:string

    @Allow()
    royaltyPercent:string

    @Allow()
    pubDate?:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string

}

export {
    Channel
}
