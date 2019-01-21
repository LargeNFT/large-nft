

class PostController {

    constructor(postService, profileService) {
        const self = this;

        self.postService = postService;
        self.profileService = profileService;


        $$(document).on('submit', '#edit-post-form', function(e) {
          self.postEditSave(e)
        });

        $$(document).on('submit', '#create-post-form', function(e) {
          self.postCreateSave(e)
        });
    }

    async showCreatePost() {

      return new ModelView({},  'pages/post/create.html')

    }

    async showPost(id) {

        let post = await this.postService.getPostById(id)

        //Show the edit button to the owner
        let currentUser;

        try {
          currentUser = await profileService.getCurrentUser()
        } catch(ex) {
          console.log("Profile doesn't exist");
        }


        let model = {
          post: post,
          showEditLink: (currentUser && currentUser.id == post.authorId)
        }

        return new ModelView(model, 'pages/post/show.html')

    }


    async showEditPost(id) {

      let post = await this.postService.getPostById(id)

      console.log('here')

      return new ModelView(post, 'pages/post/edit.html')

    }


    async showPostList() {

        let posts = await this.postService.getPostsDescending(10, 0)

        let model = {
          posts: posts
        }

        return new ModelView(model, 'pages/post/list.html')

    }


    async showPostEdit(id) {

        let post = await this.postService.getPostById(id)

        let model = {
          post: post
        }

        return new ModelView(model, 'pages/post/edit.html')

    }

    async postEditSave(e) {

        e.preventDefault();
        
        //Get data
        var postData = await this._getPostData('#edit-post-form')

        console.log(postData)

        //Save
        await postService.updatePost(postData)

        //Redirect
        app.methods.navigate("/post/show/" + postData.id);
    }


    async postCreateSave(e) {
        
        e.preventDefault();
        
        //Get data
        var postData = await this._getPostData('#create-post-form')


        //Save
        let result = await postService.createPost(postData)

        //Redirect
        app.methods.navigate("/post/show/" + result.id);
    }



    async _getPostData(formId) {

      //Get data
      var postData = app.form.convertToData(formId);

      //Get date
      postData.dateCreated = new Date().toJSON().toString()

      //Get author info
      let author = await profileService.getCurrentUser()
      postData.authorId = author.id

      //Add main photo

      //Get story contents. Quill delta
      postData.content = this.quill.getContents()


      return postData
    }



}
