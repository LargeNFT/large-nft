import {Global} from "../global";
import { Profile } from "../dto/profile";


class ProfileService {
  
  constructor(
    private store: any
  ) {}


  async create(profile:Profile) : Promise<void> {
    return this.store.put(profile)

  }

  async read(address:string) : Promise<Profile> {

    let profile:Profile

    let e = this.store.get(address)

    if (e && e.length > 0) {
      profile = e[0]
    }

    return profile

  }

  async update(profile:Profile) : Promise<void> {
    return this.store.put(profile)
  }

  async delete(cid:string) : Promise<string> {
    return this.store.del(cid)
  }

}


export { ProfileService }

