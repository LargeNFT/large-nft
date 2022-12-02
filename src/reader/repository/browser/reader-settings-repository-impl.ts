import {  inject, injectable } from "inversify"
import { ReaderSettings } from "../../dto/reader-settings.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { ReaderSettingsRepository } from "../reader-settings-repository.js"

@injectable()
class ReaderSettingsRepositoryBrowserImpl implements ReaderSettingsRepository {

    db:any
    dbName:string = "reader-settings"

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

    async put(readerSettings:ReaderSettings): Promise<void> {     
        
        //Just gonna have one record
        readerSettings._id = "reader-settings"
        
        await this.db.put(readerSettings)
    }


    async get(): Promise<ReaderSettings> {     
        
        let result

        try {
            result = await this.db.get("reader-settings")
        } catch(ex) {}

        if (!result) {
            result = new ReaderSettings()
            result._id = "reader-settings"
        }


        return Object.assign(new ReaderSettings(), result )
    }



}

export {
    ReaderSettingsRepositoryBrowserImpl
}