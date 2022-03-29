import { injectable } from "inversify"
import toBuffer from "it-to-buffer"
import { Image } from "../dto/image"
import { IpfsService } from "./core/ipfs-service"
import { ValidationException } from "../util/validation-exception"
import { validate, ValidationError } from 'class-validator'
import { ImageRepository } from "../repository/image-repository"
import { Blob } from 'blob-polyfill'
import Hash from 'ipfs-only-hash'


@injectable()
class ImageService {

  db: any

  constructor(
    private imageRepository: ImageRepository
  ) { }

  async get(_id: string): Promise<Image> {
    return this.imageRepository.get(_id)
  }

  async put(image: Image) {

    if (!image._id) {
      image._id = image.cid
      image.dateCreated = new Date().toJSON()
    } else {
      image.lastUpdated = new Date().toJSON()
    }


    //Validate
    let errors: ValidationError[] = await validate(image, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.imageRepository.put(image)
  }


  async newFromBuffer(buffer: Uint8Array): Promise<Image> {

    const image: Image = new Image()

    image.buffer = buffer
    image.cid = await Hash.of(buffer)

    return image

  }


  async getUrl(image: Image) {

    if (!image.buffer) return ""

    let blob: Blob = this.bufferToBlob(image.buffer)

    return this.blobToDataURL(blob)

  }

  public bufferToBlob(buffer: Uint8Array): Promise<Blob> {

    if (Blob != undefined) {
      return new Blob([buffer], { type: "image/jpg" })
    }

  }


  public blobToDataURL(blob) : Promise<string> {
    
    let dataUrl

    return new Promise((resolve, reject) => {

      const fr = new FileReader()

      fr.onload = async function () {
        dataUrl = fr.result
        resolve(dataUrl)
      }

      fr.readAsDataURL(blob)
    })


  }

}

export {
  ImageService
}