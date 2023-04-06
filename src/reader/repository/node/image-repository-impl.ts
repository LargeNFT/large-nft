import {  inject, injectable } from "inversify"
import fs from "fs"
import { ImageRepository } from "../image-repository.js"
import { Image } from "../../dto/image.js"

@injectable()
class ImageRepositoryNodeImpl implements ImageRepository {
    
    constructor(
        @inject('channelDir') private channelDir
    ) {}

    images:Image[] = []

    async get(_id:string): Promise<Image> {        
        
        if(this.images?.length == 0) {
            this.images = JSON.parse(fs.readFileSync(`${this.channelDir}/backup/export/backup/images.json`, 'utf8'))
        }

        let matches = this.images.filter( image => image._id == _id)

        let image:Image

        if (matches?.length > 0) {
            image = matches[0]
        }

        if (image) {
            //Load content
            if (image.generated) {
                image.svg = fs.readFileSync(`${this.channelDir}/backup/export/images/${image.cid}.svg`, 'utf8')
            } else {
                image.buffer = fs.readFileSync(`${this.channelDir}/backup/export/images/${image.cid}.jpg`)
            }
        }


        return image
    }

    async list() : Promise<Image[]> {

        if(this.images?.length == 0) {
            this.images = JSON.parse(fs.readFileSync(`${this.channelDir}/backup/export/backup/images.json`, 'utf8'))
        }

        return this.images
    }


}

export {
    ImageRepositoryNodeImpl
}