import {  inject, injectable } from "inversify"
import { DatabaseService } from "../../../reader/service/core/database-service.js"
import { Block } from "../../dto/block.js"
import { BlockRepository } from "../block-repository.js"


@injectable()
class BlockRepositoryNodeImpl implements BlockRepository {

    db:any
    dbName:string = "blocks"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }

    async get(blockNumber:number): Promise<Block> {
        return Object.assign(new Block(), await this.db.get(blockNumber.toString()))
    }

    async put(block: Block): Promise<void> {
        await this.db.put(block)
    }

    async putAll(blocks:Block[]) : Promise<void> {
        await this.db.bulkDocs(blocks)
    }


}





export {
    BlockRepositoryNodeImpl
}