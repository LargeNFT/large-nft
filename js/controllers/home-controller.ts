import { ModelView } from '../model-view'
import {PublicPostService} from "../services/public-post-service";
import {TemplateService} from "../services/template-service";
import {Dom7} from "framework7";
import { Post } from '../dto/post';
import { Global } from '../global';

var $$ = Dom7;

class HomeController {

  loadingInProgress: boolean = false

  messages: any
  messagebar: any

  constructor(
    private postService: PublicPostService,
    private templateService: TemplateService
  ) {
  }

  async showHomePage(): Promise<ModelView> {

    await this.initMessages()

    return new ModelView({}, 'pages/home.html')

  }

  async loadMorePosts(): Promise<void> {

    let currentPosts = $$('#post-list').children('li').length

    let posts: Post[]
    let lastPost = null

    do {

      posts = await this.postService.getRecentPosts({
        limit: 10,
        before: lastPost
      })

    
      this.loadPosts(posts, '#post-list')


      if (posts && posts.length > 0) {
        lastPost = posts[posts.length-1]._id
      }

    } while(posts != null && posts.length > 0)


  }


  async initMessages() : Promise<void> {

      // Init Messages
      this.messages = Global.app.messages.create({
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
      this.messagebar = Global.app.messagebar.create({
        el: '.messagebar'
      })

  }

  /**
   * Should probably move to a service that's view specific. Fine here for now.
   */
  loadPosts(posts : Post[], listSelector: string) {

    let postTemplate = this.templateService.getPostTemplate()

    for (let post of posts) {
      $$(listSelector).append(postTemplate(post))
    }

    const currentPostCount = $$(listSelector).children('li').length


    if (currentPostCount > 0) {
      $$(listSelector).find('.no-results').remove()
    } else {
      $$(listSelector).find('.no-results').show()
    }

    // if (currentPostCount >= totalPostCount) {
    //   // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
    //   Global.app.infiniteScroll.destroy('.infinite-scroll-content')
    //   // Remove preloader
    //   $$('.infinite-scroll-preloader').remove()
    //   return
    // }

  }




}

export { HomeController }
