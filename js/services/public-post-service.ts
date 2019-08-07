import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
const moment = require('moment')


class PublicPostService {

  static LOAD_PER_BATCH:number = 5


  private recordsLoaded:number = 0

  constructor(
    private store: any,
    private counterStore: any,
    private schemaService: SchemaService,
    private profileService: ProfileService
  ) { }


  static async getInstance(walletAddress: string): Promise<PublicPostService> {
    
    let postFeed = await Global.schemaService.getPostFeedByWalletAddress(walletAddress)
    let postFeedCounter = await Global.schemaService.getPostFeedCounterByWalletAddress(walletAddress)
    let profileStore = await Global.schemaService.getProfileStoreByWalletAddress(walletAddress)

    await postFeed.load(this.LOAD_PER_BATCH)
    await profileStore.load()
    await postFeedCounter.load()


    let profileService = new ProfileService(profileStore)

    return new PublicPostService(postFeed, postFeedCounter, Global.schemaService, profileService)
  }


  async postMessage(content: any, walletAddress:string) {

    let dateString: string = moment().format().toString()

    let profile: Profile = await this.profileService.read(walletAddress)

    let post: Post = {
      owner: walletAddress,
      ownerDisplayName: (profile && profile.name) ? profile.name : walletAddress,
      dateCreated: dateString,
      content: content
    }

    post.replies = await this.schemaService.getRepliesPostFeedAddress(post, this._translateContent(post))

    //Set user avatar
    if (profile && profile.profilePic) {
      post.ownerProfilePic = profile.profilePic
    }

    await this.create(post)

    this._translatePost(post)

    return post

  }


  async getRecentPosts(limit:number, lt:string=undefined): Promise<Post[]> {

    let count = await this.count()

    if (this.recordsLoaded >= count) return []

    let options: any = {}

    if (limit) {
      options.limit = limit
    }

    if (lt) {
      options.lt = lt
    }

    options.reverse = false //doesn't do anything


    let posts:Post[] = await this._iteratePosts(options)

    posts.reverse()

    this.recordsLoaded += posts.length

    console.log(`recordsLoaded: ${this.recordsLoaded}`)

    //Load the next page.
    await this.store.load(PublicPostService.LOAD_PER_BATCH + this.recordsLoaded)
    


    return posts

  }

  async _iteratePosts(options) : Promise<Post[]> {

    let posts:Post[] = this.store.iterator(options)
      .collect()
      .map((e) => {

        let post = {
          _id: e.hash
        }

        Object.assign(post, e.payload.value)

        //@ts-ignore
        this._translatePost(post)

        return post
      })

    return posts


  }



  async create(post: Post): Promise<string> {

    let cid = await this.store.add(post)
    post._id = cid

    //Increment counter
    await this.counterStore.inc(1)

    return cid

  }

  async read(cid: string): Promise<Post> {

    let e = this.store.get(cid)

    let post: Post = e.payload.value
    post._id = cid

    return post
  }


  async delete(cid: string): Promise<void> {

    await this.store.remove(cid)

    let count = await this.count()

    //Decrement counter
    if (count >= 0) {
      await this.counterStore.inc(-1)
    }
    
  }

  async count() : Promise<number> {
    return this.counterStore.value
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




  _translatePost(post: Post): void {

    post.contentTranslated = this._translateContent(post)
    post.dateCreated = moment(post.dateCreated).fromNow()

  }

  _translateContent(post: Post) : string {

    //Create content HTML
    //@ts-ignore
    const qdc = new QuillDeltaToHtmlConverter(post.content.ops, window.opts_ || {
    });

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


export { PublicPostService }

