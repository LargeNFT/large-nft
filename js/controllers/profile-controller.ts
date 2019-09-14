import {Global} from "../global";
import { Dom7, ModelView, UploadService, PostUIService } from "large-web"

import { pathToFileURL } from 'url';
import { ProfileService, ImageService, Profile, Post } from "large-core"
import { UiService } from "../services/ui-service";



var $$ = Dom7


class ProfileController {

    constructor(
      private uploadService : UploadService,
      private profileService: ProfileService,
      private postUiService:PostUIService,
      private uiService:UiService,
      private imageService:ImageService
      ) {

      }


    async showStaticProfile(address: string) : Promise<ModelView> {

      return new ModelView(async () => {

        let profile: Profile 
        let posts: Post[]
        

        try {
          profile = await this.profileService.getProfileByWallet(address)
        } catch(ex) {
          console.log(ex)
        }

        if (profile) {
          try {

            await this.postUiService.loadPostFeedForWallet(address)

            posts = await this.postUiService.getRecentPosts(100)
          } catch(ex) {
            console.log(ex)
          }
        }

        let showEditLink:boolean = (address.toLowerCase() == window['currentAccount'].toLowerCase())
        
        let model = {
          loaded: true,
          posts: posts,
          profile: profile,
          showEditLink: showEditLink,
          currentAccount: window['currentAccount']
        }

        return model 

      }, 'pages/profile/static.html')

    }

    async showProfileEdit() : Promise<ModelView> {

        return new ModelView(async () => {

          let profile: Profile
          try {

            profile = await this.profileService.getCurrentUser()

            if (profile) {
              profile.profilePicSrc = profile && profile.profilePic ? await this.imageService.cidToUrl(profile.profilePic) : undefined
            }
            

          } catch(ex) {
            console.log(ex)
          }


          if (!profile) {
            profile = new Profile()
            profile._id = window['currentAccount']
          }

          return profile

        }, 'pages/profile/edit.html')

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
        this.uiService.navigate(`/profile/static/${window['currentAccount']}`)


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
        const profilePic: HTMLElement = document.getElementById("profilePic");

        //@ts-ignore
        if ((profilePic).files.length > 0) {
          profileData.profilePic = <string> await this.uploadService.uploadFile(profilePic)
        }

        return profileData

    }


}



export { ProfileController }

