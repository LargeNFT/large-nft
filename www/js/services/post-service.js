let POST_REPO = 2;



class PostService {

  async getPostById(id) {
    return freedom.read(POST_REPO, id)
  }

  async getPostsDescending(limit, offset) {
    return freedom.readListDescending(POST_REPO, limit, offset)
  }

}
