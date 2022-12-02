import { inject, injectable } from "inversify"
import { AttributeTotal } from "../../dto/attribute-total.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { AttributeTotalRepository } from "../attribute-total-repository.js"

@injectable()
class AttributeTotalRepositoryBrowserImpl implements AttributeTotalRepository {

    db:any
    dbName:string = "attribute-totals"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true,
            initialRecordsPath: 'attributeTotals.json'
        })
    }

    constructor(
    ) {}


    async get(_id:string): Promise<AttributeTotal> {        
        return Object.assign(new AttributeTotal(), await this.db.get(_id))
    }

    async getByIds(ids:string[]) : Promise<AttributeTotal[]> {

        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true
        })

        return results.rows?.map( d => d.doc)

    }


    async put(attributeTotal:AttributeTotal) : Promise<void> {
        await this.db.put(attributeTotal)
    }

    async list(limit?:number, skip?:number) : Promise<AttributeTotal[]> {
        
        let response = await this.db.find({
            selector: {
                count: { $exists: true }
            },
            limit: limit,
            skip: skip
        })

        return response.docs

    }

}

export {
    AttributeTotalRepositoryBrowserImpl
}


