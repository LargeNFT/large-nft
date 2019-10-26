import Quill = require('quill/dist/quill.js')

import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter'
import QuillBlotFormatter = require('quill-blot-formatter')
import { Dom7, Template7 } from "framework7"
import { UploadService } from './upload-service'
import { ImageService } from "large-core"

var $$ = Dom7;

/**
 * THESE CLASSES ARE HERE BECAUSE I NEEDED TO OVERRIDE THEM TO FIX A PROBLEM WITH DELETING
 * IMAGES BUT I DONT KNOW WHERE THEY SHOULD GO. SO THEY'RE HERE FOR NOW
 */

class CustomDeleteAction extends DeleteAction {

  keyUpListener

  onCreate() {

    const self = this

    this.keyUpListener = function (e: KeyboardEvent) {
      self.onKeyUp(e)
    }

    document.addEventListener('keyup', self.keyUpListener, true);
    this.formatter.quill.root.addEventListener('input', self.keyUpListener, true);
  }

  onDestroy() {
    const self = this

    document.removeEventListener('keyup', self.keyUpListener);
    this.formatter.quill.root.removeEventListener('input', self.keyUpListener);
  }

  //@ts-ignore
  onKeyUp(e: KeyboardEvent) {

    if (!this.formatter.currentSpec) {
      return;
    }

    // delete or backspace
    if (e.keyCode === 46 || e.keyCode === 8) {

      const blot = Quill.find(this.formatter.currentSpec.getTargetElement());
      if (blot) {
        blot.deleteAt(0);
      }
      this.formatter.hide();
    }
  }

}


class CustomImageSpec extends QuillBlotFormatter.ImageSpec {
  getActions() {
    return [QuillBlotFormatter.AlignAction, QuillBlotFormatter.ResizeAction, CustomDeleteAction]
  }
}

/**
 * END UTIL
 */


class QuillService {

  public activeEditor: any

  initialized: boolean = false

  constructor(
    private uploadService: UploadService,
    private imageService: ImageService
  ) {

    const self = this

    $$(document).on('click', '.bold-button', function (e) {
      e.preventDefault()
      self.boldClick()
    })

    $$(document).on('click', '.italic-button', function (e) {
      e.preventDefault()
      self.italicClick()
    })

    $$(document).on('click', '.link-button', function (e) {
      e.preventDefault()
      self.linkClick()
    })

    $$(document).on('click', '.blockquote-button', function (e) {
      e.preventDefault()
      self.blockquoteClick()
    })

    $$(document).on('click', '.header-1-button', function (e) {
      e.preventDefault()
      self.header1Click()
    })

    $$(document).on('click', '.header-2-button', function (e) {
      e.preventDefault()
      self.header2Click()
    })

    // $$(document).on('click', '.divider-button', function (e) {
    //   e.preventDefault()
    //   self.dividerClick()
    // })

    $$(document).on('click', '.image-button', function (e) {
      e.preventDefault()
      self.imageClick()
    })

    $$(document).on('change', '.image-button-input', async function (e) {
      e.preventDefault()
      await self.imageSelected(this)
    })

    $$(document).on('click', '.cover-photo-img', function(e) {
      e.preventDefault()
      self.selectCoverPhoto(e)
    })




  }


  buildQuillPostEditor(selector: string): Quill {

    this.initialize()

    // this.activeEditor = undefined

    this.activeEditor = new Quill(selector, {
      modules: {
        blotFormatter: {
          specs: [
            CustomImageSpec,
          ],
          align: {
            icons: {
              left: "<i class='fa fa-align-left'></i>",
              center: "<i class='fa fa-align-center'></i>",
              right: "<i class='fa fa-align-right'></i>"
            },

            toolbar: {
              svgStyle: {
                fontSize: '21px',
              },
            }
          },

        }
      }

    })

    return this.activeEditor
  }

  initialize() {

    const self = this


    if (this.initialized) return


    Quill.register('modules/blotFormatter', QuillBlotFormatter.default)
    Quill.debug(false)


    let Inline = Quill.import('blots/inline');



    class BoldBlot extends Inline {
      static blotName?: string
      static tagName?: string
    }

    BoldBlot.blotName = 'bold';
    BoldBlot.tagName = 'strong';




    class ItalicBlot extends Inline {
      static blotName?: string
      static tagName?: string
    }

    ItalicBlot.blotName = 'italic';
    ItalicBlot.tagName = 'em';


    class LinkBlot extends Inline {

      static blotName?: string
      static tagName?: string

      static create(value) {
        let node = super.create();
        // Sanitize url value if desired
        node.setAttribute('href', value);
        // Okay to set other non-format related attributes
        // These are invisible to Parchment so must be static
        node.setAttribute('target', '_blank')
        return node;
      }

      static formats(node) {
        // We will only be called with a node already
        // determined to be a Link blot, so we do
        // not need to check ourselves
        return node.getAttribute('href')
      }
    }
    LinkBlot.blotName = 'link'
    LinkBlot.tagName = 'a'


    let Block = Quill.import('blots/block')

    class BlockquoteBlot extends Block {
      static blotName?: string
      static tagName?: string
    }

    BlockquoteBlot.blotName = 'blockquote'
    BlockquoteBlot.tagName = 'blockquote'


    class HeaderBlot extends Block {
      static blotName?: string
      static tagName?: string[]

      static formats(node) {
        return HeaderBlot.tagName.indexOf(node.tagName) + 1;
      }
    }
    HeaderBlot.blotName = 'header';
    HeaderBlot.tagName = ['H1', 'H2'];



    let BlockEmbed = Quill.import('blots/block/embed');

    class DividerBlot extends BlockEmbed {
      static blotName?: string
      static tagName?: string
    }
    DividerBlot.blotName = 'divider';
    DividerBlot.tagName = 'hr';


    class IpfsImageBlot extends BlockEmbed {
      static blotName?: string
      static tagName?: string

      static create(value) {

        self.imageService.cidToUrl(value.ipfsCid).then(function (imgUrl) {
          $$(`#${value.ipfsCid}`).prop('src', imgUrl)
        })

        let node = super.create();
        node.setAttribute('id', value.ipfsCid);
        node.setAttribute('ipfsCid', value.ipfsCid);
        node.setAttribute('width', value.width)
        node.setAttribute('height', value.height)
        node.setAttribute('style', value.style)

        return node;
      }

      static value(node) {

        let ipfsCid = node.getAttribute('ipfsCid')
        let width = node.getAttribute('width')
        let height = node.getAttribute('height')
        let style = node.getAttribute('style')

        return {
          ipfsCid: ipfsCid,
          width: width,
          height: height,
          style: style
        };
      }
    }

    IpfsImageBlot.blotName = 'ipfsimage';
    IpfsImageBlot.tagName = 'img';


    class IpfsVideoBlot extends BlockEmbed {

      static blotName?: string
      static tagName?: string

      static create(value) {
        let node = super.create();
        node.setAttribute('src', `${Template7.global.ipfsGateway}/${value.ipfsCid}`)
        node.setAttribute('ipfsCid', value.ipfsCid);
        node.setAttribute('width', value.width)
        node.setAttribute('height', value.height)
        node.setAttribute('style', value.style)

        return node;
      }

      static value(node) {

        let ipfsCid = node.getAttribute('ipfsCid')
        let width = node.getAttribute('width')
        let height = node.getAttribute('height')
        let style = node.getAttribute('style')

        return {
          ipfsCid: ipfsCid,
          width: width,
          height: height,
          style: style
        };
      }
    }


    IpfsVideoBlot.blotName = 'ipfsvideo';
    IpfsVideoBlot.tagName = 'video';


    Quill.register(IpfsVideoBlot)
    Quill.register(IpfsImageBlot)
    // Quill.register(DividerBlot)
    // Quill.register(HeaderBlot)
    Quill.register(BlockquoteBlot)
    Quill.register(LinkBlot)
    Quill.register(BoldBlot)
    Quill.register(ItalicBlot)



    this.initialized = true

  }


  boldClick() {
    const currentFormat = this.activeEditor.getFormat()
    this.activeEditor.format('bold', !currentFormat.bold)
  }

  italicClick() {
    const currentFormat = this.activeEditor.getFormat()
    this.activeEditor.format('italic', !currentFormat.italic)
  }

  linkClick() {
    let value = prompt('Enter link URL');
    this.activeEditor.format('link', value)
  }

  blockquoteClick() {
    const currentFormat = this.activeEditor.getFormat()
    this.activeEditor.format('blockquote', !currentFormat.blockquote);
  }

  header1Click() {
    const currentFormat = this.activeEditor.getFormat()
    this.activeEditor.format('header', currentFormat.header ? undefined : 1);
  }

  header2Click() {
    const currentFormat = this.activeEditor.getFormat()
    this.activeEditor.format('header', currentFormat.header ? undefined : 2);
  }


  // dividerClick() {

  //   let range = this.activeEditor.getSelection(true)

  //   this.activeEditor.insertText(range.index, '\n', Quill.sources.USER)
  //   this.activeEditor.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER)
  //   this.activeEditor.setSelection(range.index + 2, Quill.sources.SILENT)

  // }

  imageClick() {
    const imageButtonInput = $$(".image-button-input");
    imageButtonInput.click()
  }

  //TODO: move to service
  async imageSelected(fileElement: Element): Promise<void> {

    let imageCid = await this.uploadService.uploadFile(fileElement)

    let range = this.activeEditor.getSelection(true)

    this.activeEditor.insertText(range.index, '\n', Quill.sources.USER)
    this.activeEditor.insertEmbed(range.index, 'ipfsimage', { ipfsCid: imageCid }, Quill.sources.USER)
    this.activeEditor.setSelection(range.index + 2, Quill.sources.SILENT)


    //Make it the cover photo
    $$('input[name="coverPhotoCid"]').val(imageCid)

    await this.loadCoverPhotos()

  }

    //TODO: load this from a template7 template somehow instead
    async loadCoverPhotos() {

      const images = this.getImagesFromPostContentOps(this.activeEditor.getContents().ops)

      $$('.cover-photo-img-wrapper').empty()
      $$('.cover-photo-preview').hide()

      if (images.length > 0) {
        $$('.cover-photo-preview').show()
      }


      for (let imageCid of images) {

        const imgElement = $$('<img>')
        //@ts-ignore
        $$(imgElement).attr("src", await this.imageService.cidToUrl(imageCid))
        //@ts-ignore
        $$(imgElement).data("image-cid", imageCid)
        //@ts-ignore
        $$(imgElement).addClass("cover-photo-img")

        $$('.cover-photo-img-wrapper').append(imgElement)

      }

      this.setCoverPhoto($$('input[name="coverPhotoCid"]').val())

    }


    //TODO: can definitely be nicer.
    setCoverPhoto(imageCid) {

      $$('input[name="coverPhotoCid"]').val(imageCid)

      $$('.cover-photo-img-wrapper img').removeClass('selected')

      $$('.cover-photo-img-wrapper img').each(function(index, item) {
        if ($$(item).data("image-cid") == imageCid) {
          $$(item).addClass('selected')
        }
      })

    }

    selectCoverPhoto(e) {
      this.setCoverPhoto($$(e.target).data("image-cid"))
    }



    getImagesFromPostContentOps(ops: any) : string[] {

      const images: string[] = []
  
      for (let op of ops) {
        if (op.insert && op.insert.ipfsimage) {
          images.push(op.insert.ipfsimage.ipfsCid)
        }
      }
  
      return images
  
    }
  


}



export { QuillService }


