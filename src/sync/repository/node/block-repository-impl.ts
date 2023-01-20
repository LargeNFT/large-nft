import {  inject, injectable } from "inversify"
import { Block } from "../../dto/block.js"
import { BlockRepository } from "../block-repository.js"


@injectable()
class BlockRepositoryNodeImpl implements BlockRepository {

    async get(blockNumber:number): Promise<Block> {
        let block = await Block.findByPk(blockNumber)
        return block
    }

    async put(block: Block, options?:any): Promise<Block> {

        await block.save(options)
        return block

    }

    async putAll(blocks:Block[], options?:any) : Promise<void> {
        
        for (let block of blocks) {
            await this.put(block, options)
        }

    }


}





export {
    BlockRepositoryNodeImpl
}