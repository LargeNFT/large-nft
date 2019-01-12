
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

        let profile;

        try {
            profile = await profileService.getProfileById(id)
        } catch(ex) {
            console.log(ex)
        }

        return new ModelView(profile, 'pages/profile/static.html')


    }

    async showProfile() {

        let profile;

        try {
            profile = await profileService.getCurrentUser()
        } catch(ex) {
            console.log(ex)
        }

        let model = {
          profile: profile
        }

        return new ModelView(model, 'pages/profile/show.html')

    }

    async showProfileEdit() {

        let profile;

        //Look up 
        try {
            profile = await profileService.getCurrentUser()
        } catch(ex) {
            console.log(ex);
        }

        return new ModelView(profile, 'pages/profile/edit.html')

    }

    async profileEditSave(e) {

        e.preventDefault();
        
        var profileData = app.form.convertToData('#edit-profile-form');

        //Upload photo if we have it
        const profilePic = document.getElementById("profilePic");

        if (profilePic.files.length > 0) {
            profileData.profilePic = await this._uploadImage(profilePic)
        }

        await freedom.update(PROFILE_REPO, profileData.id, profileData);
        
        
        app.methods.navigate("/profile/show");
    }


    async profileCreateSave(e) {

        e.preventDefault();
        
        var profileData = app.form.convertToData('#create-profile-form');

        //Upload photo if we have it
        const profilePic = document.getElementById("profilePic");

        if (profilePic.files.length > 0) {
            profileData.profilePic = await this._uploadImage(profilePic)
        }
     
        await freedom.create(PROFILE_REPO, profileData);
        
        app.methods.navigate("/profile/show");
    }



    //TODO: probably move this to some service
    async _uploadImage(profilePic) {

        const self = this;

        let ipfsCid = '';

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function () {
                const buf = Buffer.Buffer(reader.result)

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
