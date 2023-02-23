import { Block } from "../dto/block.js"


interface BlockRepository {
    get(blockNumber:number, options?:any): Promise<Block>
    put(block:Block, options?:any) : Promise<Block>
    putAll(blocks:Block[], options?:any) : Promise<void>
    remove(block:Block, options?:any) : Promise<void> 
    findBetweenBlocks(startBlock: number, endBlock: number, options?:any) : Promise<Block[]>
}



export {
    BlockRepository
}
