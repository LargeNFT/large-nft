import { injectable } from "inversify"
import { Image } from "../dto/image"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class ImageRepository {

    CREATE_INDEXES = async (db) => {

        await db.createIndex({
            index: {
                fields: ['channelId']
            }
        })

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
        this.db = await this.databaseService.getDatabase(walletAddress, "image", this.CREATE_INDEXES)
    }

    async get(_id: string): Promise<Image> {
        return Object.assign(new Image(), await this.db.get(_id))
    }

    async put(image: Image) {
        await this.db.put(image)
    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<Image[]> {

        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: limit,
            skip: skip
        })
  
        return response.docs
  
    }

}

export {
    ImageRepository
}