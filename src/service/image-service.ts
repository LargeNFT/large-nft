import { injectable } from "inversify"
import { Image } from "../dto/image"
import { ValidationException } from "../util/validation-exception"
import { validate, ValidationError } from 'class-validator'
import { ImageRepository } from "../repository/image-repository"
import { Blob } from 'blob-polyfill'
import Hash from 'ipfs-only-hash'
import { SvgService } from "./svg-service"
import { QuillService } from "./quill-service"

import he from 'he'
import { Item } from "../dto/item"
import excerptHtml from 'excerpt-html'

const truncate = require('html-truncate')


@injectable()
class ImageService {

  db: any

  constructor(
    private imageRepository: ImageRepository,
    private svgService:SvgService,
    private quillService:QuillService
  ) { }

  async get(_id: string): Promise<Image> {
    return this.imageRepository.get(_id)
  }

  async put(image: Image) {

    if (!image._id) {
      image._id = image.cid
      image.dateCreated = new Date().toJSON()
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
    image.generated = false

    return image

  }

  async getUrl(image: Image) {

    if (!image.buffer && !image.svg) return ""

    //If we have a buffer return it as a URL
    if (image.buffer) {
      let blob: Blob = this.bufferToBlob(image.buffer)
      return this.blobToDataURL(blob)
    } 

    if (image.svg) {
      return this.getSVGURL(image)
    }
    

  }

  async getSVGURL(image: Image) {

    if (!image.svg) return ""
    return this.svgToDataURL(image.svg)

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

  public svgToDataURL(svgStr) {  
    return "data:image/svg+xml;base64," + Buffer.from(svgStr).toString("base64")
  }


  public async newFromItem(item:Item) {
    
    let content = await this.quillService.translateContent(item.content)

    let excerpt = this.getExcerptByFirstParagraph(content, {
      pruneLength: 500
    })

    if (!excerpt || excerpt.length == 0) { 
      throw new Error("No text") 
    }

    const image: Image = new Image()

    image.svg = await this.svgService.fromText(item.title, excerpt)

    image.cid = await Hash.of(image.svg)
    image.generated = true
    
    return image


  }


  // public async newFromQuillOps(ops) {
  //   let content = await this.quillService.translateContent({ops:ops})
  //   return this.newFromText(content)
  // }

  // public async newFromText(content) {
  
  //   let excerpt = this.getExcerptByFirstParagraph(content, {
  //     pruneLength: 500
  //   })

  //   if (!excerpt || excerpt.length == 0) { 
  //     throw new Error("No text") 
  //   }

  //   const image: Image = new Image()

  //   image.svg = await this.svgService.fromText(excerpt)

  //   image.cid = await Hash.of(image.svg)
  //   image.generated = true
    
  //   return image

  // }


  //Grabbing from the 
  private getExcerptByFirstParagraph (excerpt, options) {

    //Strip tags except for <p>
    excerpt = excerpt.replace(/<(?![p|br]\s*\/?)[^>]+>/g, '')
    
    excerpt = he.unescape(excerpt)
   
    const pruneLength = typeof options.pruneLength === 'number' ? options.pruneLength : 140

    if (pruneLength > 0) {
      excerpt = truncate(excerpt, pruneLength, {
        ellipsis: ""
      })
    }

    excerpt = he.encode(excerpt, {allowUnsafeSymbols: true})

    return excerpt


  }


}

export {
  ImageService
}