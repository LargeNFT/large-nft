import { QueryCache } from "../dto/query-cache"
import { injectable } from "inversify"
import { DatabaseService } from "../service/core/database-service"
import { AttributeCount } from "../dto/attribute"


@injectable()
class AttributeCountRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-attribute-counts`)
    }

    async get(_id: string): Promise<AttributeCount> {
        return Object.assign(new AttributeCount(), await this.db.get(_id))
    }

    async put(attributeCount: AttributeCount) {
        await this.db.put(attributeCount)
    }


    async delete(_id:string): Promise<void> {
        await this.db.remove(_id)
    }

}

export {
    AttributeCountRepository
}