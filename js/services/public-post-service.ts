import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
const moment = require('moment')


class PublicPostService {

  constructor(
    private feedStore: any,
    private schemaService: SchemaService,
    private profileService: ProfileService
  ) { }


  static async getInstance(walletAddress: string): Promise<PublicPostService> {
    
    let postFeed = await Global.schemaService.getPostFeedByWalletAddress(walletAddress)
    let profileStore = await Global.schemaService.getProfileStoreByWalletAddress(walletAddress)

    let profileService = new ProfileService(profileStore)
    let postService:PublicPostService = new PublicPostService(postFeed, Global.schemaService, profileService)

    await profileStore.load()

    return postService
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




  async getRecentPosts(offset:number, limit:number, lt:string=undefined): Promise<Post[]> {

    // console.log(`START: Get recent posts`)

    let address = this.feedStore.address.toString()

    await this.feedStore.close()

    this.feedStore = await this.schemaService.openFeed(address, Global.orbitAccessControl)

    // console.log(`Loading ${limit + offset} records`)

    await this.feedStore.load(limit + offset)

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

      let post:Post = await this.read(result.cid)

      this._translatePost(post)

      post.feedCid = result.feedCid

      posts.push(post)

    }

    posts.reverse()
    

    // console.log(`DONE: Get recent posts`)

    return posts

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

  async read(cid: string): Promise<Post> {

    let loaded = await Global.ipfs.object.get(cid)
    let t = loaded.Data.toString()

    let post:Post = JSON.parse(t)

    post.cid = cid.toString()
    

    return post
  }


  async delete(cid: string): Promise<void> {
    await this.feedStore.remove(cid)
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




  _translatePost(post: Post): void {

    post.contentTranslated = this._translateContent(post)
    post.dateCreated = moment(post.dateCreated).fromNow()

  }

  _translateContent(post: Post) : string {

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

