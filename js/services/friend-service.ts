import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
import { Friend } from "../dto/friend";
const moment = require('moment')


class FriendService {

  constructor(
    private friendStore: any,
    private schemaService: SchemaService
  ) { }


  static async getInstance(walletAddress: string): Promise<FriendService> {
    
    let friendStore = await Global.schemaService.getFriendStoreByWalletAddress(walletAddress)

    await friendStore.load()

    let friendService:FriendService = new FriendService(friendStore, Global.schemaService)

    return friendService
  }

  static async follow(friendAddress: string) : Promise<Friend> {

    let friendService: FriendService = await FriendService.getInstance(window["currentAccount"])

    let friend:Friend = {
        address: friendAddress
    }

    friend = await friendService.put(friend)

    return friend

  }


  async get(address: string): Promise<Friend> {
    
    let cid = await this.friendStore.get(address)


    let loaded = await Global.ipfs.object.get(cid)
    let t = loaded.Data.toString()

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
    let feedCid = await this.friendStore.put(friend.address, cidString)
    
    friend.cid = cidString
    friend.feedCid = feedCid

    return friend
  }



  async list(offset:number, limit:number): Promise<Friend[]> {
    return FriendService.list(this.friendStore, offset, limit)
  }


  static async list(friendStore: any, offset:number, limit:number): Promise<Friend[]> {
    
    let keys = friendStore.keys

    
    


    let friends:Friend[] = []
    // for (var result of results) {

    //   let friend:Friend = await FriendService.read(result.cid)
    //   friend.feedCid = result.feedCid
    //   friends.push(friend)

    // }

    return friends
  }





  async close() {
    return this.friendStore.close()
  }






}


export { 
  FriendService 
}

