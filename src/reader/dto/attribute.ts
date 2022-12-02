interface AttributeOptions {
    id:string
    traitType:string
    values:string[]
}

interface AttributeSelection {
    id?:string
    traitType?:string
    value?:string 
}

interface AttributeOptionsViewModel {
    id:string
    traitType:string
    values:AttributeValueCount[]
}

interface AttributeValueCount {
    value:string
    count:number
}

export {
    AttributeOptions, AttributeSelection, AttributeOptionsViewModel, AttributeValueCount
}