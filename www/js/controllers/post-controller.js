

class PostController {


    constructor(postService, profileService) {
        const self = this;

        self.postService = postService;
        self.profileService = profileService;

        $$(document).on('submit', '#edit-post-form', self.postEditSave);
        $$(document).on('submit', '#create-post-form', self.postCreateSave);
    }

    async showPost(id) {

        let post = await this.postService.getPostById(id)

        return new ModelView(post, 'pages/post/static.html')

    }

    async showPostList() {

        let posts = await this.postService.getPostsDescending(10, 0)
        console.log(posts)

        let model = {
          posts: posts
        }

        return new ModelView(model, 'pages/post/list.html')

    }


    async showPostEdit(id) {

        let post = await this.postService.getPostById(id)

        return new ModelView(post, 'pages/post/edit.html')

    }

    async postEditSave(e) {

        e.preventDefault();
        
        //Get data
        var postData = app.form.convertToData('#edit-post-form');

        //Save
        await postService.updatePost(postData)

        //Redirect
        app.methods.navigate("/post/show/" + postData.id);
    }


    async postCreateSave(e) {
        
        e.preventDefault();
        
        //Get data
        var postData = app.form.convertToData('#create-post-form');


        //Get date
        postData.dateCreated = new Date().toJSON().toString()


        //Get author info
        let author = await profileService.getCurrentUser()
        postData.authorId = author.id

        //Add main photo


        //Save
        let result = await postService.createPost(postData)

        console.log(result)
        
        //Redirect
        app.methods.navigate("/post/show/" + result.id);
    }

}
