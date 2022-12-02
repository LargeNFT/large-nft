import {  inject, injectable } from "inversify"
import { Image } from "../../dto/image.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { ImageRepository } from "../image-repository.js"

@injectable()
class ImageRepositoryBrowserImpl implements ImageRepository {

    db:any
    dbName:string = "images"

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


    async get(_id:string): Promise<Image> {        
        return Object.assign(new Image(), await this.db.get(_id))
    }

    async list() : Promise<Image[]> {
        return //unimplemented
    }



}

export {
    ImageRepositoryBrowserImpl
}