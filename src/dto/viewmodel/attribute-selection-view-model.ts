import { AttributeOptions, AttributeSelection } from "../../dto/attribute.js";


interface AttributeSelectionViewModel {

    id:string
    traitType:string

    values:string[]
    value:string

    categoryPercent?:string
}

export {
    AttributeSelectionViewModel
}