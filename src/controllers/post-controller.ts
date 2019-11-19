import { Global } from "../global";
import { Post, ProfileService, ImageService, ReadOnlyPostService, Profile } from "large-core";
import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { QuillService } from "../services/quill-service";
import { PostUIService } from "../services/post-ui-service";
import { ModelView } from "large-web";


var $$ = Dom7;

class PostController {

  _postTemplate: any
  loadedPost: Post

  constructor(
    private quillService: QuillService,
    private postUiService: PostUIService,
    private profileService: ProfileService,
    private imageService:ImageService
  ) {
    this._compilePostTemplate()
  }


  initializeQuill(cid: string) {
    let selector = `#create-reply-textarea-${cid}`
    this.quillService.buildQuillPostEditor(selector)
  }

  async showPost(cid: string): Promise<ModelView> {

    return new ModelView(async () => {

      this.loadedPost = await ReadOnlyPostService.read(cid)

      this.postUiService.translatePost(this.loadedPost)

      await this.postUiService.loadRepliesFeed(this.loadedPost.replies)


      let replies: Post[] = await this.postUiService.getRecentPosts(0, 100)


      //Show the edit button to the owner
      let currentUser: Profile = await this.profileService.getCurrentUser()

      let model = {
        currentAccount: window['currentAccount'],
        post: this.loadedPost,
        replies: replies,
        showEditLink: (currentUser && currentUser._id.toString() == this.loadedPost.owner.toString()),
        profilePicSrc: currentUser && currentUser.profilePic ? await this.imageService.cidToUrl(currentUser.profilePic) : undefined
      }

      return model

    }, 'pages/post/show.html')



  }


  
  async postReply(e: Event): Promise<void> {

    let content = this.quillService.activeEditor.getContents()
    let length = this.quillService.activeEditor.getLength()

    // return if empty message. quill length is 1 if it's empty
    if (length == 1) return

    let post: Post = await this.postUiService.postReply(this.loadedPost,content, window['currentAccount'])


    $$(`#replies-list-${this.loadedPost.cid}`).prepend(this._postTemplate(post))


    this.quillService.activeEditor.setText('')
    this.quillService.activeEditor.focus()

    await this.loadPostImages()

  }


  async loadPostImages() {
    return this.postUiService.loadPostImages()
  }


  _compilePostTemplate() {

    this._postTemplate = Template7.compile(
      `
            <li>
              <a href="/post/show/{{cid}}" class="item-link">
                <div class="item-content" id="post_{{cid}}">
                  <div class="item-media">
                    {{#if ownerProfilePicSrc}}
                      <img class="profile-pic-thumb" src="{{ownerProfilePicSrc}}">
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

export {
  PostController
}
