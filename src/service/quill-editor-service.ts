//@ts-nocheck
import { injectable } from 'inversify';

import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter'

import { Dom7 } from "framework7"

// import { UploadService } from './core/upload-service'
import { ImageService } from './image-service'
import { readAndCompressImage } from 'browser-image-resizer';
import { UiService } from './core/ui-service';


var $$ = Dom7;

/**
 * END UTIL
 */

@injectable()
class QuillEditorService {

  public activeEditor: any

  initialized: boolean = false

  constructor(
    private imageService: ImageService,
    private uiService:UiService
  ) {

    const self = this

    $$(document).on('click', '.image-button', function (e) {
      e.preventDefault()
      self.imageClick()
    })

    $$(document).on('change', '.image-button-input', async function (e) {
      e.preventDefault()
      await self.imageSelected(this)
    })

    // console.log("Quill service init")

  }


  init() {

    const self = this
    if (this.initialized) return

    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
    Quill.register('modules/blotFormatter', BlotFormatter)
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
        
        let node = super.create()

        node.setAttribute('src', value.src)
        node.setAttribute('data-cid', value.cid)

        if (value.width) node.setAttribute('width', value.width)
        if (value.height) node.setAttribute('height', value.height)
        if (value.style) node.setAttribute('style', value.style)
        


        return node
      }

      static value(node) {

        let src = node.getAttribute('src')
        let cid = node.getAttribute('data-cid')

        let width = node.getAttribute('width')
        let height = node.getAttribute('height')
        let style = node.getAttribute('style')

        return {
          src: src,
          cid: cid,
          width: width,
          height: height,
          style: style
        }
      }
    }

    IpfsImageBlot.blotName = 'ipfsimage';
    IpfsImageBlot.tagName = 'img';




    Quill.register(IpfsImageBlot)
    // Quill.register(DividerBlot)
    // Quill.register(HeaderBlot)
    Quill.register(BlockquoteBlot)
    Quill.register(LinkBlot)
    Quill.register(BoldBlot)
    Quill.register(ItalicBlot)

    this.initialized = true

  }


  buildQuillPostEditor(selector: string, toolbarSelector: string): Quill {

    this.init()


    // this.activeEditor = undefined
    this.activeEditor = new Quill(selector, {
      bounds: ".page-content",
      modules: {
        imageDropAndPaste: {
          // add an custom image handler
          handler: (imageDataUrl, type, imageData) => {
            this.imageDropAndPasteHandler(imageDataUrl, type, imageData)
          }
        },

        toolbar: toolbarSelector,

        blotFormatter: {
          specs: [
            CustomImageSpec,
          ],
          align: {
            icons: {
              left: "<i class='material-icons'>align_horizontal_left</i>",
              center: "<i class='material-icons'>align_horizontal_center</i>",
              right: "<i class='material-icons'>align_horizontal_right</i>"
            },
  
            toolbar: {
              svgStyle: {
                fontSize: '21px',
              },
            }
          }
        },

      },
      handlers: {
        'link': (value) => {

          if (value) {
            var href = prompt('Enter the URL');
            this.quill.format('link', href);
          } else {
            this.quill.format('link', false);
          }
        }
      },

      theme: "snow"
    })

    return this.activeEditor
  }

  imageClick() {
    const imageButtonInput = $$(".image-button-input");
    imageButtonInput.click()

  }

  //TODO: move to service
  async imageSelected(fileElement: Element): Promise<void> {

    this.uiService.showSpinner("Processing image...")

    this.insertImage(fileElement.files[0])

    this.uiService.hideSpinner()

  }


  async insertImage(file) {

    let resizedImageBlob = await readAndCompressImage(file, {
      maxWidth: 1024
    })

    let imageArrayBuffer:ArrayBuffer = await resizedImageBlob.arrayBuffer()

    let image:Image = await this.imageService.newFromBuffer(new Uint8Array(imageArrayBuffer))
    
    try {
      await this.imageService.put(image)
    } catch(ex) { console.log(ex)} //Might already exist. That's fine.  

    let range = this.activeEditor.getSelection(true)

    this.activeEditor.insertText(range.index, '\n', Quill.sources.USER)

    this.activeEditor.insertEmbed(range.index, 'ipfsimage', { 
      cid: image.cid,
      src: await this.imageService.getUrl(image)
    }, Quill.sources.USER)

    this.activeEditor.setSelection(range.index + 2, Quill.sources.SILENT)

 
    const imageSelectedEvent = new CustomEvent('image-selected', {
      detail: { _id: image._id }
    })

    document.dispatchEvent(imageSelectedEvent)
  }

  async imageDropAndPasteHandler(imageDataUrl, type, imageData) {
    const file = imageData.toFile()
    await this.insertImage(file)
  }

}






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


class CustomImageSpec extends ImageSpec {
  getActions() {
    return [AlignAction, ResizeAction, CustomDeleteAction]
  }
}


export { QuillEditorService }

