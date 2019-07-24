import {Post} from "../dto/post";
import {Template7} from "framework7";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";



class PublicPostService {

  constructor(
    private store: any
  ) {}

  async create(post:Post) : Promise<string> {

    let cid = await this.store.add(post)
    post._id = cid

    this._translatePost(post)

    return cid 

  }

  async read(cid:string) : Promise<Post> {

    let e = this.store.get(cid)
    
    let post:Post = e.payload.value
    post._id = cid

    return post
  }


  async delete(cid:string) : Promise<void> {
    return this.store.remove(cid)
  }


  async getRecentPosts(options) : Promise<Post[]> {

    options.reverse = true
    options.lt = options.before //just want to remember 'before'

    let posts = this.store.iterator(options)
                          .collect()
                          .map((e) => {

                            let post = {
                              _id: e.hash
                            }

                            Object.assign(post, e.payload.value)

                            //@ts-ignore
                            this._translatePost(post)

                            return post
                          }
    )

    // posts.reverse()

    return posts

  }



  getImagesFromPostContentOps(ops : any) {

    const images : string[] = []

    for (let op of ops) {
      if (op.insert && op.insert.ipfsimage) {
        images.push(op.insert.ipfsimage.ipfsCid)
      }
    }

    return images

  }




  _translatePost(post: Post): void {

    //Create content HTML
    //@ts-ignore
    const qdc = new QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {
    });

    //Render dividers into HTML
    qdc.renderCustomWith(function(customOp, contextOp) {
      if (customOp.insert.type === 'divider') {
        return "<hr />"
      }

      if (customOp.insert.type === 'ipfsimage') {
        return `<img src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}"  />`
      }

      if (customOp.insert.type === 'ipfsvideo') {
        return `
            <video width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}">
              <source src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" type="video/mp4">
            </video>
          `
      }

    })


    post.contentTranslated = qdc.convert();


  }

}


export { PublicPostService }

