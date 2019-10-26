import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import Web, { ModelView } from 'large-web'
import { QuillService } from "../../services/quill-service"
import { Global } from "../../global"
import { BlogPostService, ProfileService, ImageService } from "large-core"
import { BlogPost } from "large-core/dist/dto/blog-post"
import { UiService } from "../../services/ui-service"
import { PagingService, Page } from "../../services/page-service"
const moment = require('moment')


class AdminPostController {

  PAGE_LIMIT = 5

  constructor(
    private quillService: QuillService,
    private postService: BlogPostService,
    private uiService: UiService,
    private imageService: ImageService,
    private pagingService: PagingService
  ) {}



  async showIndex(offset:number=0, olderThan:string=undefined): Promise<ModelView> {

    return new ModelView( async () => {

      await this.postService.loadStoresForWallet(window['currentAccount'])

      let posts:BlogPost[] = await this.postService.getRecentPosts(offset, this.PAGE_LIMIT, olderThan)

      let translated = await this.translatePosts(posts)

      let pages:Page[] = this.pagingService.getPages(this.postService.count(), offset, this.PAGE_LIMIT)

      return {
        posts: translated,
        pages: pages
      }

    }, 'pages/admin/post/index.html')

  }




  async showCreate(): Promise<ModelView> {

    return new ModelView( async () => {

      await this.postService.loadStoresForWallet(window['currentAccount'])
      await this.postService.load(1) //gotta load at least 1

    }, 'pages/admin/post/create.html')

  }


  async postCreateSave(e) {
    try {

      //Get data
      var postData = await this._getPostData('#create-post-form')

      //Save
      await this.postService.create(postData)

      
      //Redirect
      this.uiService.navigate("/admin/post/")

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }

  async _getPostData(formId) {

    //Get data
    var postData = Global.app.form.convertToData(formId)

    //Get date
    postData.dateCreatedMilli = moment().utc().valueOf()

    //Get author info
    postData.owner = window['currentAccount']


    //Add main photo

    //Get story contents. Quill delta
    postData.content = this.quillService.activeEditor.getContents()


    return postData
  }



  initializeQuill() {
    this.quillService.buildQuillPostEditor('#create-post-textarea')
  }

  /**
   * Add image srcs for cover photo
   * @param posts 
   */
  private async translatePosts(posts:BlogPost[]) : Promise<BlogPost[]> {

    let translated:BlogPost[] = []

    for (let post of posts) {

      post = await this.postService.translatePost(post)

      let translatedPost: any = {}
      Object.assign(translatedPost, post)

      translatedPost.coverPhotoSrc = (post && post.coverPhotoCid) ? await this.imageService.cidToUrl(post.coverPhotoCid) : undefined
      translated.push(translatedPost)

    }
    return translated
  }


}






export { AdminPostController }
