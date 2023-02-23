import {  inject, injectable } from "inversify"
import { Block } from "../../dto/block.js"
import { BlockRepository } from "../block-repository.js"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Op } = require("sequelize")


@injectable()
class BlockRepositoryNodeImpl implements BlockRepository {


    async get(blockNumber:number, options?:any): Promise<Block> {
        return Block.findByPk(blockNumber, options)
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


    async remove(block:Block, options?:any) : Promise<void> {
        await block.destroy(options)
    }


    async findBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<Block[]> {

        let query = {
            where: {
                _id: {
                    [Op.and]: {
                        [Op.gte]: startBlock,
                        [Op.lte]: endBlock
                    }
                }
            }
        }

        query = Object.assign(query, options)

        return Block.findAll(query)

    }


}





export {
    BlockRepositoryNodeImpl
}