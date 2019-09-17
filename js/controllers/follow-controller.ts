import { ModelView, Dom7 } from "large-web"

import { Profile, Friend, FriendService, ProfileService, ImageService } from "large-core";
import { Global } from "../global";
import { UiService } from "../services/ui-service";

var $$ = Dom7;


class FollowController {

  loadingInProgress: boolean = false
  hasMorePosts: boolean = true

  profilesShown: number = 0
  limit: number = 10


  constructor(
    private friendService: FriendService,
    private profileService: ProfileService,
    private imageService: ImageService,
    private uiService: UiService
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
      
        if (!profile) {
          profile = new Profile()
          profile.owner = friend.address
          profile.name = friend.address
          profile.lastKnownAddress = friend.lastKnownAddress
        }

        profile.following = true

        //Create a view model and copy properties over. 
        let model = {
          profilePicSrc: (profile && profile.profilePic) ? await this.imageService.cidToUrl(profile.profilePic) : undefined
        }
        Object.assign(model, profile)

        //@ts-ignore
        profiles.push(model)
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

    this.uiService.showSpinner()

    let profile: Profile

    try {
      profile = await this.profileService.getProfileByWallet($$('#friendAddress').val())

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


    let profileViewModel = {
      profilePicSrc: (profile && profile.profilePic) ? await this.imageService.cidToUrl(profile.profilePic) : undefined
    }
    Object.assign(profileViewModel, profile)


    component.$setState({
      foundFriend: profileViewModel
    })


    this.uiService.hideSpinner()
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