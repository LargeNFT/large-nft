import { ModelView } from '../model-view'
import { PublicPostService } from "../services/public-post-service";
import { TemplateService } from "../services/template-service";
import { Dom7, Template7 } from "framework7";
import { Post } from '../dto/post';
import { Global } from '../global';
import { PostController } from './post-controller';

var $$ = Dom7;

class HomeController {

  loadingInProgress: boolean = false

  _messages: any
  _messagebar: any
  _postTemplate: any

  constructor(
    private publicPostService: PublicPostService,
    private templateService: TemplateService
  ) {

    const self = this;


    $$(document).on('click', '.send-link', function (e) {
      e.preventDefault()
      self.postMessage(e)
    });

    $$(document).on('click', 'a.toggle-sheet', function (e) {
      e.preventDefault()
      self.sheetToggle(e);
    });


  }

  async showHomePage(): Promise<ModelView> {

    return new ModelView({}, 'pages/home.html')

  }

  async loadMorePosts(): Promise<void> {

    let currentPosts = $$('#post-list').children('li').length

    let posts: Post[]
    let lastPost = null

    do {

      posts = await this.publicPostService.getRecentPosts({
        limit: 10,
        before: lastPost
      })


      this.loadPosts(posts, '#post-list')


      if (posts && posts.length > 0) {
        lastPost = posts[posts.length - 1]._id
      }

    } while (posts != null && posts.length > 0)


  }

  async postMessage(e:Event): Promise<void> {

    let value = this._messagebar.getValue()
    console.log(value)

    var text = value.replace(/\n/g, '<br>').trim()

    // return if empty message
    if (!text.length) return

    let post:Post = {
      owner: window['currentAccount'],
      title: undefined,
      subtitle: undefined,
      coverPhoto: undefined,
      dateCreated: undefined,
      content: undefined,
      contentTranslated: text
    }
    


    await this.publicPostService.create(post)



    // Clear area
    this._messagebar.clear()

    // Return focus to area
    this._messagebar.focus()
    

    // Add message to messages
    this._messages.addMessage({
      text: text,
    });

  }


  sheetToggle(e:Event) : void {
    this._messagebar.sheetToggle()
  }

  initMessages(): void {

    // Init Messages
    this._messages = Global.app.messages.create({
      el: '.messages',

      // First message rule
      firstMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if:
          - there is no previous message
          - or previous message type (send/received) is different
          - or previous message sender name is different
        */
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
      },
      // Last message rule
      lastMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if:
          - there is no next message
          - or next message type (send/received) is different
          - or next message sender name is different
        */
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
      // Last message rule
      tailMessageRule: function (message, previousMessage, nextMessage) {
        // Skip if title
        if (message.isTitle) return false;
        /* if (bascially same as lastMessageRule):
        - there is no next message
        - or next message type (send/received) is different
        - or next message sender name is different
      */
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      }
    })

    // Init Messagebar
    this._messagebar = Global.app.messagebar.create({
      el: '.messagebar'
    })

  }



  /**
   * Should probably move to a service that's view specific. Fine here for now.
   */
  loadPosts(posts: Post[], listSelector: string) {

    let postTemplate = this._getPostTemplate()

    for (let post of posts) {
      $$(listSelector).append(postTemplate(post))
    }

  }


  _getPostTemplate() {

    if (!this._postTemplate) {
      this._postTemplate = Template7.compile(
        `<div class="message message-received">
          <!-- Sender avatar -->
          <div class="message-avatar" style="background-image:url({{avatarUrl}})"></div>
          <div class="message-content">
            <!-- Sender name -->
            <div class="message-name">{{name}}</div>
            <!-- Bubble with text -->
            <div class="message-bubble">
              <div class="message-text">{{content}}</div>
            </div>
          </div>
        </div>`
      )
    }

    return this._postTemplate

  }


}

export { HomeController }
