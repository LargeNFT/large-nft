import {Global} from "../global";

let PROFILE_REPO = 1;

class ProfileService {
  
  public freedom: any

  async getProfileById(id: Number) : Promise<Profile> {
    return this.freedom.read(PROFILE_REPO, id);
  }

  async getCurrentUser(): Promise<Profile> {

    let currentUser: Profile

    try {
      currentUser = await this.freedom.readByOwnedIndex(PROFILE_REPO, window['currentAccount'], 0)
    } catch (ex) {
      console.log(ex)
    }

    return currentUser

  }


  async updateProfile(profile: Profile) : Promise<Profile> {

    if (profile.id) {
      return this.freedom.update(PROFILE_REPO, profile.id, profile)
    } else {
      return this.freedom.create(PROFILE_REPO, profile)
    }
  }

}


export { ProfileService }

