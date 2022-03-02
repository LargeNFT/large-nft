import { Post } from "../../dto/post"
import { SchemaService } from "./schema-service"
import { PostService } from "./post-service"
import { inject, injectable } from "inversify"
import { OrbitService } from "./orbit-service"


@injectable()
class ReadOnlyPostService {


  public feedStore: any
  

  constructor(
    private schemaService: SchemaService,
    private postService: PostService,
    private orbitService:OrbitService
  ) { }


  async loadPostFeedForWallet(walletAddress: string) {
    let postFeed = await this.schemaService.getReadOnlyPostFeedByWalletAddress(walletAddress)
    this.feedStore = postFeed
    this.feedStore.load()
  }

  async loadMainFeedForWallet(walletAddress: string) {
    let mainFeed = await this.schemaService.getMainFeedByWalletAddress(walletAddress)
    this.feedStore = mainFeed
    this.feedStore.load()

  }

  async loadRepliesFeed(feedAddress: string) {
    let repliesFeed = await this.orbitService.orbitDb.open(feedAddress)
    this.feedStore = repliesFeed
    
    return this.feedStore.load()
  }

  
  async getPosts(limit: number, offset:number, startKey:string=undefined, endKey:string=undefined): Promise<any> {

    let pagingOptions = {
      limit: limit,
      skip: offset,
      startKey: startKey,
      endKey: endKey,
      include_docs: true,
      descending: true
    }

    let response = await this.feedStore.db.allDocs(pagingOptions)
    
    return response.rows.map( v => v.doc)
  }


  async put(post: Post): Promise<Post> {

    let key:string

    if (post._id) {
      key = post._id
    } else {
      key = new Date().toJSON()
    }

    await this.feedStore.put(key, post)

    return this.get(key)

  }

  async get(key:string): Promise<Post> {
    return this.feedStore.get(key)
  }

  async delete(post: Post): Promise<void> {
    return this.feedStore.del(post._id)
  }

  async postMessage(content: any, walletAddress: string) {

    let post: Post = await this.postService.buildPost(walletAddress, content);

    //Load user's post feed
    await this.loadPostFeedForWallet(walletAddress)
    await this.load()
    await this.put(post)

    //Put in user's main feed too
    await this.loadMainFeedForWallet(walletAddress)
    await this.load()
    await this.put(post)

    await this.postService.translatePost(post)

    return post

  }

  async postReply(parent: Post, content: any, walletAddress: string) {

    let post: Post = await this.postService.buildPost(walletAddress, content, parent);

    //Load replies feed
    await this.loadRepliesFeed(parent.replies)
    await this.put(post)

    await this.postService.translatePost(post)

    return post

  }


  async translatePost(post: Post): Promise<Post> {
    return this.postService.translatePost(post)
  }


  async load() {
    return this.feedStore.load()
  }

  async close() {
    return this.feedStore.close()
  }





}


export {
  ReadOnlyPostService
}
