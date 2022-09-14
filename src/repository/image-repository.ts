import { injectable } from "inversify"
import { Image } from "../dto/image"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class ImageRepository {

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


    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "image", this.changesets)
    }

    async get(_id: string): Promise<Image> {
        return Object.assign(new Image(), await this.db.get(_id))
    }

    async put(image: Image) {
        await this.db.put(image)
    }

}

export {
    ImageRepository
}