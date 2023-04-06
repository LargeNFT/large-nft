import { inject, injectable } from "inversify"
import { AttributeTotal } from "../../dto/attribute-total.js"
import { AttributeTotalRepository } from "../attribute-total-repository.js"
import fs from "fs"



@injectable()
class AttributeTotalRepositoryNodeImpl implements AttributeTotalRepository {

    constructor(
        @inject('channelDir') private channelDir
    ) {}
    
    async get(_id:string): Promise<AttributeTotal> {      
        return
    }

    async getByIds(ids:string[]) : Promise<AttributeTotal[]> {


        return 

    }

    async put(attributeTotal:AttributeTotal) : Promise<void> {
        return
    }

    async list() : Promise<AttributeTotal[]> {
        let result = fs.readFileSync(`${this.channelDir}/public/attributeTotals.json`, 'utf8')          
        return JSON.parse(result)
    }




}

export {
    AttributeTotalRepositoryNodeImpl
}


