import { Post } from "../dto/post";
import { Template7 } from "framework7";
import { Global } from "../global";
import { ProfileService } from "./profile-service";
import { Profile } from "../dto/profile";
import { SchemaService } from "./util/schema-service";
import { timeout } from "../timeout-promise";
import { Schema } from "../dto/schema";
const moment = require('moment')


class PublicPostService {

  maxPostsPerFeed: number = 1000

  setFeed(feed) {
    this.feedStore = feed
  }

  setChildFeed(childFeed) {
    this.childFeedStore = childFeed
  }

  setMaxPostsPerFeed(max:number) {
    this.maxPostsPerFeed = max
  }

  private feedType:string
  private feedStore: any

  private childFeedStore: any
  private childFeedStoreCid: string 
  private childFeedLoadedIndex: number

  constructor(
    private schemaService: SchemaService
  ) { }


  

  // @timeout(2000)
  async loadPostFeedForWallet(walletAddress: string){
    let postFeed = await this.schemaService.getPostFeedByWalletAddress(walletAddress)
    return this.loadPostFeed(postFeed, "post")
  }

  // @timeout(2000)
  async loadMainFeedForWallet(walletAddress: string){
    let mainFeed = await this.schemaService.getMainFeedByWalletAddress(walletAddress)
    this.loadPostFeed(mainFeed, "main")
  }

  private async loadPostFeed(postFeed, type:string) {

    this.feedType = type

    //Reset the feeds
    this.setFeed(postFeed)
    this.setChildFeed(undefined)

    //Load the list of feeds
    await this.feedStore.load()

    //Load the first one.
    await this.loadChildFeed()

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
    this.childFeedLoadedIndex = countExistingFeeds

  }

  async loadChildFeed(otherThan:string=undefined) {

      let feedInfo = await this.getFeedInfo(otherThan)
  
      if (feedInfo) {

        this.childFeedStore = await this.schemaService.openAddress(feedInfo.feedAddress)
        await this.childFeedStore.load()

        this.childFeedStoreCid = feedInfo.feedCid
        this.childFeedLoadedIndex = feedInfo.index
      }
  }




  // @timeout(2000)
  async getRecentPosts(limit:number, olderThan:string=undefined, newerThan:string=undefined): Promise<Post[]> {

    let results = []

    //Load first feed
    await this.loadChildFeed()

    let feedsRead = 0
    let totalFeeds = this.countFeedStore()

    let locatedExisting = false

    while(totalFeeds > 0 && results.length < limit && feedsRead < totalFeeds) {

      let leftToAdd = limit - results.length

      let feedResults = []

      if (olderThan || newerThan) {

        //See if older/newer than params exist in the feed. Don't pass them as parameters if they don't. 
        let existsInFeed = await this.existsInFeed(olderThan, newerThan)

        if (existsInFeed) {
          feedResults = await this.getPosts(olderThan, newerThan)
          locatedExisting = true
        } else {
          if ( olderThan && locatedExisting ) {
            feedResults = await this.getPosts()
          }
          
        }
  
      } else {
        feedResults = await this.getPosts()
      }

      feedResults.reverse()

      if (leftToAdd < feedResults.length) {
        feedResults = feedResults.slice(0, leftToAdd)
      }
      
      results.push(...feedResults)

      feedsRead++

      //Load next feed
      await this.loadChildFeed(this.childFeedStoreCid)
    } 

    let posts:Post[] = []
    for (var result of results) {

      let post:Post = await PublicPostService.read(result.cid)
      post.feedCid = result.feedCid
      posts.push(post)

    }

    return posts

  }

  async getPosts(olderThan:string=undefined, newerThan:string=undefined): Promise<any> {

    if (!this.childFeedStore) return []

    let options: any = {
      limit: -1,
      reverse: true
    }

    if (olderThan) {
      options.lt = olderThan
    }

    if (newerThan) {
      options.gt = newerThan
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



    return results
  }

  async getFeedInfo(lt:string=undefined, gt:string=undefined) {

    let index=0

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
          feedCid: e.hash,
          index: index
        }

        index++

        return model
    })

    if (results && results.length > 0) {
      return results[0]
    }


  }

  async existsInFeed(olderThan:string, newerThan:string) {

    let exists:boolean = false

    let results = await this.childFeedStore.iterator({limit:-1})
      .collect()
      .map((e) => {

        if (e.hash == olderThan || e.hash == newerThan) {
          exists = true
        }
    })

    return exists 

  }



  async create(post: Post): Promise<Post> {

    //Load the right post feed.
    let childFeedInfo = await this.getFeedInfo()

    if (!this.childFeedStoreCid || childFeedInfo.feedCid != this.childFeedStoreCid) {
      await this.loadChildFeed()
    }
    

    let countPosts = this.countChildFeedStore()

    if (!this.childFeedStore || countPosts >= this.maxPostsPerFeed) {
      await this.createAndLoadNewChildFeed(post.owner, this.feedType)
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




  static async read(cid: string): Promise<Post> {

    let loaded = await Global.ipfs.object.get(cid)

    if (loaded.data) loaded.Data = loaded.data

    let t = loaded.Data.toString()

    let post:Post = JSON.parse(t)

    post.cid = cid.toString()

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
    if (!store || !store._index) return 0
    return Object.keys(store._index._index).length
  }




  async load(amount:number=undefined) {
    return this.feedStore.load(amount)
  }

  async close() {
    return this.feedStore.close()
  }





}


export {
  PublicPostService
}
