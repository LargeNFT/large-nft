import { inject, injectable } from "inversify";
import svgToMiniDataURI from 'mini-svg-data-uri'


import { ImageRepository } from "../repository/image-repository.js";
import { Image } from "../dto/image.js";


@injectable()
class ImageService {

  @inject("ImageRepository")
  private imageRepository:ImageRepository

  constructor() { }

  async get(_id: string): Promise<Image> {
    return this.imageRepository.get(_id)
  }

  async list() : Promise<Image[]> {
    return this.imageRepository.list()
  }

  async getUrl(image: Image) {

    if (!image.buffer && !image.svg) return ""

    //If we have a buffer return it as a URL
    if (image.buffer) {
      return this.bufferToDataURL("image/jpg", image.buffer)
    } 

    if (image.svg) {
      return this.getSVGURL(image)
    }
    

  }


  async getSVGURL(image: Image) {

    if (!image.svg) return ""
    return this.svgToDataURL(image.svg)

  }


  public svgToDataURL(svgStr) {  
    return svgToMiniDataURI(svgStr)

    // return "data:image/svg+xml;base64," + Buffer.from(svgStr).toString("base64")
  }

  public bufferToDataURL (mimeType, buffer) {
    return `data:${mimeType};base64,${buffer.toString("base64")}`
  }

}


export { ImageService }

