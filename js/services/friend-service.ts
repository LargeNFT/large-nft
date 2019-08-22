import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
import { Friend } from "../dto/friend";
import { timeout } from "../timeout-promise";
const moment = require('moment')


class FriendService {

  setStore(store) {
    this.store = store
  }

  store: any

  constructor(
  ) { }


  @timeout(2000)
  async loadStoreForWallet(walletAddress:string) {
    let friendStore = await Global.schemaService.getFriendStoreByWalletAddress(walletAddress)
    this.setStore(friendStore)
  }


  async follow(friendAddress: string) : Promise<Friend> {

    let friend:Friend = {
        address: friendAddress
    }

    friend = await this.put(friend)

    return friend

  }

  async unfollow(friendAddress: string)  {
    await this.delete(friendAddress)
  }




  async get(address: string): Promise<Friend> {
    
    let cid = this.store.get(address.toLowerCase())

    if (!cid) return


    let loaded = await Global.ipfs.object.get(cid)
    let t = loaded.Data ? loaded.Data.toString() : loaded.data.toString()

    let friend:Friend = JSON.parse(t)

    friend.cid = cid.toString()

    return friend
  }

  async put(friend: Friend) {

    //Save directly in IPFS
    let buffer = Buffer.from(JSON.stringify(friend))
    let cid = await Global.ipfs.object.put(buffer)

    let cidString = cid.toString()


    //Store CID in feed
    let feedCid = await this.store.put(friend.address.toLowerCase(), cidString)
    
    friend.cid = cidString
    friend.feedCid = feedCid

    return friend
  }


  async delete(address:string) {
    return this.store.del(address)
  }



  async list(offset:number, limit:number): Promise<Friend[]> {
    
    let keys = Object.keys(this.store.index) 

    let page = keys.slice(offset).slice(0, limit)



    let friends:Friend[] = []
    for (var key of page) {

      let friend:Friend = await this.get(key)
      friends.push(friend)

    }

    return friends
  }





  async close() {
    return this.store.close()
  }


  async load() {
    return this.store.load()
  }




}


export { 
  FriendService 
}

