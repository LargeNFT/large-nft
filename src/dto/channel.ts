import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested,IsNotEmpty } from 'class-validator'

import { Author } from "./author";

class Channel {

    _id?:string
    _rev?:string 

    contractAddress?:string

    @IsNotEmpty()
    @ValidateNested()
    author:Author

    @MinLength(3, { message: "Title must be more than 3 characters." })
    title?:string

    link?:string

    @MinLength(3, { message: "Description must be more than 3 characters." })
    description?:string

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @MinLength(3, { each: true, message: 'Category is too short. Minimum length is $value characters' })
    category?:string[]

    copyright?:string
    language?:string

    image?:string
    mintPrice?:number
    locked?:boolean

    pubDate?:string 

    dateCreated?:string
    lastUpdated?:string

}

export {
    Channel
}
