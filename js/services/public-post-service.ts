import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
import { timeout } from "../timeout-promise";
import { Schema } from "../dto/schema";
const moment = require('moment')


class PublicPostService {

  MAX_POSTS_PER_FEED: number = 10

  setFeed(feed) {
    this.feedStore = feed
  }

  setChildFeed(childFeed) {
    this.childFeedStore = childFeed
  }

  private feedStore: any
  private childFeedStore: any

  private childFeedStoreCid

  constructor(
    private schemaService: SchemaService,
    private profileService: ProfileService
  ) { }


  

  // @timeout(2000)
  async loadPostFeedForWallet(walletAddress: string){
    let postFeed = await Global.schemaService.getPostFeedByWalletAddress(walletAddress)
    return this.loadPostFeed(postFeed, walletAddress, "post")
  }

  // @timeout(2000)
  async loadMainFeedForWallet(walletAddress: string){
    let mainFeed = await Global.schemaService.getMainFeedByWalletAddress(walletAddress)
    this.loadPostFeed(mainFeed, walletAddress, "main")
  }

  private async loadPostFeed(postFeed, walletAddress:string, type:string) {

    //Reset the feeds
    this.setFeed(postFeed)
    this.setChildFeed(undefined)

    //Load the list of feeds
    await this.feedStore.load()

    //Load the first one. If it doesn't exist or it's full create a new one and load it. 
    await this.loadChildFeed()

    //Load posts into child feed
    let loadedPostCount = 0

    if (this.childFeedStore) {
      await this.childFeedStore.load()
      loadedPostCount = this.countChildFeedStore()
    }
    
    
    if (!this.childFeedStore || loadedPostCount >= this.MAX_POSTS_PER_FEED) {

      await this.createAndLoadNewChildFeed(walletAddress, type)
      await this.childFeedStore.load()

    }  


  }





  static async read(cid: string): Promise<Post> {

    let loaded = await Global.ipfs.object.get(cid)

    if (loaded.data) loaded.Data = loaded.data

    let t = loaded.Data.toString()

    let post:Post = JSON.parse(t)

    post.cid = cid.toString()

    return post
  }





  @timeout(2000)
  async getRecentPosts(limit:number, lt:string=undefined, gt:string=undefined): Promise<Post[]> {


    let posts:Post[] = []

    //Load first feed
    await this.loadChildFeed()

    let feedsRead = 0
    let totalFeeds = this.countChildFeedStore()

    do {

      let feedPosts:Post[] = await this.getPosts(limit - posts.length, lt, gt)
      posts.push(...feedPosts)

      feedsRead++

      //Load next feed
      await this.loadChildFeed(this.childFeedStoreCid)

    } while(posts.length < limit && feedsRead < totalFeeds)


    posts.reverse()

    return posts

  }

  async getPosts(limit:number, lt:string=undefined, gt:string=undefined): Promise<Post[]> {

    let options: any = {}

    if (limit) {
      options.limit = limit
    }

    if (lt) {
      options.lt = lt
    }

    if (gt) {
      options.gt = gt
    }


    let results = await this.childFeedStore.iterator(options)
      .collect()
      .map((e) => {

        let model = {
          cid: e.payload.value,
          feedCid: e.hash
        }

        return model
    })

    let posts:Post[] = []
    for (var result of results) {

      let post:Post = await PublicPostService.read(result.cid)
      PublicPostService.translatePost(post)
      post.feedCid = result.feedCid
      posts.push(post)

    }

    return posts
  }

  async getFeedInfo(lt:string=undefined, gt:string=undefined) {

    let options: any = {
      limit: 1
    }

    if (lt) {
      options.lt = lt
    }

    if (gt) {
      options.gt = gt
    }


    let results = await this.feedStore.iterator(options)
      .collect()
      .map((e) => {

        let model = {
          feedAddress: e.payload.value,
          feedCid: e.hash
        }

        return model
    })

    if (results && results.length > 0) {
      return results[0]
    }


  }


  async postMessage(content: any, walletAddress:string) {

    let dateString: string = moment().format().toString()

    //Get profile service of poster
    let profile: Profile
    try {
      profile = await this.profileService.getProfileByWallet(walletAddress)  
    } catch(ex) {
      console.log(ex)
    }



    let post: Post = {
      owner: walletAddress,
      ownerDisplayName: (profile && profile.name) ? profile.name : walletAddress,
      dateCreated: dateString,
      content: content
    }

    post.replies = await this.schemaService.getRepliesPostFeedAddress(post, PublicPostService.translateContent(post))

    //Set user avatar
    if (profile && profile.profilePic) {
      post.ownerProfilePic = profile.profilePic
    }

    await this.create(post)

    PublicPostService.translatePost(post)

    return post

  }

  async create(post: Post): Promise<Post> {

    //Load the right post feed.
    await this.loadChildFeed()

    if (this.countChildFeedStore() >= this.MAX_POSTS_PER_FEED) {
      await this.createAndLoadNewChildFeed(post.owner, "post")
    }

    //Save directly in IPFS
    let buffer = Buffer.from(JSON.stringify(post))
    let cid = await Global.ipfs.object.put(buffer)

    let cidString = cid.toString()


    //Store CID in feed
    let feedCid = await this.childFeedStore.add(cidString)

    post.cid = cidString
    post.feedCid = feedCid

    return post

  }

  async delete(post: Post): Promise<void> {
    await Global.ipfs.object.delete(post.cid)
    await this.feedStore.remove(post.feedCid)
  }

  countFeedStore() : number {
    return this.countLoaded(this.feedStore)  
  }

  countChildFeedStore() : number {
    return this.countLoaded(this.childFeedStore)
  }

  countLoaded(store) {
    return Object.keys(store._index._index).length
  }




  async load(amount:number=undefined) {
    return this.feedStore.load(amount)
  }

  async close() {
    return this.feedStore.close()
  }





  getImagesFromPostContentOps(ops: any) {

    const images: string[] = []

    for (let op of ops) {
      if (op.insert && op.insert.ipfsimage) {
        images.push(op.insert.ipfsimage.ipfsCid)
      }
    }

    return images

  }




  static translatePost(post: Post): void {

    post.contentTranslated = this.translateContent(post)
    post.dateCreated = moment(post.dateCreated).fromNow()

  }

  static translateContent(post: Post) : string {

    //Create content HTML
    //@ts-ignore
    // const qdc = new QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {
    // });

    const qdc = new QuillDeltaToHtmlConverter(post.content.ops, {});

    //Render dividers into HTML
    qdc.renderCustomWith(function (customOp, contextOp) {
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

    return qdc.convert()


  }






  
  private async createAndLoadNewChildFeed(walletAddress:string, type:string) {

    //Name the next feed
    let countExistingFeeds = this.countFeedStore()

    let feedName = `${type}-feed-list-${walletAddress}-${countExistingFeeds}`

    //Create it.
    this.childFeedStore = await Global.orbitDb.feed(feedName, {
      create: true,
      accessController: this.feedStore.accessController
    })

    await this.childFeedStore.load()

    //Add it to the feedStore
    this.childFeedStoreCid = await this.feedStore.add(this.childFeedStore.address)

  }

  async loadChildFeed(lt:string=undefined) {

      let feedInfo = await this.getFeedInfo(lt)
  
      if (feedInfo) {
        this.childFeedStore = await Global.orbitDb.open(feedInfo.feedAddress)
        await this.childFeedStore.load()

        this.childFeedStoreCid = feedInfo.feedCid
      }
  }


}


export {
  PublicPostService
}
