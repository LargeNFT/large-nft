import {Global} from "../global";
import { Profile } from "../dto/profile";


class ProfileService {
  
  constructor(
    public store: any
  ) {}

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


  async getCurrentUser() : Promise<Profile> {

    return this.read(window['currentAccount'])

  }

}


export { ProfileService }

