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
import { Post } from '../dto/post';


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
          let publicPostService:PublicPostService = await PublicPostService.getInstance(address)

          let profile: Profile = await profileService.read(address)
          let posts: Post[] = await publicPostService.getRecentPosts(10)

          let model = {
            posts: posts
            // showEditLink: (currentUser && currentUser._id == profile._id)
          }

          Object.assign(model, profile)

          return model 

        }, 'pages/profile/static.html')

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

