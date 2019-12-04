import {Global} from "../../global";

import { pathToFileURL } from 'url';
import { ProfileService, ImageService, Profile, Post } from "large-core"
import { UiService } from "large-web"
import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { UploadService } from "../../services/upload-service";
import { PostUIService } from "../../services/post-ui-service";
import { ModelView } from "large-web";



var $$ = Dom7


class AdminProfileController {

    constructor(
      private uploadService : UploadService,
      private profileService: ProfileService,
      private postUiService:PostUIService,
      private uiService:UiService,
      private imageService:ImageService
      ) {}


    async showStaticProfile(address: string) : Promise<ModelView> {

      return new ModelView(async () => {

        let profile: Profile 
        let posts: Post[]
        
        try {
          profile = await this.profileService.getProfileByWallet(address)
        } catch(ex) {
          console.log(ex)
        }


        // if (profile) {
        //   try {
        //     await this.postUiService.loadPostFeedForWallet(address)
        //     posts = await this.postUiService.getRecentPosts(0, 100)
        //   } catch(ex) {
        //     console.log(ex)
        //   }
        // }

        let showEditLink:boolean = (address.toLowerCase() == window['currentAccount'].toLowerCase())
        
        let model = {
          loaded: true,
          posts: posts,
          profile: profile,
          profilePicSrc: (profile && profile.profilePic) ? await this.imageService.cidToUrl(profile.profilePic) : undefined,
          showEditLink: showEditLink,
          currentAccount: window['currentAccount']
        }

        return model 

      }, 'pages/admin/profile/static.html')

    }

    async showProfileEdit() : Promise<ModelView> {
        
        return new ModelView(async () => {

          let profile: Profile
          try {

            profile = await this.profileService.getCurrentUser()

          } catch(ex) {
            console.log(ex)
          }

          if (!profile) {
            profile = new Profile()
            profile._id = window['currentAccount']
          }

          
          //Create a view model and copy properties over. 
          let model:any = {}
          Object.assign(model, profile)
          
          if (profile && profile.profilePic) {
            model.profilePicSrc = await this.imageService.cidToUrl(profile.profilePic)
          }
          
          return model

        }, 'pages/admin/profile/edit.html')

    }

    async profileEditSave(e: Event): Promise<void> {
      
      try {

        //Collect info
        var profileData: Profile = Global.app.form.convertToData('#edit-profile-form')

        //Add photo (if selected)
        profileData = await this.addProfilePic(profileData)

        //TODO: //Make sure permissions are right for this. Don't want to edit someone else's profile.
        await this.profileService.put(profileData)
        
        //Redirect to profile
        this.uiService.navigate(`/admin/profile/static/${window['currentAccount']}`)

      } catch (ex) {
        console.log(ex)
        this.uiService.showExceptionPopup(ex)
      }

    }





  /**
   * UTIL
   */


    async addProfilePic(profileData: Profile) : Promise<Profile> {

        //Upload photo if we have it
        const profilePic: HTMLElement = document.getElementById("profilePic")

        //@ts-ignore
        if ((profilePic).files.length > 0) {
          profileData.profilePic = <string> await this.uploadService.uploadFile(profilePic)
        }

        return profileData

    }


}



export { AdminProfileController }

