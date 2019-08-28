import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise";
import { PublicPostService } from "./public-post-service";
const moment = require('moment')


class FriendService {

  setStore(store) {
    this.kvStore = store
  }

  kvStore: any

  constructor(
    private postService:PublicPostService
  ) { }


  @timeout(2000)
  async loadStoreForWallet(walletAddress:string) {
    let friendStore = await Global.schemaService.getFriendStoreByWalletAddress(walletAddress)
    this.setStore(friendStore)
  }



  async get(address: string): Promise<Friend> {
    
    let cid = this.kvStore.get(address.toLowerCase())
    if (!cid) return


    let loaded = await Global.ipfs.object.get(cid)
    let t = loaded.Data ? loaded.Data.toString() : loaded.data.toString()

    let friend:Friend = JSON.parse(t)

    friend.cid = cid.toString()

    return friend
  }

  async put(friend: Friend) : Promise<Friend> {

    //Save directly in IPFS. We do this so that when "load" is called it'll only pull in the cid's instead of all the data
    let buffer = Buffer.from(JSON.stringify(friend))
    let cid = await Global.ipfs.object.put(buffer)

    let cidString = cid.toString()


    //Store CID in kvstore
    await this.kvStore.put(friend.address.toLowerCase(), cidString)
    
    friend.cid = cidString

    return friend
  }


  async delete(address:string) {
    return this.kvStore.del(address)
  }



  async list(offset:number, limit:number): Promise<Friend[]> {
    
    let keys = Object.keys(this.kvStore.index) 

    let page = keys.slice(offset).slice(0, limit)


    let friends:Friend[] = []
    for (var key of page) {

      let friend:Friend = await this.get(key)
      friends.push(friend)

    }

    return friends
  }


  async close() {
    return this.kvStore.close()
  }


  async load() {
    return this.kvStore.load()
  }



  async getNewPostsFromFriend(friend:Friend) : Promise<Post[]> {

    let posts:Post[] = []

    await this.postService.loadPostFeedForWallet(friend.address)

    let lastPostFeedCid = friend.lastPostFeedCid
    let foundPosts:Post[] = []

    do {
      let foundPosts = await this.postService.getRecentPosts(10, undefined, lastPostFeedCid)
      posts = posts.concat(foundPosts)

    } while(foundPosts.length == 10)

    //Update last post hash
    if (posts.length > 0) {
      friend.lastPostFeedCid = posts[0].cid
    }
    

    await this.put(friend)

    return posts

  }



}


export { 
  FriendService 
}

