import { injectable } from "inversify"
import toBuffer from "it-to-buffer"
import { Image } from "../dto/image"
import { DatabaseService } from "./core/database-service"
import { IpfsService } from "./core/ipfs-service"
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { Blob } from 'buffer';
import { ImageRepository } from "../repository/image-repository"
import { channel } from "diagnostics_channel"


@injectable()
class ImageService {

    db:any

    constructor(
        private imageRepository:ImageRepository,
        private ipfsService:IpfsService
    ) {}

    async get(_id:string) : Promise<Image> {
        return this.imageRepository.get(_id)
    }

    async put(image:Image) {
        
        if (!image._id) {
          image._id = image.cid
          image.dateCreated = new Date().toJSON()
        } else {
          image.lastUpdated = new Date().toJSON()
        }


        //Validate
        let errors:ValidationError[] = await validate(image, {
          forbidUnknownValues: true,
          whitelist: true
        })
    
        if (errors.length > 0) {
          throw new ValidationException(errors)
        }
          

        await this.imageRepository.put(image)
    }


    async newFromCid(cid:string) : Promise<Image> {

      const image:Image = new Image()

      image.url = await this.cidToUrl(cid)
      image.cid = cid

      return image

    }

    public async cidToUrl(cid:string) : Promise<string> {
        
        const bufferedContents = await toBuffer(await this.ipfsService.ipfs.cat(cid))

        // const bufferedContents = await toBuffer(ipfs.cat('QmWCscor6qWPdx53zEQmZvQvuWQYxx1ARRCXwYVE4s9wzJ')) // returns a Buffer
        var blob = new Blob([bufferedContents], {type:"image/jpg"})

        //@ts-ignore
        return URL.createObjectURL(blob)

    }

}

export {
    ImageService
}