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


  _messages: any
  
  _postTemplate: any


  private postService:PublicPostService

  constructor(
    private quillService: QuillService,
    private uploadService: UploadService
  ) {
    this._compilePostTemplate()
  }

  initializeQuill() {
    this.quillService.buildQuillPostEditor('#create-post-textarea')
  }


  async showHomePage(): Promise<ModelView> {

    return new ModelView( async () => {

      this.postService = await PublicPostService.getInstance(window['currentAccount'])

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

    

    $$("#post-list").prepend(this._postTemplate(post))


    this.quillService.activeEditor.setText('')
    this.quillService.activeEditor.focus()

  }


  async deletePost(e:Event) {

    let postService = await PublicPostService.getInstance(window['currentAccount'])

    //Grab the id off the link
    let deleteLink = $$(e.target).parent()
    let id = deleteLink.data('id')

    await postService.delete(id)

    $$('#post_' + id).remove()

  }



  _compilePostTemplate() {

    this._postTemplate = Template7.compile(
      `
        <li>
          <a href="/post/show/{{cid}}" class="item-link">
            <div class="item-content" id="post_{{cid}}">
              <div class="item-media">
                {{#if ownerProfilePic}}
                  <img class="profile-pic-thumb" src="{{js "window.ipfsGateway"}}/{{ownerProfilePic}}">
                {{else}}
                  <i class="f7-icons profile-pic-thumb">person</i>
                {{/if}}
              </div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title"><span class="post-owner-display">{{ownerDisplayName}}</span>
                    <div class="post-owner">{{owner}}</div>
                  </div>
                  <div class="item-after">
                    {{dateCreated}}
                  </div>
                </div>
                <div class="item-subtitle">{{contentTranslated}}</div>
              </div>
            </div>
          </a>
        </li>
      `
    )
    

  }


}

export { HomeController }
