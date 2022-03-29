import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import { deltaToMarkdown } from 'quill-delta-to-markdown'

import { ImageService } from './image-service'
import { injectable } from 'inversify';
import { Image } from "../dto/image"


@injectable()
class QuillService {

  constructor(
    private imageService: ImageService
  ) {}

  async translateContent(content: any): Promise<string> {

    if (!content?.ops) return ""

    const qdc = new QuillDeltaToHtmlConverter(content.ops, {})

    //Render dividers into HTML
    qdc.renderCustomWith(function (customOp, contextOp) {

      if (customOp.insert.type === 'divider') {
        return "<hr />"
      }

      if (customOp.insert.type === 'ipfsimage') {
        return `<img
                src="${customOp.insert.value.src}" 
                width="${customOp.insert.value.width}" 
                height="${customOp.insert.value.height}" 
                style="${customOp.insert.value.style}" />`
      }


    })

    return qdc.convert()
  }


  async generateMarkdown(content: any) : Promise<string> {
    return deltaToMarkdown(content)
  }


}



export { QuillService }

