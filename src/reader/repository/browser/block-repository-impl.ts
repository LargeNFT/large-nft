import {  inject, injectable } from "inversify"
import { Block } from "../../dto/block.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { BlockRepository } from "../block-repository.js"


@injectable()
class BlockRepositoryBrowserImpl implements BlockRepository {

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



    async get(_id: number): Promise<Block> {
        return Object.assign(new Block(), await this.db.get(_id))
    }


    async put(block: Block): Promise<void> {
        await this.db.put(block)
    }
  
    async putAll(blocks:Block[]) : Promise<void> {
        await this.db.bulkDocs(blocks)
    }

}





export {
    BlockRepositoryBrowserImpl
}