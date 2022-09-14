import { AttributeOptions, AttributeSelection } from "../../dto/attribute";


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