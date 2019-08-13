// import { Post } from "../dto/post";
// import { Template7 } from "framework7";
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
// import { Global } from "../global";
// import { ProfileService } from "./profile-service";
// import { Profile } from "../dto/profile";
// import { SchemaService } from "./util/schema-service";
// const moment = require('moment')


// class FriendService {

//   constructor(
//     private feedStore: any,
//     private schemaService: SchemaService
//   ) { }


//   static async getInstance(walletAddress: string): Promise<FriendService> {
    
//     let friendFeed = await Global.schemaService.getFriendFeedByWalletAddress(walletAddress)

//     let friendService:FriendService = new FriendService(friendFeed, Global.schemaService)

//     return friendService
//   }

//   static async read(cid: string): Promise<Post> {

//     let loaded = await Global.ipfs.object.get(cid)
//     let t = loaded.Data.toString()

//     let post:Post = JSON.parse(t)

//     post.cid = cid.toString()

//     return post
//   }







//   async getRecentFriends(offset:number, limit:number, lt:string=undefined): Promise<Post[]> {

//     let address = this.feedStore.address.toString()
//     await this.feedStore.close()

//     this.feedStore = await this.schemaService.openFeed(address, Global.orbitAccessControl)
//     await this.feedStore.load(limit + offset)


//     let posts:Post[] = await this.getPosts(this.feedStore, limit, lt)


//     posts.reverse()


//     return posts

//   }


//   async getPosts(feedStore: any, limit:number, lt:string=undefined): Promise<Post[]> {
    
//     let options: any = {}

//     if (limit) {
//       options.limit = limit
//     } 

//     if (lt) {
//       options.lt = lt
//     }


//     let results = await feedStore.iterator(options)
//       .collect()
//       .map((e) => {

//         let model = { 
//           cid: e.payload.value,
//           feedCid: e.hash
//         }

//         return model
//     })

//     let posts:Post[] = []
//     for (var result of results) {

//       let post:Post = await PublicPostService.read(result.cid)
//       PublicPostService.translatePost(post)
//       post.feedCid = result.feedCid
//       posts.push(post)

//     }

//     return posts
//   }




//   async create(post: Post): Promise<Post> {

//     //Save directly in IPFS
//     let buffer = Buffer.from(JSON.stringify(post))
//     let cid = await Global.ipfs.object.put(buffer)

//     let cidString = cid.toString()


//     //Store CID in feed
//     let feedCid = await this.feedStore.add(cidString)
    
//     post.cid = cidString
//     post.feedCid = feedCid

//     return post

//   }



//   async delete(post: Post): Promise<void> {
//     await Global.ipfs.object.delete(post.cid)
//     await this.feedStore.remove(post.feedCid)
//   }

//   async countLoaded() : Promise<number> {
//     let count = Object.keys(this.feedStore._index._index).length
//     return count
//   }


//   async close() {
//     return this.feedStore.close()
//   }






// }


// export { 
//   FriendService 
// }

