import { AttributeSelection } from "./attribute.js";

interface NFTMetadata {

    tokenId:number

    name?:string
    description?:string

    image?:string
    image_data?:string

    external_url?:string 
    
    attributes?:AttributeSelection[]

    background_color?:string 
    animation_url?:string
} 

export {
    NFTMetadata
}