
import { AttributeOptions } from "./attribute.js";

class Channel {
    _id?:string
    _rev?:string 
    contractAddress?:string
    authorId:string
    title?:string
    symbol?:string
    link?:string
    description?:string
    descriptionHTML?:string
    descriptionMarkdown?:string
    category?:string[]
    copyright?:string
    language?:string
    coverImageId?:string
    coverBannerId?:string
    mintPrice?:string
    attributeOptions:AttributeOptions[]
    sellerFeeBasisPoints:string
    royaltyPercent:string
    itemCount:number
    dateCreated?:string
    lastUpdated?:string
}

export {
    Channel
}
