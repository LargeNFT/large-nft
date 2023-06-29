import { injectable } from "inversify"
import { Animation } from "../dto/animation.js"
import { Changeset, DatabaseService } from "../service/core/database-service.js"


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


    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-animation`, this.changesets)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-animation`)
    }

    async get(_id: string): Promise<Animation> {
        return Object.assign(new Animation(), await this.db.get(_id))
    }

    async put(animation: Animation) {
        await this.db.put(animation)
    }

    async delete(animation: Animation): Promise<void> {
        await this.db.remove(animation)
    }

    async getByIds(ids:string[]) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true

        })

        return results.rows?.map( d => d.doc)
    }

}

export {
    AnimationRepository
}