import { Image } from "../dto/image.js"


interface ImageRepository {
    get(_id:string): Promise<Image>
    list() : Promise<Image[]>

}

export {
    ImageRepository
}
