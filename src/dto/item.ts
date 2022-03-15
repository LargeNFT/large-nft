import { Author } from "./author"
import { Channel } from "./channel"
import { Image } from "./image"
import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested,IsNotEmpty } from 'class-validator'

class Item {
    
    _id?:string
    _rev?:string
    
    @IsNotEmpty()
    @ValidateNested()
    channel?:Channel

    tokenId?:string 

    @MinLength(10, { message: "Title must be more than 10 characters." })
    title?:string 
    link?:string 

    @MinLength(10, { message: "Description must be more than 10 characters." })
    description:string
    
    @IsNotEmpty()
    @ValidateNested()
    author:Author

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @MinLength(3, { each: true, message: 'Category is too short. Minimum length is $value characters' })
    category:string[]

    coverPhoto?:Image

    datePublished:string

    dateCreated?:string
    lastUpdated?:string
}


export { Item }