import { AttributeSelection } from "./attribute";

interface NFTMetadata {

    tokenId:string

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