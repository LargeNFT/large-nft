

class PostController {


    constructor(postService, profileService) {
        const self = this;

        self.postService = postService;
        self.profileService = profileService;

        $$(document).on('submit', '#edit-post-form', self.postEditSave);
        $$(document).on('submit', '#create-post-form', self.postCreateSave);
    }

    async showPost(resolve, id) {
        let post;

        try {
            post = await this.postService.getPostById(id)
        } catch(ex) {
            console.log(ex)
        }

        resolve({
            componentUrl: 'pages/post/static.html'
        },
        {
            context: post
        })
    }

    async showPostList(resolve) {

        let posts;

        try {
            posts = await this.postService.getPostsDescending(10, 0)
        } catch(ex) {

        }

        resolve({
            componentUrl: 'pages/post/list.html'
        },
        {
            context: {
                posts: posts
            }
        })
    }


    async showPostEdit(resolve, id) {

        let post;

        try {
            post = await this.postService.getPostById(id)
        } catch(ex) {
            console.log(ex);
        }

        resolve({
            componentUrl: 'pages/post/edit.html'
        },
        {
            context: post
        })

    }

    async postEditSave(e) {

        e.preventDefault();
        
        //Get data
        var postData = app.form.convertToData('#edit-post-form');

        //Save
        await freedom.update(POST_REPO, postData.id, postData);
        
        //Redirect
        app.methods.navigate("/post/show/" + postData.id);
    }


    async postCreateSave(e) {
        
        e.preventDefault();
        
        //Get data
        var postData = app.form.convertToData('#create-post-form');


        //Add date
        postData.dateCreated = JSON.stringify({'now': new Date()})

        //Add author

        //Add main photo

        //Add excerpt

        //Save
        let result = await freedom.create(POST_REPO, postData);

        console.log(result)
        
        //Redirect
        app.methods.navigate("/post/show/" + result.id);
    }

}
