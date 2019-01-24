let POST_REPO = 2;



class PostService {

  constructor(profileService) {
    this.profileService = profileService
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

    //Fetch authors
    for (const post of posts) {
      await this._postFetchAuthor(post)
    }

    return posts

  }

  async getPostCount() {
    return freedom.count(POST_REPO)
  }

  async createPost(post) {
    return freedom.create(POST_REPO, post)
  }

  async updatePost(post) {
    return freedom.update(POST_REPO, post.id, post)
  }

  async _postFetchAuthor(post) {
    if (post.authorId) {
      post.author = await this.profileService.getProfileById(post.authorId)
    }
  }

  _translatePost(post) {

    //Create content HTML
    const qdc = new window.QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {
    });

    //Render dividers into HTML
    qdc.renderCustomWith(function(customOp, contextOp) {
      if (customOp.insert.type === 'divider') {
        return "<hr />"
      }

      if (customOp.insert.type === 'ipfsimage') {
        return `<img src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}"  />`
      }
    })


    post.contentTranslated = qdc.convert();

    //Convert date
    post.dateCreated = new Date(post.dateCreated).toDateString()

    //TODO: Probably put max display lengths here somewhere. Since we can't really verify on the way in.


  }

}
