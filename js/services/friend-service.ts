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
    private friendFeed: any,
    private schemaService: SchemaService
  ) { }


  static async getInstance(walletAddress: string): Promise<FriendService> {
    
    let friendFeed = await Global.schemaService.getFriendFeedByWalletAddress(walletAddress)

    await friendFeed.load()

    let friendService:FriendService = new FriendService(friendFeed, Global.schemaService)

    return friendService
  }

  static async follow(friendAddress: string) : Promise<Friend> {

    let friendService: FriendService = await FriendService.getInstance(window["currentAccount"])

    let friend:Friend = {
        address: friendAddress
    }

    friend = await friendService.create(friend)

    return friend

  }


  static async read(cid: string): Promise<Friend> {
    
    let loaded = await Global.ipfs.object.get(cid)
    let t = loaded.Data.toString()

    let friend:Friend = JSON.parse(t)

    friend.cid = cid.toString()

    return friend
  }


  async getRecentFriends(limit:number, lt:string=undefined): Promise<Friend[]> {

    let friends:Friend[] = await this.getFriends(this.friendFeed, limit, lt)

    friends.reverse()

    return friends

  }


  async getFriends(friendFeed: any, limit:number=undefined, lt:string=undefined): Promise<Friend[]> {
    
    let options: any = {}

    if (limit) {
      options.limit = limit
    } 

    if (lt) {
      options.lt = lt
    }


    let results = await friendFeed.iterator(options)
      .collect()
      .map((e) => {

        let model = { 
          cid: e.payload.value,
          feedCid: e.hash
        }

        return model
    })

    let friends:Friend[] = []
    for (var result of results) {

      let friend:Friend = await FriendService.read(result.cid)
      friend.feedCid = result.feedCid
      friends.push(friend)

    }

    return friends
  }



  async create(friend: Friend) {

    //Save directly in IPFS
    let buffer = Buffer.from(JSON.stringify(friend))
    let cid = await Global.ipfs.object.put(buffer)

    let cidString = cid.toString()


    //Store CID in feed
    let feedCid = await this.friendFeed.add(cidString)
    
    friend.cid = cidString
    friend.feedCid = feedCid

    return friend
  }


  async close() {
    return this.friendFeed.close()
  }






}


export { 
  FriendService 
}

