import { injectable } from "inversify"
import { Animation } from "../dto/animation"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class AnimationRepository {

    CREATE_INDEXES = async (db) => {

        await db.createIndex({
            index: {
                fields: ['dateCreated']
            }
        })

    }


    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "animation", this.CREATE_INDEXES)
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