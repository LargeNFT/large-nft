
class ProfileController {

    constructor(profileService) {
        const self = this;

        self.profileService = profileService;

        $$(document).on('submit', '#edit-profile-form', function(e) {
            self.profileEditSave(e)
        });
        $$(document).on('submit', '#create-profile-form', function(e) {
            self.profileCreateSave(e)
        });
    }

    async showStaticProfile(id) {

        let profile = await profileService.getProfileById(id)

        return new ModelView(profile, 'pages/profile/static.html')

    }

    async showProfile() {

        let profile = await profileService.getCurrentUser()

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
        await profileService.createProfile(profileData)


        //Redirect
        app.methods.navigate("/profile/show");
    }


  /**
   * UTIL
   */


    async addProfilePic(profileData) {

        //Upload photo if we have it
        const profilePic = document.getElementById("profilePic");

        if (profilePic.files.length > 0) {
          profileData.profilePic = await this._uploadImage(profilePic)
        }

        return profileData

    }


    //TODO: probably move this to some service
    async _uploadImage(profilePic) {

        const self = this;

        let ipfsCid = '';

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function () {
                const buf = Buffer(reader.result)

                if (buf) {
                    ipfsCid = await freedom.ipfsPutFile(buf);
                }

                resolve(ipfsCid);
            };

            if (profilePic.files.length > 0) {
                reader.readAsArrayBuffer(profilePic.files[0]);
            } else {
                resolve(ipfsCid);
            }

        });
    }

}
