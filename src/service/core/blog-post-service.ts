import { PostService } from "./post-service"
import { BlogPost } from "../../dto/blog-post"
import { inject, injectable } from "inversify"


@injectable()
class BlogPostService {

  public loadedWalletAddress:string 
  public blogPostStore: any
  
  public pagingOptions: any

  constructor(
    private postService:PostService,
  ) { }


  async getPosts(limit: number, offset:number, startKey:string=undefined, endKey:string=undefined): Promise<BlogPost[]> {

    let pagingOptions = {
      limit: limit,
      skip: offset,
      startKey: startKey,
      endKey: endKey,
      include_docs: true,
      descending: true
    }

    let response = await this.blogPostStore.db.allDocs(pagingOptions)
    
    let promises = response.rows.map( async v => {
      return await this.postService.translatePost(v.doc)
    })


    let posts:BlogPost[] = []

    for (let promise of promises) {
      posts.push(await promise)
    }

    
    return posts 

  }

  async put(post: BlogPost): Promise<BlogPost> {

    let key:string

    if (post._id) {
      key = post._id
    } else {
      key = new Date().toJSON()
    }

    await this.blogPostStore.put(key, post)

    return this.get(key)

  }

  async get(key:string): Promise<BlogPost> {
    let post = await this.blogPostStore.get(key)
    return this.postService.translatePost(post)
  }

  async delete(key:string): Promise<void> {
    await this.blogPostStore.del(key)
  }

}


export {
  BlogPostService
}
