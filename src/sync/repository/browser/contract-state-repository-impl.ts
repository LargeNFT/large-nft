import {  inject, injectable } from "inversify"
import { ContractState } from "../../dto/contract-state.js"
import { DatabaseService } from "../../../reader/service/core/database-service.js"
import { ContractStateRepository } from "../contract-state-repository.js"

@injectable()
class ContractStateRepositoryBrowserImpl implements ContractStateRepository {

    db:any
    dbName:string = "contract-states"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false
        })
    }

    constructor(
    ) {}


    async get(_id:string): Promise<ContractState> {        
        return Object.assign(new ContractState(), await this.db.get(_id))
    }

    async put(contractState:ContractState) {
        await this.db.put(contractState)
    }



}

export {
    ContractStateRepositoryBrowserImpl
}