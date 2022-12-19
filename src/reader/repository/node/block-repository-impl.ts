import {  inject, injectable } from "inversify"
import { Block } from "../../dto/block.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { WalletService } from "../../service/core/wallet-service.js"
import { BlockRepository } from "../block-repository.js"


@injectable()
class BlockRepositoryNodeImpl implements BlockRepository {

    db:any
    dbName:string = "blocks"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    @inject('WalletService')
    private walletService:WalletService


    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }

    async get(blockNumber:number): Promise<Block> {

        let block

        try {
            block = await this.db.get(blockNumber.toString())
        } catch(ex) {}

        if (!block) {

            try {

                block = new Block()

                //Download it.
                block.data = await this.walletService.provider.getBlock(blockNumber)
                block._id = blockNumber.toString()

                //Save it
                await this.db.put(block)


            } catch(ex) {
                console.log(ex)
            }
        }

        return Object.assign(new Block(), block)
    }

    async put(block: Block): Promise<void> {
        await this.db.put(block)
    }

}





export {
    BlockRepositoryNodeImpl
}