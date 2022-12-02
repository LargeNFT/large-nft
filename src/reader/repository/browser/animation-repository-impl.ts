import {  inject, injectable } from "inversify"
import { Animation } from "../../dto/animation.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { AnimationRepository } from "../animation-repository.js"

@injectable()
class AnimationRepositoryBrowserImpl implements AnimationRepository {

    db:any
    dbName:string = "animations"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true
        })
    }

    constructor(
    ) {}


    async get(_id:string): Promise<Animation> {        
        return Object.assign(new Animation(), await this.db.get(_id))
    }



}

export {
    AnimationRepositoryBrowserImpl
}