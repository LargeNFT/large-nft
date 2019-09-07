import {Global} from "../global";
import { Profile } from "../dto/profile";
import { timeout } from '../timeout-promise'

class ProfileService {
  
  setStore(store) {
    this.store = store
  }

  store: any

  constructor(
    
  ) {}

  
  async getCurrentUser() : Promise<Profile> {
    return this.getProfileByWallet(window['currentAccount'])
  }

  // @timeout(2000)
  async getProfileByWallet(walletAddress:string) : Promise<Profile> {

    await this.loadStoreForWallet(walletAddress)
    await this.store.load()

    let profile:Profile = await this.read(walletAddress)
    
    if (profile) return profile

    if (walletAddress == window['currentAccount']) return //probably not the best way to handle this


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

