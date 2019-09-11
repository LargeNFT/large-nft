import {Global} from "../global";
import { Profile } from "../dto/profile";
import { timeout } from '../timeout-promise'
import { ImageService } from "./util/image-service";

class ProfileService {
  
  setStore(store) {
    this.store = store
  }

  store: any

  constructor(
    private imageService:ImageService
  ) {}

  
  async getCurrentUser() : Promise<Profile> {
    return this.getProfileByWallet(window['currentAccount'])
  }

  // @timeout(2000)
  async getProfileByWallet(walletAddress:string, waitForUpdate:boolean=true) : Promise<Profile> {

    await this.loadStoreForWallet(walletAddress)
    await this.store.load()

    let profile:Profile = await this.read(walletAddress)

    //Convert profile pic to Blob
    if (profile && profile.profilePic) {
      profile.profilePicSrc = await this.imageService.cidToUrl(profile.profilePic)
    }

    if (profile) return profile

    if (this.store.replicationStatus.progress == this.store.replicationStatus.max) return
    
    return new Promise((resolve, reject) => {
      this.store.events.on('replicated', async () => {
        console.log(`Replicated profile for ${walletAddress}`)
        let profile:Profile = await this.read(walletAddress)
        resolve(profile)
      })
    })
  }





  // @timeout(2000)
  async loadStoreForWallet(walletAddress:string) {
    let profileStore = await Global.schemaService.getProfileStoreByWalletAddress(walletAddress)
    this.setStore(profileStore)
  }

  async read(address:string) : Promise<Profile> {

    let profile:Profile

    let e = await this.store.get(address)

    if (e && e.length > 0) {
      profile = e[0]
    }

    return profile

  }

  async put(profile:Profile) : Promise<void> {
    return this.store.put(profile)
  }

  async delete(cid:string) : Promise<string> {
    return this.store.del(cid)
  }

  @timeout(2000)
  async load() {
    return this.store.load()
  }



}


export { ProfileService }

