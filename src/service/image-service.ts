import { injectable } from "inversify"
import toBuffer from "it-to-buffer"
import { Image } from "../dto/image"
import { DatabaseService } from "./core/database-service"
import { IpfsService } from "./core/ipfs-service"
import { UploadService } from "./core/upload-service"


@injectable()
class ImageService {

    db:any

    constructor(
        private databaseService:DatabaseService,
        private ipfsService:IpfsService
    ) {}

    async load(walletAddress:string) {
      this.db = this.databaseService.getDatabase(walletAddress, "image")
    }

    async get(_id:string) : Promise<Image> {
        return this.db.get(_id)
    }

    async put(image:Image) {
        
        let key:string

        if (image._id) {
          key = image._id
        } else {
          key = image.cid
        }

        image.url = await this.cidToUrl(key)

        await this.db.put(key, image)
    }


    public async cidToUrl(cid:string) : Promise<string> {
        
        const bufferedContents = await toBuffer(await this.ipfsService.ipfs.cat(cid))

        // const bufferedContents = await toBuffer(ipfs.cat('QmWCscor6qWPdx53zEQmZvQvuWQYxx1ARRCXwYVE4s9wzJ')) // returns a Buffer
        var blob = new Blob([bufferedContents], {type:"image/jpg"})

        return window.URL.createObjectURL(blob)

    }

}

export {
    ImageService
}