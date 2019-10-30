import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import Web, { ModelView } from 'large-web'
import { QuillService } from "../../services/quill-service"
import { Global } from "../../global"
import { BlogPostService, ProfileService, ImageService } from "large-core"
import { BlogPost } from "large-core/dist/dto/blog-post"
import { UiService } from "../../services/ui-service"
import { PagingService, Page } from "../../services/page-service"
const moment = require('moment')
var $$ = Dom7


class AdminPostController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true

  limit: number = 10
  postsShown: number 
  lastPost: string 
  
  virtualList: any 

  constructor(
    private quillService: QuillService,
    private postService: BlogPostService,
    private uiService: UiService,
    private imageService: ImageService
  ) {}


  async showIndex(pageNum:number=1, olderThan:string=undefined): Promise<ModelView> {

    return new ModelView( async () => {

      await this.reset()
    
      console.log("show index")

    }, 'pages/admin/post/index.html')

  }

  async getNextPage() : Promise<BlogPost[]> {

    let posts:BlogPost[] = []

    try {
      await this.postService.loadStoresForWallet(window['currentAccount'])
      posts = await this.postService.getRecentPosts(this.postsShown, this.limit, this.lastPost )
    } catch(ex) {
      console.log(ex)
    }

    let translated: BlogPost[] = await this.translatePosts(posts)

    if (translated && translated.length > 0) {
      this.postsShown += translated.length
      this.lastPost = translated[translated.length -1].feedCid
    }

    if (translated.length < this.limit) {
      this.hasMorePosts = false
    }

    return translated

  }


  async showCreate(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/post/create.html')

  }


  async postCreateSave(e) {
    try {

      //Get data
      var postData = await this._getPostData('#create-post-form')

      //Save
      await this.postService.loadStoresForWallet(window['currentAccount'])
      await this.postService.load(1) //gotta load at least 1
      await this.postService.create(postData)
      
      //Redirect
      this.uiService.navigate("/admin/post/", false, false)

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


  async reset() {
    this.postsShown = 0
    this.lastPost = undefined
    this.hasMorePosts = true
    this.loadingInProgress = false
  }


  async infiniteScrollListener(component) {

    // Exit, if loading in progress
    if (this.loadingInProgress || !this.hasMorePosts) return

    // Set loading flag
    this.loadingInProgress = true

    let posts = await this.getNextPage()

    console.log(posts)
    console.log(this.virtualList)
    this.virtualList.appendItems(posts)
    console.log(this.virtualList)


    if (!this.hasMorePosts) {
      this.unloadInfiniteScroll()
    }

    this.loadingInProgress = false
  }


  unloadInfiniteScroll() {

    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
    window['Global'].app.infiniteScroll.destroy('.infinite-scroll-content')

    // Remove preloader
    $$('.infinite-scroll-preloader').hide()
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
