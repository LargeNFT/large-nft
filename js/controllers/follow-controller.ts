import { ModelView } from "../model-view";
import { Dom7 } from "framework7";
import { FriendService } from "../services/friend-service";
import { ProfileService } from "../services/profile-service";
import { Profile } from "../dto/profile";
import { Friend } from "../dto/friend";

var $$ = Dom7;


class FollowController {

    loadingInProgress: boolean = false
    hasMorePosts: boolean = true
  
    profilesShown: number = 0
    limit: number = 10


    constructor(
        private friendService: FriendService,
        private profileService: ProfileService
    ) {}


    async showFollowing() : Promise<ModelView> {

        return new ModelView( async () => {

            await this.friendService.loadStoreForWallet(window['currentAccount'])
            await this.friendService.load()

            this.reset()

          }, 'pages/follow/following.html')
    }

    async getNextPageFollowing() : Promise<Profile[]> {

        let profiles:Profile[] = []
    
        try {
            let friends:Friend[] = await this.friendService.list(this.profilesShown, this.limit)

            for (let friend of friends) {
                let profile:Profile = await this.profileService.getProfileByWallet(friend.address)
                profile.following = true
                profiles.push(profile)
            }

        } catch(ex) {
          console.log(ex)
        }
    
        
        if (profiles.length == this.limit) {
          this.profilesShown += profiles.length
        } else {
          this.hasMorePosts = false
        }
    
        return profiles
    
      }



    async reset() {
    
        this.profilesShown = 0
        this.hasMorePosts = true
        
        $$("#friend-list").empty()
    
      }
    

}

export {
    FollowController
}