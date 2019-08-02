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
const moment = require('moment')



var $$ = Dom7;

class HomeController {

  loadingInProgress: boolean = false

  _messages: any
  _postTemplate: any

  quill: any

  constructor(
    private publicPostService: PublicPostService,
    private profileService: ProfileService,
    private templateService: TemplateService,
    private quillService: QuillService,
    private uploadService: UploadService
  ) {

    const self = this;


    $$(document).on('click', '.send-link', function (e) {
      e.preventDefault()
      self.postMessage(e)
    })

    $$(document).on('click', '.delete-post', function (e) {
      e.preventDefault()
      self.deletePost(e)
    })


    $$(document).on('click', '.bold-button', function (e) {
      e.preventDefault()
      self.boldClick(e)
    })

    $$(document).on('click', '.italic-button', function (e) {
      e.preventDefault()
      self.italicClick(e)
    })

    $$(document).on('click', '.link-button', function (e) {
      e.preventDefault()
      self.linkClick(e)
    })

    $$(document).on('click', '.blockquote-button', function (e) {
      e.preventDefault()
      self.blockquoteClick(e)
    })

    $$(document).on('click', '.header-1-button', function (e) {
      e.preventDefault()
      self.header1Click(e)
    })

    $$(document).on('click', '.header-2-button', function (e) {
      e.preventDefault()
      self.header2Click(e)
    })

    $$(document).on('click', '.divider-button', function (e) {
      e.preventDefault()
      self.dividerClick(e)
    })

    $$(document).on('click', '.image-button', function (e) {
      e.preventDefault()
      self.imageClick(e)
    })

    $$(document).on('change', '.image-button-input', async function (e) {
      e.preventDefault()
      await self.imageSelected(this)
    })

  }

  initializeQuill() {
    this.quill = this.quillService.buildQuillPostEditor('#create-post-textarea')
  }


  async showHomePage(): Promise<ModelView> {

    return new ModelView({}, 'pages/home.html')

  }

  async loadMorePosts(): Promise<void> {

    let limit: number = 100

    let posts: Post[]
    let lastPost = null


    posts = await this.publicPostService.getRecentPosts({
      limit: limit,
      before: lastPost
    })

    for (let post of posts) {
      this._addPost(post)
    }

  }

  async postMessage(e: Event): Promise<void> {

    let content = this.quill.getContents()
    let length = this.quill.getLength()


    // return if empty message. quill length is 1 if it's empty
    if (length == 1) return


    let dateString: string = moment().format().toString()
 

    let profile: Profile = await this.profileService.getCurrentUser()

    let post: Post = {
      owner: window['currentAccount'],
      ownerDisplayName: (profile && profile.name) ? profile.name : window['currentAccount'],
      dateCreated: dateString,
      content: content
    }

    //Set user avatar
    if (profile && profile.profilePic) {
      post.ownerProfilePic = profile.profilePic
    }


    await this.publicPostService.create(post)


    // Add message to messages
    this._addPost(post)

    this.quill.setText('')
    this.quill.focus()


  }


  _addPost(post: Post) {

    let message: any = {
      _id: post._id,
      content: post.contentTranslated
    }

    if (post.ownerDisplayName != post.owner) {
      message.ownerDisplayName = post.ownerDisplayName
      message.owner = post.owner
    } else {
      message.ownerDisplayName = post.owner
    }


    if (post.ownerProfilePic) {
      message.profilePic = `${Global.ipfsGateway}/${post.ownerProfilePic}`
    }
    
    message.dateCreated = moment(post.dateCreated).fromNow() 

    if (post.owner == window["currentAccount"]) {
      message.showDelete = true
    }

    

    let postTemplate = this._getPostTemplate()
    let postHtml = postTemplate(message)


    $$('#post-list').prepend(postHtml)

  }

  async deletePost(e:Event) {

    //Grab the id off the link
    let deleteLink = $$(e.target).parent()
    let id = deleteLink.data('id')

    await this.publicPostService.delete(id)

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


  _getPostTemplate() {

    if (!this._postTemplate) {

      this._postTemplate = Template7.compile(
        `
        <li>
          <div class="item-content" id="post_{{_id}}">
            <div class="item-media">
              <img src="{{profilePic}}">
            </div>
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title"><span class="post-owner-display">{{ownerDisplayName}}</span> <div class="post-owner">{{owner}}</div></div>
                <div class="item-after">
      
                  {{dateCreated}}

                  {{#if showDelete}}
                    <a class="link delete-post" href="#" data-id="{{_id}}" >
                      <i class="icon f7-icons if-not-md">delete</i>
                      <i class="icon material-icons md-only">delete</i>
                    </a>
                  {{/if}}
                
                </div>
              </div>
              <div class="item-subtitle">{{content}}</div>
            </div>
          </div>
        </li>
        `
      )
    }

    return this._postTemplate

  }




}

export { HomeController }
