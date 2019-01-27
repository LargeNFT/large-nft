
class ProfileController {

    constructor(profileService, uploadService, postService) {
        const self = this

        self.profileService = profileService
        self.uploadService = uploadService
        self.postService = postService

        $$(document).on('submit', '#edit-profile-form', function(e) {
            self.profileEditSave(e)
        });
        $$(document).on('submit', '#create-profile-form', function(e) {
            self.profileCreateSave(e)
        });

        $$(document).on('infinite', '#static-profile-infinite-scroll', async function(e) {

          // Exit, if loading in progress
          if (self.loadingInProgress) return;

          self.loadingInProgress = true

          await self.loadStaticProfilePosts(e)

          self.loadingInProgress = false

        })
    }

    async showCreateProfile() {
      return new ModelView({},  'pages/profile/create.html')
    }

    async showStaticProfile(id) {

        let profile = await profileService.getProfileById(id)

        //Show the edit button if this is their profile
        let currentUser;

        try {
          currentUser = await profileService.getCurrentUser()
        } catch(ex) {
          console.log("Profile doesn't exist");
        }

        let model = {
          profile: profile,
          showEditLink: (currentUser && currentUser.id == profile.id)
        }

        return new ModelView(model, 'pages/profile/static.html')

    }

    async showProfile() {

        let profile;

        try {
          profile = await profileService.getCurrentUser()
        } catch(ex) {
          console.log("Profile doesn't exist")
        }

        if (profile) {
          app.methods.navigate(`/profile/static/${profile.id}`);
        } else {
          return new ModelView({}, 'pages/profile/no_profile.html')
        }

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

        //Save
        try {

          //Add photo (if selected)
          profileData = await this.addProfilePic(profileData)


          await profileService.createProfile(profileData)

          //Redirect
          app.methods.navigate("/profile/show")

        } catch(ex) {
          app.methods.showExceptionPopup(ex)
        }

    }




    async loadStaticProfilePosts(e) {

      let owner = $$('#static-profile-owner').val()

      let currentPosts = $$('#static-profile-post-list').children('li').length

      this.postService.loadMorePosts(
        await this.postService.getPostsByOwner(owner, 10, currentPosts),
        await this.postService.getPostByOwnerCount(owner),
        '#static-profile-post-list'
      )

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
