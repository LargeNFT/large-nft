import { injectable } from "inversify"
import { Animation } from "../dto/animation"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class AnimationRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            })

        }
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load() {
        this.db = await this.databaseService.getDatabase("animation", this.changesets)
    }

    async get(_id: string): Promise<Animation> {
        return Object.assign(new Animation(), await this.db.get(_id))
    }

    async put(animation: Animation) {
        await this.db.put(animation)
    }

}

export {
    AnimationRepository
}