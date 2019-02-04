import { ModelView } from '../model-view'
import {PostService} from "../services/post-service";
import {TemplateService} from "../services/template-service";
import {Dom7} from "framework7";

var $$ = Dom7;

class HomeController {

    loadingInProgress: boolean = false

    constructor(private postService: PostService, private templateService: TemplateService) {

      const self = this


      $$(document).on('infinite', '#home-page-infinite-scroll', async function(e) {

        // Exit, if loading in progress
        if (self.loadingInProgress) return;

        self.loadingInProgress = true

        await self.loadMorePosts()

        self.loadingInProgress = false

      })

    }

    async showHomePage(): Promise<ModelView> {

      return new ModelView({}, 'pages/home.html')

    }

    async loadMorePosts(): Promise<void> {

      let currentPosts = $$('#post-list').children('li').length

      this.postService.loadMorePosts(
        await this.postService.getPostsDescending(10, currentPosts),
        await this.postService.getPostCount(),
        '#post-list'
      )

    }

}

export { HomeController }
