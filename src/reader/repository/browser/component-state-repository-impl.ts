import {  inject, injectable } from "inversify"
import { ComponentState } from "../../dto/component-state.js"
import {  DatabaseService } from "../../service/core/database-service.js"
import { ComponentStateRepository } from "../component-state-repository.js"


@injectable()
class ComponentStateRepositoryBrowserImpl implements ComponentStateRepository {

    db:any
    dbName:string = "component-state"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }

    constructor() {}


    async get(_id:string): Promise<ComponentState> {        
        return Object.assign(new ComponentState(), await this.db.get(_id))
    }

    async put(componentState:ComponentState) {
        await this.db.put(componentState)
    }


}


export {
    ComponentStateRepositoryBrowserImpl
}