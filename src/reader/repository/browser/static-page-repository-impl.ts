import { inject, injectable } from "inversify"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"

import { StaticPageRepository } from "../static-page-repository.js"
import { StaticPage } from "../../dto/static-page.js"


@injectable()
class StaticPageRepositoryBrowserImpl implements StaticPageRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {
            //Create indexes
            await db.createIndex({
                index: {
                    fields: ['channelId']
                }
            })
            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            })
            
        }
    }]



    db:any
    dbName:string = "static-pages"
    
    @inject('DatabaseService')
    private databaseService: DatabaseService
    
    constructor() {}

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        })
    }


    async get(_id: string): Promise<StaticPage> {
        return Object.assign(new StaticPage(), await this.db.get(_id))
    }

    async listByLocation(location:string, skip:number): Promise<StaticPage[]> {

        let response = await this.db.find({
            selector: {
                locations: { $all: [location] },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            skip: skip
        })

        return response.docs
    }

}

export {
    StaticPageRepositoryBrowserImpl
}


