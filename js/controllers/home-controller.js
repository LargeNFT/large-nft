const ModelView = require('../model-view.js')

class HomeController {

    constructor(postService, templateService) {

      const self = this

      this.postService = postService
      this.templateService = templateService


      $$(document).on('infinite', '#home-page-infinite-scroll', async function(e) {
        // Exit, if loading in progress
        if (self.loadingInProgress) return;

        self.loadingInProgress = true

        await self.loadMorePosts()

        self.loadingInProgress = false

      })

    }

    async showHomePage() {

      return new ModelView({}, 'pages/home.html')

    }

    async loadMorePosts() {

      let currentPosts = $$('#post-list').children('li').length

      this.postService.loadMorePosts(
        await this.postService.getPostsDescending(10, currentPosts),
        await this.postService.getPostCount(),
        '#post-list'
      )

    }

}


module.exports = HomeController
