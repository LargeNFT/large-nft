import {  inject, injectable } from "inversify"
import { ENS } from "../../dto/ens.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { ENSRepository } from "../ens-repository.js"

@injectable()
class ENSRepositoryBrowserImpl implements ENSRepository {

    // db:any
    // dbName:string = "ens"

    // @inject('DatabaseService')
    // private databaseService:DatabaseService


    async load() {
        // this.db = await this.databaseService.getDatabase({
        //     name: this.dbName,
        //     initialRecords: false
        // })
    }

    async get(_id: string): Promise<ENS> {
        return
        // return Object.assign(new ENS(), await this.db.get(_id))
    }

    async put(ens: ENS): Promise<void> {
        // await this.db.put(ens)
    }
  
}


export {
    ENSRepositoryBrowserImpl
}