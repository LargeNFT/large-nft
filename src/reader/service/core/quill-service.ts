import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import { deltaToMarkdown } from 'quill-delta-to-markdown'

import { injectable } from 'inversify';


@injectable()
class QuillService {

  constructor() {}

  async translateContent(content: any): Promise<string> {

    if (!content?.ops) return ""

    // console.log(content.ops)

    const qdc = new QuillDeltaToHtmlConverter(content.ops, { })

    //Render dividers into HTML
    qdc.renderCustomWith(function (customOp, contextOp) {

      if (customOp.insert.type === 'divider') {
        return "<hr />"
      }

      if (customOp.insert.type === 'ipfsimage') {
        
        let img = `<img src="${customOp.insert.value.src}" `

        if (customOp.insert.value.width) {
          img += `width="${customOp.insert.value.width}" `
        }

        if (customOp.insert.value.height) {
          img += `height="${customOp.insert.value.height}" `
        }

        if (customOp.insert.value.style) {
          img += `style="${customOp.insert.value.style}"`
        }

        img += "/>"

        return img
      }

    })

    return qdc.convert()
  }


  async generateMarkdown(content: any) : Promise<string> {
    return deltaToMarkdown(content)
  }


}



export { QuillService }

