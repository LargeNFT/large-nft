/**
 * THESE CLASSES ARE HERE BECAUSE I NEEDED TO OVERRIDE THEM TO FIX A PROBLEM WITH DELETING
 * IMAGES BUT I DONT KNOW WHERE THEY SHOULD GO. SO THEY'RE HERE FOR NOW
 */
class DeleteAction extends QuillBlotFormatter.Action {
  onCreate() {

    const self = this

    self.keyUpListener = function(e) {
      self.onKeyUp(e)
    }

    document.addEventListener('keyup', self.keyUpListener, true);
    this.formatter.quill.root.addEventListener('input', self.keyUpListener, true);
  }

  onDestroy() {
    document.removeEventListener('keyup', self.keyUpListener);
    this.formatter.quill.root.removeEventListener('input', self.keyUpListener);
  }

  onKeyUp(e) {

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
    return [QuillBlotFormatter.AlignAction, QuillBlotFormatter.ResizeAction, DeleteAction]
  }
}

/**
 * END UTIL
 */





class QuillService {

  buildQuillPostEditor(selector) {

    Quill.register('modules/blotFormatter', QuillBlotFormatter.default)


    const quill = new Quill(selector, {
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

    let Inline = Quill.import('blots/inline');

    class BoldBlot extends Inline { }
    BoldBlot.blotName = 'bold';
    BoldBlot.tagName = 'strong';

    class ItalicBlot extends Inline { }
    ItalicBlot.blotName = 'italic';
    ItalicBlot.tagName = 'em';


    class LinkBlot extends Inline {
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


    class BlockquoteBlot extends Block { }
    BlockquoteBlot.blotName = 'blockquote'
    BlockquoteBlot.tagName = 'blockquote'



    class HeaderBlot extends Block {
      static formats(node) {
        return HeaderBlot.tagName.indexOf(node.tagName) + 1;
      }
    }
    HeaderBlot.blotName = 'header';
    HeaderBlot.tagName = ['H1', 'H2'];


    let BlockEmbed = Quill.import('blots/block/embed');


    class DividerBlot extends BlockEmbed { }
    DividerBlot.blotName = 'divider';
    DividerBlot.tagName = 'hr';


    class IpfsImageBlot extends BlockEmbed {
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

    IpfsImageBlot.blotName = 'ipfsimage';
    IpfsImageBlot.tagName = 'img';


    class IpfsVideoBlot extends BlockEmbed {
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
    Quill.register(DividerBlot)
    Quill.register(HeaderBlot)
    Quill.register(BlockquoteBlot)
    Quill.register(LinkBlot)
    Quill.register(BoldBlot)
    Quill.register(ItalicBlot)


    return quill
  }



}



