import { ModelView } from '../model-view'
import {ProfileService} from "../services/profile-service";
import {UploadService} from "../services/util/upload-service";
import {PublicPostService} from "../services/public-post-service";
import {Global} from "../global";
import {Dom7} from "framework7";
import { QueueService } from '../services/util/queue_service';
import {PromiseView} from "../promise-view";
import { Profile } from '../dto/profile';
import { pathToFileURL } from 'url';
import { ListingService } from '../services/listing-service';


var $$ = Dom7


class ProfileController {

    constructor(
      private uploadService : UploadService,
      private publicPostService : PublicPostService,
      private queueService: QueueService,
      private listingService: ListingService
      ) {
        const self = this

        $$(document).on('submit', '#edit-profile-form', function(e) {
            e.preventDefault();
            self.profileEditSave(e)
        })

    }


    async showStaticProfile(address: string) : Promise<ModelView> {


      return new ModelView(async () => {

          let profileService:ProfileService = await ProfileService.getInstance(address)

          let profile: Profile = await profileService.read(address)

          // //Show the edit button if this is their profile
          // let currentUser: Profile
  
          // try {
          //   currentUser = await profileService.read(window['currentUser'])
          // } catch(ex) {
          //   console.log("Profile doesn't exist");
          // }
  
          let model = {
            // showEditLink: (currentUser && currentUser._id == profile._id)
          }

          Object.assign(model, profile)

          return model 

        }, 'pages/profile/static.html')

    }

    async showProfile() : Promise<ModelView> {

        let profile: Profile;

        try {

          let profileService:ProfileService = await ProfileService.getInstance(window['currentAccount'])


          profile = await profileService.read(window['currentAccount'])
        } catch(ex) {
          console.log("Profile doesn't exist")
        }

        if (profile) {
          Global.navigate(`/profile/static/${profile._id}`)
        } else {
          return new ModelView(async () => {}, 'pages/profile/no_profile.html')
        }

    }

    async showProfileEdit() : Promise<ModelView> {

        return new ModelView(async () => {

          let profileService:ProfileService = await ProfileService.getInstance(window['currentAccount'])

          let profile: Profile = await profileService.read(window['currentAccount'])

          if (!profile) {
            profile = new Profile()
            profile._id = window['currentAccount']
          }

        }, 'pages/profile/edit.html')

    }

    async profileEditSave(e: Event): Promise<void> {
      
      try {

        let profileService:ProfileService = await ProfileService.getInstance(window['currentAccount'])


        //Collect info
        var profileData: Profile = Global.app.form.convertToData('#edit-profile-form');

        console.log(profileData)

        //Add photo (if selected)
        profileData = await this.addProfilePic(profileData)

        await profileService.put(profileData)

        //Redirect to profile
        Global.navigate('/profile/show')


      } catch (ex) {
        Global.showExceptionPopup(ex)
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

