
class ProfileController {

    constructor(profileService, uploadService) {
        const self = this

        self.profileService = profileService
        self.uploadService = uploadService

        $$(document).on('submit', '#edit-profile-form', function(e) {
            self.profileEditSave(e)
        });
        $$(document).on('submit', '#create-profile-form', function(e) {
            self.profileCreateSave(e)
        });
    }

    async showCreateProfile() {
      return new ModelView({},  'pages/profile/create.html')
    }

    async showStaticProfile(id) {

        let profile = await profileService.getProfileById(id)

        return new ModelView(profile, 'pages/profile/static.html')

    }

    async showProfile() {

        let profile;

        try {
          profile = await profileService.getCurrentUser()
        } catch(ex) {
          console.log("Profile doesn't exist")
        }


        let model = {
          profile: profile
        }


        return new ModelView(model, 'pages/profile/show.html')

    }

    async showProfileEdit() {

        let profile = await profileService.getCurrentUser()

        return new ModelView(profile, 'pages/profile/edit.html')

    }

    async profileEditSave(e) {

        e.preventDefault();

        //Collect info
        var profileData = app.form.convertToData('#edit-profile-form');

        //Add photo (if selected)
        profileData = await this.addProfilePic(profileData)


        //Update
        await profileService.updateProfile(profileData)

        //Redirect
        app.methods.navigate("/profile/show");
    }


    async profileCreateSave(e) {

        e.preventDefault();

        //Collect info
        var profileData = app.form.convertToData('#create-profile-form');

        //Add photo (if selected)
        profileData = await this.addProfilePic(profileData)

        //Save
        try {
          await profileService.createProfile(profileData)

          //Redirect
          app.methods.navigate("/profile/show")

        } catch(ex) {
          app.methods.showExceptionPopup(ex)
        }

    }


  /**
   * UTIL
   */


    async addProfilePic(profileData) {

        //Upload photo if we have it
        const profilePic = document.getElementById("profilePic");

        if (profilePic.files.length > 0) {
          profileData.profilePic = await this.uploadService.uploadFile(profilePic)
        }

        return profileData

    }


}
