import {Global} from "../global";
import { Profile } from "../dto/profile";
import { timeout } from '../timeout-promise'

class ProfileService {
  
  constructor(
    public store: any
  ) {}

  @timeout(2000)
  static async getInstance(walletAddress:string) : Promise<ProfileService> {
    let profileStore = await Global.schemaService.getProfileStoreByWalletAddress(walletAddress)
    return new ProfileService(profileStore)

  }

  @timeout(2000)
  static async getCurrentUser() : Promise<Profile> {
    return ProfileService.getProfileByWallet(window['currentAccount'])
  }

  @timeout(2000)
  static async getProfileByWallet(walletAddress:string) : Promise<Profile> {
    let service:ProfileService =  await ProfileService.getInstance(walletAddress)
    await service.load()
    return service.read(walletAddress)
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

  async load() {
    return this.store.load()
  }



}


export { ProfileService }

