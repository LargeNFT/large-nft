import { Allow } from "class-validator"

class Block {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    blockNumber?:string 

    @Allow()
    hash?: string

    @Allow()
    parentHash?: string

    @Allow()
    number:number

    @Allow()
    ethUSDPrice: number

    @Allow()
    timestamp: number

    @Allow()
    nonce?: string

    @Allow()
    difficulty?: string

    @Allow()
    gasLimit?: string

    @Allow()
    gasUsed?: string

    @Allow()
    miner?: string

    @Allow()
    extraData?: string

    @Allow()
    baseFeePerGas?: string

    @Allow()
    lastUpdated?:string 
    
    @Allow()
    dateCreated?:string



}

export {
    Block
}