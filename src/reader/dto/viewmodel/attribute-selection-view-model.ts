import { AttributeTotal } from "../attribute-total.js";


interface AttributeSelectionViewModel {

    id:string
    traitType:string

    values:string[]
    value:string

    attributeTotal:AttributeTotal
}

export {
    AttributeSelectionViewModel
}