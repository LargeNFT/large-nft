import { ModelView } from '../model-view'
import {ProfileService} from "../services/profile-service";
import {UploadService} from "../services/upload-service";
import {PublicPostService} from "../services/public-post-service";
import {Global} from "../global";
import {Dom7} from "framework7";
import { QueueService } from '../services/queue_service';
import {PromiseView} from "../promise-view";
import { Profile } from '../dto/profile';


var $$ = Dom7


class ProfileController {

    constructor(
      private profileService : ProfileService,
      private uploadService : UploadService,
      private publicPostService : PublicPostService,
      private queueService: QueueService
      ) {
        const self = this

        $$(document).on('submit', '#edit-profile-form', function(e) {
            e.preventDefault();
            self.profileEditSave(e)
        })

    }


    async showStaticProfile(address: string) : Promise<ModelView> {

        let profile: Profile = await this.profileService.read(address)

        //Show the edit button if this is their profile
        let currentUser: Profile

        try {
          currentUser = await this.profileService.read(window['currentUser'])
        } catch(ex) {
          console.log("Profile doesn't exist");
        }

        let model = {
          profile: profile,
          showEditLink: (currentUser && currentUser._id == profile._id)
        }

        return new ModelView(model, 'pages/profile/static.html')

    }

    async showProfile() : Promise<ModelView> {

        let profile: Profile;

        try {
          profile = await this.profileService.read(window['currentAccount'])
        } catch(ex) {
          console.log("Profile doesn't exist")
        }

        if (profile) {
          Global.navigate(`/profile/static/${profile._id}`)
        } else {
          return new ModelView({}, 'pages/profile/no_profile.html')
        }

    }

    async showProfileEdit() : Promise<ModelView> {

        let profile: Profile = await this.profileService.read(window['currentAccount'])

        if (!profile) {
          profile = new Profile()
          profile._id = window['currentAccount']
        }

        return new ModelView(profile, 'pages/profile/edit.html')

    }

    async profileEditSave(e: Event): Promise<void> {
      
      try {

        //Collect info
        var profileData: Profile = Global.app.form.convertToData('#edit-profile-form');

        //Add photo (if selected)
        profileData = await this.addProfilePic(profileData)

        await this.profileService.put(profileData)

        //Redirect to profile
        Global.navigate('/profile/show')


      } catch (ex) {
        Global.showExceptionPopup(ex)
      }

    }




    // async loadStaticProfilePosts(e: Event) : Promise<void> {

    //   let owner = $$('#static-profile-owner').val()

    //   let currentPosts = $$('#static-profile-post-list').children('li').length

    //   this.publicPostService.loadMorePosts(
    //     await this.publicPostService.getPostsByOwner(owner, 10, currentPosts),
    //     await this.publicPostService.getPostByOwnerCount(owner),
    //     '#static-profile-post-list'
    //   )

    // }


 




  /**
   * UTIL
   */


    async addProfilePic(profileData: Profile) : Promise<Profile> {

        //Upload photo if we have it
        const profilePic: HTMLElement = document.getElementById("profilePic");

        //@ts-ignore
        if ((profilePic).files.length > 0) {
          profileData.profilePic = <string> await this.uploadService.uploadFile(profilePic)
        }

        return profileData

    }


}



export { ProfileController }

