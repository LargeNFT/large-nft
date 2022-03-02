import { ProfileService } from "./profile-service";
import { Profile } from "../../dto/profile";
import { SchemaService } from "./schema-service";
import { Friend } from "../../dto/friend";
import { inject, injectable } from "inversify";
import { OrbitService } from "./orbit-service";

@injectable()
class FriendService {

  friendStore: any

  constructor(
    private schemaService: SchemaService,
    private profileService: ProfileService,
    private orbitService:OrbitService
  ) {}


  async loadStoreForWallet(walletAddress: string) {
    this.friendStore = await this.schemaService.getFriendStoreByWalletAddress(walletAddress)
    await this.friendStore.load()
  }

  async connectToFriends(walletAddress: string) {

    console.log('Connecting to friends and updating last known addresses')

    await this.loadStoreForWallet(walletAddress)

    let friends: Friend[] = await this.getAll()

    for (let friend of friends) {
      try {
        this.updateFriendLastKnownAddress(friend)
        this.connect(friend)
      } catch (ex) {
        console.log(ex)
      }
    }

    // //Save peer list
    // if (Core.isElectron()) {
    //   await this.savePeerList(friends)
    // }

  }

  async get(address: string) {
    return this.friendStore.get(address.toLowerCase())
  }

  async put(friend: Friend): Promise<void> {
    return this.friendStore.put(friend.address.toLowerCase(), friend)
  }

  async delete(address: string) {
    return this.friendStore.del(address)
  }

  async getFriends(limit: number, offset:number, startKey:string=undefined, endKey:string=undefined): Promise<any> {

    let pagingOptions = {
      limit: limit,
      skip: offset,
      startKey: startKey,
      endKey: endKey,
      include_docs: true,
      descending: true
    }

    let response = await this.friendStore.db.allDocs(pagingOptions)
    
    return response.rows.map( v => v.doc)
  }

  async listByDate(): Promise<Friend[]> {

    let friends:Friend[] = await this.getAll()

    friends.sort( (a, b) => a.lastPostMilli < b.lastPostMilli ? 1 : -1)

    return friends

  }

  async getAll(): Promise<Friend[]> {

    let response = await this.friendStore.db.allDocs({
      include_docs: true,
      descending: true
    })
    
    return response.rows.map( v => v.doc)
  }

  async close() {
    return this.friendStore.close()
  }

  async load(amount?:number) {
    return this.friendStore.load(amount)
  }

  // async savePeerList(friends: Friend[]) {

  //   let peersDao = window['remote'].getGlobal('peersDao')

  //   let peerList = friends.map(friend => {
  //     return friend.lastKnownAddress
  //   })

  //   await peersDao.savePeers(peerList)

  // }

  async updateFriendLastKnownAddress(friend: Friend) {

    let friendProfile: Profile = await this.profileService.getProfileByWallet(friend.address)

    if (friendProfile) {
      friend.lastKnownAddress = friendProfile.lastKnownAddress
      await this.put(friend)
    }
  }

  async connect(friend: Friend) {
    if (friend.lastKnownAddress && friend.lastKnownAddress.length > 0) {
      for (let address of friend.lastKnownAddress) {
        try {
          console.log(`Peering with last known address: ${address}`)
          await this.orbitService.ipfs.swarm.connect(address)
          break
        } catch (ex) {
          // console.log(ex)
        }
      }
    }

  }

}


export {
  FriendService
}

