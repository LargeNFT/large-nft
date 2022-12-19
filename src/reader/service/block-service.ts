import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { BlockRepository } from "../repository/block-repository.js"
import { Block } from "../dto/block.js"


@injectable()
class BlockService {

    @inject("BlockRepository")
    private blockRepository:BlockRepository

    constructor() {}


    async get(blockNumber:number): Promise<Block> {        
        return this.blockRepository.get(blockNumber)
    }

    async put(block:Block) {

        if (!block._id) {
            block._id = block.blockNumber
            block.dateCreated = new Date().toJSON()
        }

        block.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(block, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.blockRepository.put(block)
    }

}



export {
    BlockService
}

