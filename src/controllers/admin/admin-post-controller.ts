import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import Web, { ModelView, ModelViewService } from 'large-web'
import { QuillService } from "../../services/quill-service"
import { Global } from "../../global"
import { BlogPostService, ProfileService, ImageService, Profile, Post } from "large-core"
import { BlogPost } from "large-core/dist/dto/blog-post"
import { UiService } from "large-web"
import { PagingService, Page } from "../../services/page-service"
import { PostUIService } from "../../services/post-ui-service"
const moment = require('moment')
var $$ = Dom7


class AdminPostController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true

  limit: number = 30
  postsShown: number 
  lastPost: string 
  
  virtualList: any 

  constructor(
    private quillService: QuillService,
    private postService: BlogPostService,
    private uiService: UiService,
    private imageService: ImageService,
    private profileService:ProfileService,
    private postUiService:PostUIService
  ) {}


  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {

      await this.reset()    

      await this.postService.loadStoresForWallet(window['currentAccount'])

      
    }, 'pages/admin/post/index.html')

  }

  async getNextPage() : Promise<BlogPost[]> {
    let posts:BlogPost[] = []

    if (!this.postService.feedStore) return posts

    try {
      posts = await this.postService.getRecentPosts(this.postsShown, this.limit, this.lastPost )
    } catch(ex) {
      console.log(ex)
    }

    let translated: BlogPost[] = await this.translatePosts(posts)

    if (translated && translated.length > 0) {
      this.postsShown += translated.length
      this.lastPost = translated[translated.length -1].feedCid
    } else {
      this.hasMorePosts = false
    }

    return translated

  }

  
  

  async showCreate(): Promise<ModelView> {
    return new ModelView( async () => {
    }, 'pages/admin/post/create.html')

  }

  async showPost(permalinkKey:string) : Promise<ModelView> {
    
    return new ModelView( async () => {

      await this.postService.loadStoresForWallet(window['currentAccount'])

      let post:BlogPost = await this.postService.readPermalink(permalinkKey)

      post = await this.postService.translatePost(post)

      //Look up profile of author
      let profile:Profile = await this.profileService.getProfileByWallet(post.owner)

      return {
        post: post,
        authorName: profile && profile.name ? profile.name : post.owner,
        profilePicSrc: (profile && profile.profilePic) ? await this.imageService.cidToUrl(profile.profilePic) : undefined,
      }

    }, 'pages/admin/post/show.html')

  }



  async showEdit(permalinkKey:string) : Promise<ModelView> {
    
    return new ModelView( async () => {

      await this.postService.loadStoresForWallet(window['currentAccount'])

      //Get post
      let post:BlogPost = await this.postService.readPermalink(permalinkKey)
      post = await this.postService.translatePost(post)

      //Fill out form
      Global.app.form.fillFromData('#edit-post-form', post)

      //Initialize contents
      this.initializeQuill("#edit-post-textarea")
      this.quillService.activeEditor.setContents(post.content)

      await this.quillService.loadCoverPhotos()

    }, 'pages/admin/post/edit.html')

  }



  async postCreateSave(e) {
    try {

      //Get data
      let postData = await this._getPostData('#create-post-form')

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


  async postEditSave(e) {
    try {

      //Get data
      let postData = await this._getPostData('#edit-post-form')

      //Save
      await this.postService.loadStoresForWallet(window['currentAccount'])
      await this.postService.load(1) //gotta load at least 1
      await this.postService.update(postData)
      
      //Redirect
      this.uiService.navigate(`/admin/post/show/${postData.permalinkKey}`, false, false)

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }


  async postDeleteClick(e:Event) {

    try {

      let self = this

      let postId = $$(e.target).data('id')
      if (!postId) return 
  
      Global.app.dialog.confirm(
        "Do you want to delete this post? Note: This does not guarantee deletion from other peers. This data may still exist on the internet somewhere.",
        async function() {

          let post:Post = await self.postService.readPermalink(postId)
  
          await self.postService.delete(post)
      
          //Redirect
          self.uiService.navigate(`/admin/post`, false, false)

        }
      
      )




    } catch(ex) {
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

    //Get story contents. Quill delta
    postData.content = this.quillService.activeEditor.getContents()


    return postData
  }

  initializeQuill(selector) {
    this.quillService.buildQuillPostEditor(selector)
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

    let posts:BlogPost[] = await this.getNextPage()

    this.virtualList.appendItems(posts)

    if (!this.hasMorePosts) {
      this.unloadInfiniteScroll()
    }

    this.loadingInProgress = false
  }


  unloadInfiniteScroll() {

    console.log("Unload infinite scroll")

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
