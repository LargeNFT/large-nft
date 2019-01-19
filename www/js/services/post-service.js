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
    const qdc = new window.QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {});
    post.content = qdc.convert();

    //Convert date
    post.dateCreated = new Date(post.dateCreated).toDateString()

  }

}
