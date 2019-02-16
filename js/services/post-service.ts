import {Post} from "../dto/post";
import {Dom7, Template7} from "framework7";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html";
import {Global} from "../global";
import {ProfileService} from "./profile-service";
import {TemplateService} from "./template-service";
import {QueueService} from "./queue_service";


var $$ = Dom7; //red flag

let POST_REPO = 2;


class PostService {

  constructor(
    private profileService: ProfileService,
    private templateService: TemplateService) {
  }

  async getPostById(id): Promise<Post> {
    const post: Post = await Global.freedom.read(POST_REPO, id)

    //Fetch author
    await this._postFetchAuthor(post)

    //Convert content to HTML
    this._translatePost(post)

    return post

  }

  async getPostsDescending(limit: Number, offset: Number) : Promise<Post[]> {
    let posts : Post[] = await Global.freedom.readListDescending(POST_REPO, limit, offset)
    await this._lazyLoadPosts(posts)

    return posts

  }


  async getPostsByOwner(owner: string, limit: Number, offset: Number) : Promise<Post[]> {

    let posts : Post[] = await Global.freedom.readOwnedListDescending(POST_REPO, owner, limit, offset)

    await this._lazyLoadPosts(posts)

    return posts

  }


  async getPostCount() : Promise<Number> {
    return Global.freedom.count(POST_REPO)
  }

  async getPostByOwnerCount(owner: string) : Promise<Number> {
    return Global.freedom.countOwned(POST_REPO, owner)
  }

  async createPost(post: Post): Promise<void> {
    return Global.freedom.create(POST_REPO, post)
  }

  async updatePost(post: Post): Promise<void> {
    return Global.freedom.update(POST_REPO, post.id, post)
  }

  async _lazyLoadPosts(posts: Post[]) {
    //Fetch authors
    for (const post of posts) {
      await this._postFetchAuthor(post)
    }
  }


  async _postFetchAuthor(post: Post) : Promise<void> {
    if (post.authorId) {
      post.author = await this.profileService.getProfileById(post.authorId)
    }
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


  /**
   * Should probably move to a service that's view specific. Fine here for now.
   */
  loadMorePosts(posts : Post[], totalPostCount: Number, listSelector: string) {

    let postTemplate = this.templateService.getPostTemplate()

    for (let post of posts) {
      $$(listSelector).append(postTemplate(post))
    }

    const currentPostCount = $$(listSelector).children('li').length


    if (currentPostCount > 0) {
      $$(listSelector).find('.no-results').remove()
    }

    if (currentPostCount >= totalPostCount) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      Global.app.infiniteScroll.destroy('.infinite-scroll-content')
      // Remove preloader
      $$('.infinite-scroll-preloader').remove()
      return
    }





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

    //Convert date
    post.dateCreated = new Date(post.dateCreated).toDateString()

    //TODO: Probably put max display lengths here somewhere. Since we can't really verify on the way in.


  }

}


export { PostService }

