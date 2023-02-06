
class Token {
    
    declare _id?:string

    declare _rev?:string 

    declare tokenId?:number

    declare attributeSelections?:[{
        traitType: string
        value: string
    }]

    declare currentOwnerId?:string 

    declare ownershipHistory?:OwnershipHistory[]

    declare latestTransactionId?:string

    declare lastUpdated?:Date 

    declare dateCreated?:Date

}

interface OwnershipHistory {
    owner:string,
    blockNumber:number
    transactionIndex:number
    transactionHash:string
    timestamp:number
}

export {
    Token
}