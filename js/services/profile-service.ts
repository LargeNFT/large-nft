import {Global} from "../global";
import { Profile } from "../dto/profile";


class ProfileService {
  
  constructor(
    public store: any
  ) {}


  static async getInstance(walletAddress:string ) : Promise<ProfileService> {

    // let listing = await Global.listingService.getListing(walletAddress)

    // console.log(listing)

    let profileStore = await Global.schemaService.getProfileStoreByWalletAddress(walletAddress)

    return new ProfileService(profileStore)

  }

  static async getCurrentUser() : Promise<Profile> {

    let service:ProfileService = await ProfileService.getInstance(window['currentAccount'])

    return service.read(window['currentAccount'])

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




}


export { ProfileService }

