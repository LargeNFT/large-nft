import { Block } from "../dto/block.js"


interface BlockRepository {
    get(blockNumber:number): Promise<Block>
    put(block:Block) : Promise<void>
    putAll(blocks:Block[]) : Promise<void>

}



export {
    BlockRepository
}
