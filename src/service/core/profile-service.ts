import { Profile } from "../../dto/profile";
import { inject, injectable } from "inversify";
import { IpfsService } from "./ipfs-service";

@injectable()
class ProfileService {

  profileStore: any

  constructor(
    private ipfsService:IpfsService
  ) { }

  async getCurrentUser(): Promise<Profile> {
    return this.get(window['currentAccount'])
  }


  async updateLastKnownAddress() {

    let currentUser: Profile = await this.getCurrentUser()

    if (currentUser) {
      let id = await this.ipfsService.ipfs.id()

      currentUser.lastKnownAddress = id.addresses

      await this.put(currentUser)
    } else {
      console.log('No profile found. Unable to update last known address')
    }

    return
  }



  async get(key: string): Promise<Profile> {
    return this.profileStore.get(key)
  }

  async put(profile: Profile): Promise<Profile> {

    let key:string

    if (profile._id) {
      key = profile._id
    } else {
      key = new Date().toJSON()
    }

    await this.profileStore.put(key, profile)

    return this.get(key)

  }


}


export { ProfileService }

