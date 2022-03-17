import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsNotEmpty, Allow } from 'class-validator'

import { AttributeOptions } from "./attribute";

class Channel {

    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    contractAddress?:string

    @IsNotEmpty()
    authorId:string

    @MinLength(3, { message: "Title must be more than 3 characters." })
    title?:string

    @Allow()
    link?:string

    @Allow()
    description

    @Allow()
    descriptionHTML:string

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @MinLength(3, { each: true, message: 'Category is too short. Minimum length is $value characters' })
    category?:string[]

    @Allow()
    copyright?:string

    @Allow()
    language?:string

    @Allow()
    coverImageId?:string

    @Allow()
    mintPrice?:number

    @Allow()
    locked?:boolean

    @Allow()
    attributeOptions:AttributeOptions[]

    @Allow()
    pubDate?:string 

    @Allow()
    sellerFeeBasisPoints:number

    @Allow()
    feeRecipient:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string

}

export {
    Channel
}
