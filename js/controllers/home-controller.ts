import { ModelView } from '../model-view'
import { PublicPostService } from "../services/public-post-service";
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
const moment = require('moment')



var $$ = Dom7;

class HomeController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true
  postsShown: number = 0

  _messages: any
  
  _postTemplate: any

  quill: any

  limit: number = 3
  lastPost:string = null


  private postService:PublicPostService

  constructor(
    private quillService: QuillService,
    private uploadService: UploadService
  ) {
    this._compilePostTemplate()
  }

  initializeQuill() {
    this.quill = this.quillService.buildQuillPostEditor('#create-post-textarea')
  }


  async showHomePage(): Promise<ModelView> {

    return new ModelView( async () => {

      this.postService = await PublicPostService.getInstance(window['currentAccount'])

      let posts:Post[] = await this.getNextPage()

      return {
        currentAccount: window['currentAccount'],
        posts: posts
      }

    }, 'pages/home.html')

    

  }

  async getNextPage() : Promise<Post[]> {

    console.log(`getNextPage: ${this.limit} - ${this.lastPost}`)

    let posts:Post[] = await this.postService.getRecentPosts(this.limit, this.lastPost)

    if (posts.length > 0) {
      this.postsShown += posts.length
      this.lastPost = posts[posts.length -1]._id
    } else {
      this.hasMorePosts = false
    }

    //Are there more after this one?
    let count = await this.postService.count()
    if (count <= this.postsShown) {
      this.hasMorePosts = false
    }

    return posts

  }



  async postMessage(e: Event, component): Promise<void> {

    let content = this.quill.getContents()
    let length = this.quill.getLength()

    // return if empty message. quill length is 1 if it's empty
    if (length == 1) return

    let post:Post = await this.postService.postMessage(content, window['currentAccount'])

    

    $$("#post-list").prepend(this._postTemplate(post))


    this.quill.setText('')
    this.quill.focus()

  }


  async deletePost(e:Event) {

    let postService = await PublicPostService.getInstance(window['currentAccount'])

    //Grab the id off the link
    let deleteLink = $$(e.target).parent()
    let id = deleteLink.data('id')

    await postService.delete(id)

    $$('#post_' + id).remove()

  }

  boldClick(e) {
    const currentFormat = this.quill.getFormat()
    this.quill.format('bold', !currentFormat.bold)
  }

  italicClick(e) {
    const currentFormat = this.quill.getFormat()
    this.quill.format('italic', !currentFormat.italic)
  }

  linkClick(e) {
    let value = prompt('Enter link URL');
    this.quill.format('link', value)
  }

  blockquoteClick(e) {
    const currentFormat = this.quill.getFormat()
    this.quill.format('blockquote', !currentFormat.blockquote);
  }

  header1Click(e) {
    const currentFormat = this.quill.getFormat()
    this.quill.format('header', currentFormat.header ? undefined : 1);
  }

  header2Click(e) {
    const currentFormat = this.quill.getFormat()
    this.quill.format('header', currentFormat.header ? undefined : 2);
  }

  dividerClick(e) {

    let range = this.quill.getSelection(true)

    this.quill.insertText(range.index, '\n', Quill.sources.USER)

    this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER)

    this.quill.setSelection(range.index + 2, Quill.sources.SILENT)

  }

  imageClick(e) {

    const imageButtonInput = $$(".image-button-input");
    imageButtonInput.click()

  }

  //TODO: move to service
  async imageSelected(fileElement: Element): Promise<void> {

    let imageCid = await this.uploadService.uploadFile(fileElement)


    let range = this.quill.getSelection(true)

    this.quill.insertText(range.index, '\n', Quill.sources.USER)

    this.quill.insertEmbed(range.index, 'ipfsimage', { ipfsCid: imageCid }, Quill.sources.USER)

    this.quill.setSelection(range.index + 2, Quill.sources.SILENT)


  }


  _compilePostTemplate() {

    this._postTemplate = Template7.compile(
      `
        <li>
          <div class="item-content" id="post_{{_id}}">
            <div class="item-media">
              <img src="{{js "window.ipfsGateway"}}/{{ownerProfilePic}}">
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
        </li>
      `
    )
    

  }




}

export { HomeController }
