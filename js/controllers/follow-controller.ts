import { ModelView } from "../model-view";
import { Dom7 } from "framework7";
import { FriendService } from "../services/friend-service";
import { ProfileService } from "../services/profile-service";
import { Profile } from "../dto/profile";
import { Friend } from "../dto/friend";
import { Global } from "../global";
import { ImageService } from "../services/util/image-service";

var $$ = Dom7;


class FollowController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true

  profilesShown: number = 0
  limit: number = 10


  constructor(
    private friendService: FriendService,
    private profileService: ProfileService,
    private imageService: ImageService
  ) { }


  async showFollowing(): Promise<ModelView> {

    return new ModelView(async () => {

      await this.friendService.loadStoreForWallet(window['currentAccount'])
      await this.friendService.load()

      this.reset()

      return {
        currentAccount: window['currentAccount']
      }

    }, 'pages/follow/following.html')
  }

  async getNextPageFollowing(): Promise<Profile[]> {

    let profiles: Profile[] = []

    try {
      let friends: Friend[] = await this.friendService.list(this.profilesShown, this.limit)

      for (let friend of friends) {
        let profile: Profile = await this.profileService.getProfileByWallet(friend.address)
        profile.following = true
        profiles.push(profile)
      }

    } catch (ex) {
      console.log(ex)
    }


    if (profiles.length == this.limit) {
      this.profilesShown += profiles.length
    } else {
      this.hasMorePosts = false
    }

    return profiles

  }

  async findFriendClick(e: Event, component) {

    Global.showSpinner()

    let profile: Profile

    try {
      profile = await this.profileService.getProfileByWallet($$('#friendAddress').val())

      //Convert profile pic to Blob
      if (profile && profile.profilePic) {
        profile.profilePicSrc = await this.imageService.cidToUrl(profile.profilePic)
      }


      if (profile) {
        //Check if we're friends    
        let friend: Friend = await this.friendService.get(profile._id)

        if (friend) {
          profile.following = true
        }
      }

    } catch (ex) {
      console.log(ex)
    }


    component.$setState({
      foundFriend: profile
    })


    Global.hideSpinner()
  }



  async followClick(e: Event) {

    let friendAddress = $$(e.target).data('id')


    let friend: Friend = {
      address: friendAddress
    }

    await this.friendService.put(friend)

    $$(e.target)
      .removeClass("button-outline")
      .removeClass("follow-link")
      .addClass("button-fill")
      .addClass("unfollow-link")
      .html("Following")

  }


  async unfollowClick(e: Event) {

    let friendAddress = $$(e.target).data('id')


    await this.friendService.delete(friendAddress)

    $$(e.target)
      .removeClass("button-fill")
      .removeClass("unfollow-link")
      .addClass("button-outline")
      .addClass("follow-link")
      .html("Follow")
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