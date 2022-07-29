import { AttributeSelection } from "./attribute";

interface ContractMetadata {

    name?:string
    description?:string

    image?:string

    external_link?:string 
    
    seller_fee_basis_points?:number
    fee_recipient?:string

    license?:string
} 

export {
    ContractMetadata
}