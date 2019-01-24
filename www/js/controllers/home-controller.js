class HomeController {

    constructor(postService) {

      const self = this

      this.postService = postService


      $$(document).on('infinite', '.infinite-scroll-content', function(e) {
        self.loadMorePosts()
      })

    }

    async showHomePage() {

      return new ModelView({}, 'pages/home.html')

    }

    async loadMorePosts() {

      //Set up post template
      self.postTemplate = this.getPostTemplate()

      let currentPosts = $$('#post-list').children('li').length
      const totalPosts = await this.postService.getPostCount()

      console.log(`Fetching posts at offset: ${currentPosts}. Total posts: ${totalPosts}`)
      let posts = await this.postService.getPostsDescending(25, currentPosts)

      for (let post of posts) {
        $$('#post-list').append(self.postTemplate(post))
      }


      currentPosts = $$('#post-list').children('li').length
      if (currentPosts >= totalPosts) {
        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
        app.infiniteScroll.destroy('.infinite-scroll-content');
        // Remove preloader
        $$('.infinite-scroll-preloader').remove();
        return;
      }

    }

    getPostTemplate() {
      if (!self.postTemplate) {
        self.postTemplate = Template7.compile(this.getPostTemplateText())
      }

      return self.postTemplate
    }

    getPostTemplateText() {
      return `
       <li>
       
       
          <a href="/post/show/{{id}}" class="item-link item-content">
            <div class="item-media">
              {{#if coverPhoto}}
              <img src="{{@global.ipfsGateway}}/{{coverPhoto}}" class="cover-photo-thumbnail" />
              {{else}}
              <i class="f7-icons">document_text</i>
              {{/if}}
            </div>
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title">{{title}}</div>
              </div>
              
              {{#if subtitle}}
              <div class="item-subtitle">{{subtitle}}</div>
              {{/if}}
              
              {{#if author}}
              <div class="item-author">
              
                {{author.name}} 
                                
              </div>
              {{/if}} 
              
              {{#if dateCreated}}
                <div class="item-date">
                  {{shortDate dateCreated}}
                </div>
              {{/if}} 
              
            </div>
          </a>
       

      </li>
      `
    }

}
