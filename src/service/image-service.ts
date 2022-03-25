import { injectable } from "inversify"
import toBuffer from "it-to-buffer"
import { Image } from "../dto/image"
import { IpfsService } from "./core/ipfs-service"
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { ImageRepository } from "../repository/image-repository"
import { Blob } from 'blob-polyfill';


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

      image.blob = await this.cidToBlob(cid)
      image.cid = cid

      return image

    }


    getUrl(image:Image) {
      if (!image.blob) return ""
      return URL.createObjectURL(image.blob)
    }


    public async cidToUrl(cid:string) : Promise<string> {

      var blob = await this.cidToBlob(cid)

      if (blob) {
        return URL.createObjectURL(blob)
      }

    }

    public async cidToBlob(cid:string) : Promise<Blob> {
        
      const bufferedContents = await toBuffer(await this.ipfsService.ipfs.cat(cid))

      if (Blob != undefined) {
        return new Blob([bufferedContents], {type:"image/jpg"})
      }

  }

}

export {
    ImageService
}