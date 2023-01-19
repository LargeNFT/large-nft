import { Block } from "../dto/block.js"


interface BlockRepository {
    get(blockNumber:number): Promise<Block>
    put(block:Block, options?:any) : Promise<Block>
    putAll(blocks:Block[], options?:any) : Promise<void>

}



export {
    BlockRepository
}
