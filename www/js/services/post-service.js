let POST_REPO = 2;



class PostService {

  constructor(profileService) {
    this.profileService = profileService
  }

  async getPostById(id) {
    return freedom.read(POST_REPO, id)
  }

  async getPostsDescending(limit, offset) {
    let posts = await freedom.readListDescending(POST_REPO, limit, offset)


    //Fetch authors
    for (const post of posts) {
      if (post.authorId) {
        post.author = await this.profileService.getProfileById(post.authorId)
      }
    }

    return posts

  }

  async createPost(post) {
    return freedom.create(POST_REPO, post)
  }

  async updatePost(post) {
    return freedom.update(POST_REPO, post.id, post)
  }

}
