interface AttributeOptions {
    id:string
    traitType:string
    values:string[]
}

interface AttributeSelection {
    traitType:string
    value:string 
}

export {
    AttributeOptions, AttributeSelection
}