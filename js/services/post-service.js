let POST_REPO = 2;

var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

class PostService {

  constructor(profileService, templateService) {
    this.profileService = profileService
    this.templateService = templateService
  }

  async getPostById(id) {
    const post = await freedom.read(POST_REPO, id)

    //Fetch author
    await this._postFetchAuthor(post)

    //Convert content to HTML
    this._translatePost(post)

    return post

  }

  async getPostsDescending(limit, offset) {
    let posts = await freedom.readListDescending(POST_REPO, limit, offset)
    await this._lazyLoadPosts(posts)

    return posts

  }


  async getPostsByOwner(owner, limit, offset) {

    let posts = await freedom.readOwnedListDescending(POST_REPO, owner, limit, offset )

    await this._lazyLoadPosts(posts)

    return posts

  }


  async getPostCount() {
    return freedom.count(POST_REPO)
  }

  async getPostByOwnerCount(owner) {
    return freedom.countOwned(POST_REPO, owner)
  }

  async createPost(post) {
    return freedom.create(POST_REPO, post)
  }

  async updatePost(post) {
    return freedom.update(POST_REPO, post.id, post)
  }

  async _lazyLoadPosts(posts) {
    //Fetch authors
    for (const post of posts) {
      await this._postFetchAuthor(post)
    }
  }


  async _postFetchAuthor(post) {
    if (post.authorId) {
      post.author = await this.profileService.getProfileById(post.authorId)
    }
  }


  getImagesFromPostContentOps(ops) {

    const images = []

    for (let op of ops) {
      if (op.insert && op.insert.ipfsimage) {
        images.push(op.insert.ipfsimage.ipfsCid)
      }
    }

    return images

  }


  /**
   * Should probably move to a service that's view specific. Fine here for now.
   */
  loadMorePosts(posts, totalPostCount, listSelector) {

    let postTemplate = this.templateService.getPostTemplate()

    for (let post of posts) {
      $$(listSelector).append(postTemplate(post))
    }

    const currentPostCount = $$(listSelector).children('li').length


    if (currentPostCount > 0) {
      $$(listSelector).find('.no-results').remove()
    }

    if (currentPostCount >= totalPostCount) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      app.infiniteScroll.destroy('.infinite-scroll-content')
      // Remove preloader
      $$('.infinite-scroll-preloader').remove()
      return
    }





  }



  _translatePost(post) {

    //Create content HTML
    const qdc = new QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {
    });

    //Render dividers into HTML
    qdc.renderCustomWith(function(customOp, contextOp) {
      if (customOp.insert.type === 'divider') {
        return "<hr />"
      }

      if (customOp.insert.type === 'ipfsimage') {
        return `<img src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}"  />`
      }

      if (customOp.insert.type === 'ipfsvideo') {
        return `
            <video width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}">
              <source src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" type="video/mp4">
            </video>
          `
      }

    })


    post.contentTranslated = qdc.convert();

    //Convert date
    post.dateCreated = new Date(post.dateCreated).toDateString()

    //TODO: Probably put max display lengths here somewhere. Since we can't really verify on the way in.


  }

}


module.exports = PostService

