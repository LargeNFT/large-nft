import { injectable } from "inversify"
import { Settings } from "../dto/settings.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"


@injectable()
class SettingsRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load() {
        this.db = await this.databaseService.getDatabase("settings")
    }
    async get(): Promise<Settings> {
        return Object.assign(new Settings(), await this.db.get("single"))
    }

    async put(settings: Settings) {

        //Force it to have the 'single' id
        settings._id = "single"

        await this.db.put(settings)
    }

}

export {
    SettingsRepository
}