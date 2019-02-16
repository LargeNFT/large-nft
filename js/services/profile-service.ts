import {Global} from "../global";

let PROFILE_REPO = 1;

class ProfileService {

  constructor() {

  }

  async getProfileById(id: Number) : Promise<Profile> {
    return Global.freedom.read(PROFILE_REPO, id);
  }

  async getCurrentUser(): Promise<Profile> {

    let currentUser: Profile

    try {
      currentUser = await Global.freedom.readByOwnedIndex(PROFILE_REPO, window['currentAccount'], 0)
    } catch (ex) {
      console.log(ex)
    }

    return currentUser

  }


  async updateProfile(profile: Profile) : Promise<Profile> {

    if (profile.id) {
      return Global.freedom.update(PROFILE_REPO, profile.id, profile)
    } else {
      return Global.freedom.create(PROFILE_REPO, profile)
    }
  }

}


export { ProfileService }

