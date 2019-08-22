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

  setFeed(feed) {
    this.feedStore = feed
  }

  private feedStore: any

  constructor(
    private schemaService: SchemaService,
    private profileService: ProfileService
  ) { }


  

  @timeout(2000)
  async loadPostFeedForWallet(walletAddress: string){
    let postFeed = await Global.schemaService.getPostFeedByWalletAddress(walletAddress)
    this.setFeed(postFeed)
  }

  @timeout(2000)
  async loadMainFeedForWallet(walletAddress: string){
    let mainFeed = await Global.schemaService.getMainFeedByWalletAddress(walletAddress)
    this.setFeed(mainFeed)
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
  async getRecentPosts(offset:number, limit:number, lt:string=undefined): Promise<Post[]> {

    // console.log(`offset: ${offset}, limit: ${limit}, lt: ${lt}`)

    // Reload store with more data.
    let address = this.feedStore.address.toString()
    await this.feedStore.close()

    this.feedStore = await Global.orbitDb.open(address)

    //Reload store with more data.
    let loadQuantity = limit + offset
    await this.feedStore.load(loadQuantity)

    let posts:Post[] = await this.getPosts(limit, lt)
    posts.reverse()


    return posts

  }

  async getPosts(limit:number, lt:string=undefined): Promise<Post[]> {

    let options: any = {}

    if (limit) {
      options.limit = limit
    }

    if (lt) {
      options.lt = lt
    }


    let results = await this.feedStore.iterator(options)
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

    //Save directly in IPFS
    let buffer = Buffer.from(JSON.stringify(post))
    let cid = await Global.ipfs.object.put(buffer)

    let cidString = cid.toString()


    //Store CID in feed
    let feedCid = await this.feedStore.add(cidString)

    post.cid = cidString
    post.feedCid = feedCid

    return post

  }

  async delete(post: Post): Promise<void> {
    await Global.ipfs.object.delete(post.cid)
    await this.feedStore.remove(post.feedCid)
  }

  async countLoaded() : Promise<number> {
    let count = Object.keys(this.feedStore._index._index).length
    return count
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


}


export {
  PublicPostService
}
