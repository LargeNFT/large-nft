import { Allow } from "class-validator"

class Transaction {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 
    
    @Allow()
    hash?:string 

    @Allow()
    blockHash: string

    @Allow()
    blockNumber:number

    @Allow()
    transactionIndex: number

    @Allow()
    data: string

    @Allow()
    from: string

    @Allow()
    gasLimit: string

    @Allow()
    gasPrice: string

    @Allow()
    nonce: number

    @Allow()
    value: string

    @Allow()
    networkId: number

    @Allow()
    r: string

    @Allow()
    s: string

    @Allow()
    v: number

    @Allow()
    raw: string

    @Allow()
    receipt:TransactionReceipt


    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string

}

interface TransactionReceipt {
    contractAddress?:string
    cumulativeGasUsed?:string
    effectiveGasPrice?:string
    gasUsed?:string
    logs:[]
}


export {
    Transaction
}