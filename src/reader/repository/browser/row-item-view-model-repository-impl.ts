import { inject, injectable } from "inversify"
import { RowItemViewModel } from "../../dto/item-page.js"
import { Item } from "../../dto/item.js"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"
import { RowItemViewModelRepository } from "../row-item-view-model-repository.js"




@injectable()
class RowItemViewModelRepositoryBrowserImpl implements RowItemViewModelRepository {


    changesets:Changeset[] = [
        {
            id: '0',
            changeset: async (db) => {

                await db.createIndex({
                    index: {
                        fields: ['tokenId']
                    }
                })
                        
            }
        }
    ]


    db:any
    dbName:string = "row-item-view-models"
    
    @inject('DatabaseService')
    private databaseService: DatabaseService
    
    constructor() {}

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true,
            initialRecordsPath: "t/all.json",
            changesets: this.changesets
        })
    }


    async get(_id: string): Promise<RowItemViewModel> {
        return this.db.get(_id)
    }
    


    async put(item: Item) {
        await this.db.put(item)
    }



    async getByTokenIds(ids:number[]) : Promise<RowItemViewModel[]> {

        let response = await this.db.find({
            selector: {
                tokenId: { $in: ids },
            }
        })

        if (response.docs?.length > 0) {
            return response.docs
        } else {
            return []
        }
    }



    
}

export {
    RowItemViewModelRepositoryBrowserImpl
}


