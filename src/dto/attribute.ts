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

export {
    AttributeOptions, AttributeSelection
}