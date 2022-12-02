interface ContractMetadata {

    name?:string
    description?:string

    image?:string

    external_link?:string 
    
    seller_fee_basis_points?:string
    fee_recipient?:string
} 

export {
    ContractMetadata
}