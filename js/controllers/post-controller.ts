import { ModelView } from "../model-view";
import { PublicPostService } from "../services/public-post-service";
import { ProfileService } from "../services/profile-service";
import { Profile } from "../dto/profile";
import { Post } from "../dto/post";
import { SchemaService } from "../services/util/schema-service";
import { QuillService } from "../services/util/quill-service";
import { Dom7, Template7 } from "framework7";
import { Global } from "../global";
import { PostUIService } from "../services/post-ui-service";


var $$ = Dom7;

class PostController {

  _postTemplate: any
  loadedPost: Post

  constructor(
    private quillService: QuillService,
    private postUiService: PostUIService,
    private profileService: ProfileService
  ) {
    this._compilePostTemplate()
  }


  initializeQuill(cid: string) {
    let selector = `#create-reply-textarea-${cid}`
    this.quillService.buildQuillPostEditor(selector)
  }


  async showPost(cid: string): Promise<ModelView> {

    return new ModelView(async () => {

      this.loadedPost = await PublicPostService.read(cid)
      this.postUiService.translatePost(this.loadedPost)


      await this.postUiService.loadRepliesFeed(this.loadedPost.replies)

      


      let replies: Post[] = await this.postUiService.getRecentPosts(100)


      //Show the edit button to the owner
      let currentUser: Profile = await this.profileService.getCurrentUser()

      let model = {
        currentAccount: window['currentAccount'],
        post: this.loadedPost,
        replies: replies,
        showEditLink: (currentUser && currentUser._id.toString() == this.loadedPost.owner.toString()),
        profilePic: currentUser ? currentUser.profilePic : undefined
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

export {
  PostController
}
