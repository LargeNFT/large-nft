interface NFTMetadata {

    image?:string
    image_data?:string

    external_url?:string 
    
    description?:string
    name?:string

    attributes?:{
        display_type:string
        trait_type:string
        value:string 
    }

    background_color:string 
    animation_url:string
} 

export {
    NFTMetadata
}