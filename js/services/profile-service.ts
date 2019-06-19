import {Global} from "../global";
import { Profile } from "../dto/profile";


class ProfileService {
  
  constructor(
    private ipfs: any
  ) {
    this.ipfs = ipfs  
  }


  async create(profile:Profile) : Promise<number> {
    return 0
  }

  async read(id:number) : Promise<Profile> {

    const profile: Profile = {}

    // //Fetch author
    // await this._postFetchAuthor(post)

    // //Convert content to HTML
    // this._translatePost(post)

    return profile

  }

  async update(profile:Profile) : Promise<void> {

  }

  async delete(id:number) : Promise<void> {

  }

}


export { ProfileService }

