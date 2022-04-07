import { injectable } from "inversify"
import { Image } from "../dto/image"
import { ValidationException } from "../util/validation-exception"
import { validate, ValidationError } from 'class-validator'
import { ImageRepository } from "../repository/image-repository"
import { Blob } from 'blob-polyfill'
import Hash from 'ipfs-only-hash'

import toBuffer from 'blob-to-buffer'

const reduce = require('image-blob-reduce')();


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

  async listByChannel(channelId: string, limit: number, skip: number): Promise<Image[]> {
    return this.imageRepository.listByChannel(channelId, limit, skip)
  }

  async newFromBuffer(buffer: Uint8Array, maxWidth:number): Promise<Image> {

    const image: Image = new Image()

    image.buffer = buffer
    image.cid = await Hash.of(buffer)

    if (Blob && maxWidth) {
      let blob = await this.bufferToBlob(image.buffer)
      let resizedBlob = await reduce.toBlob(blob, { max: maxWidth})
      image.buffer = toBuffer(resizedBlob)
    }


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

  public blobToDataURL(blob): Promise<string> {

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