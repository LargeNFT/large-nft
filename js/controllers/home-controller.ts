import { ModelView } from '../model-view'
import { PublicPostService } from "../services/public-post-service"

// console.log(PublicPostService)



import { TemplateService } from "../services/template-service";
import { Dom7, Template7 } from "framework7";
import { Post } from '../dto/post';
import { Global } from '../global';
import { QuillService } from '../services/util/quill-service';
import { UploadService } from '../services/util/upload-service';
import Quill = require('quill/dist/quill.js')
import { ProfileService } from '../services/profile-service';
import { Profile } from '../dto/profile';
import { SchemaService } from '../services/util/schema-service';
import ColorPickerComponent from 'framework7/components/color-picker/color-picker';
const moment = require('moment')
import { timeout } from '../timeout-promise'



var $$ = Dom7;

class HomeController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true

  postsShown: number = 0
  
  limit: number = 5
  lastPost:string = null


  constructor(
    private quillService: QuillService,
    private postService:PublicPostService
  ) {
  }

  initializeQuill() {
    this.quillService.buildQuillPostEditor('#create-post-textarea')
  }


  async showHomePage(): Promise<ModelView> {

    return new ModelView( async () => {

      this.postsShown = 0
      this.lastPost = null
      this.hasMorePosts = true

      let currentUser:Profile

      try {
        currentUser =  await ProfileService.getCurrentUser()
      } catch(ex) {
        console.log(ex)
      }


      return {
        currentAccount: window['currentAccount'],
        profilePic: currentUser ? currentUser.profilePic : undefined
      }

    }, 'pages/home.html')

    

  }

  async getNextPage() : Promise<Post[]> {

    let posts:Post[] = []

    try {
      posts = await this.postService.getRecentPosts(this.postsShown, this.limit, this.lastPost)
    } catch(ex) {
      console.log(ex)
    }

    
    if (posts.length == this.limit) {
      this.postsShown += posts.length
      this.lastPost = posts[posts.length -1].feedCid
    } else {
      this.hasMorePosts = false
    }

    return posts

  }



  async postMessage(e: Event): Promise<void> {

    let content = this.quillService.activeEditor.getContents()
    let length = this.quillService.activeEditor.getLength()

    // return if empty message. quill length is 1 if it's empty
    if (length == 1) return

    let post:Post = await this.postService.postMessage(content, window['currentAccount'])


    $$("#post-list").prepend(Global.postResultTemplate(post))


    this.quillService.activeEditor.setText('')
    this.quillService.activeEditor.focus()

  }


  async deletePost(e:Event) {

    //Grab the id off the link
    let deleteLink = $$(e.target).parent()
    let id = deleteLink.data('id')

    await this.postService.delete(id)

    $$('#post_' + id).remove()

  }




}

export { HomeController }
