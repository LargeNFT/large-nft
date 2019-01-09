

class PostController {

    constructor() {
        const self = this;
        $$(document).on('submit', '#edit-post-form', self.postEditSave);
        $$(document).on('submit', '#create-post-form', self.postCreateSave);
    }

    async showPost(resolve, id) {
        let post;

        try {
            post = await freedom.read(POST_REPO, id)
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
            posts = await freedom.readList(POST_REPO, 10, 0)
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
            post = await freedom.read(POST_REPO, 0);
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

        //Save
        let result = await freedom.create(POST_REPO, postData);

        console.log(result)
        
        //Redirect
        app.methods.navigate("/post/show/" + result.id);
    }

}