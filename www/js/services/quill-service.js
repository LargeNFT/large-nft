class CustomImageSpec extends QuillBlotFormatter.ImageSpec {

}



class QuillService {

  buildQuillPostEditor(selector) {

    Quill.register('modules/blotFormatter', QuillBlotFormatter.default)


    const quill = new Quill(selector, {
      modules: {
        blotFormatter: {
          specs: [
            QuillBlotFormatter.ImageSpec,
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



