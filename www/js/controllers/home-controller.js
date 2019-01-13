class HomeController {

    constructor(postService) {
      this.postService = postService;
    }

    async showHomePage() {

      let posts = await this.postService.getPostsDescending(10, 0)

      let model = {
        posts: posts
      }


      return new ModelView(model, 'pages/home.html')

    }
}
