import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import { deltaToMarkdown } from 'quill-delta-to-markdown'

// import { toDelta } from "delta-markdown-for-quill"
import pkg from 'delta-markdown-for-quill'
const { toDelta } = pkg

import { injectable } from 'inversify'


@injectable()
class QuillService {

  constructor() {}

  async translateContent(content: any, suppressSrc:boolean=false): Promise<string> {

    if (!content?.ops) return ""

    const qdc = new QuillDeltaToHtmlConverter(content.ops, { 
      encodeHtml: false
    })

    //Render dividers into HTML
    qdc.renderCustomWith(renderCustom(suppressSrc))

    return qdc.convert()
  }

  async translateContentEncodeHtml(content: any, suppressSrc:boolean=false): Promise<string> {

    if (!content?.ops) return ""

    const qdc = new QuillDeltaToHtmlConverter(content.ops, { })

    //Render dividers into HTML
    qdc.renderCustomWith(renderCustom(suppressSrc))

    return qdc.convert()
  }



  async generateMarkdown(content: any) : Promise<string> {
    return deltaToMarkdown(content.ops)
  }

  async deltaFromMarkdown(ops:string) : Promise<string> {
    return toDelta(ops)
  }


}


const renderCustom = (suppressSrc) => {

  return function (customOp, contextOp) {

    if (customOp.insert.type === 'divider') {
      return "<hr />"
    }
  
    if (customOp.insert.type === 'ipfsimage') {
      
      let img = `<img `
  
      if (!suppressSrc) {
        img += `src="${customOp.insert.value.src}" `
      }
  
      
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
  
  }



}

export { QuillService }

