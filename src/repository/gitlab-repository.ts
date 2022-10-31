import { injectable } from "inversify"
import { Gitlab } from "../dto/gitlab"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class GitlabRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {

        //Create indexes
        await db.createIndex({ index: { fields: ['dateCreated'] } })

        }
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load() {
        this.db = await this.databaseService.getDatabase("gitlab", this.changesets)
    }
    async get(): Promise<Gitlab> {
        return Object.assign(new Gitlab(), await this.db.get("single"))
    }

    async put(gitlab: Gitlab) {

        //Force it to have the 'single' id
        gitlab._id = "single"

        await this.db.put(gitlab)
    }

}

export {
    GitlabRepository
}