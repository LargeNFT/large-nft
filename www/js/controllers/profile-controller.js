

class ProfileController {

    constructor() {
        const self = this;
        $$(document).on('submit', '#edit-profile-form', self.profileEditSave);
        $$(document).on('submit', '#create-profile-form', self.profileCreateSave);
    }

    async showStaticProfile(resolve, id) {
        let profile;

        try {
            profile = await freedom.read(PROFILE_REPO, id)
        } catch(ex) {
            console.log(ex)
        }

        resolve({
            componentUrl: 'pages/profile/static.html'
        },
        {
            context: profile
        })

    }

    async showProfile(resolve) {

        let profile;

        try {
            profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0)
        } catch(ex) {
            console.log(ex)
        }
        
        resolve({
            componentUrl: 'pages/profile/show.html'
        },
        {
            context: {
                profile: profile
            }
        })

    }

    async showProfileEdit(resolve) {

        let profile;

        //Look up 
        try {
            profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0);
        } catch(ex) {
            console.log(ex);
        }

        resolve({
            componentUrl: 'pages/profile/edit.html'
        },
        {
            context: profile
        })

    }

    async profileEditSave(e) {

        e.preventDefault();
        
        var profileData = app.form.convertToData('#edit-profile-form');
        console.log(profileData)
        //Validation?
        if (profileData.id) {
            await freedom.update(PROFILE_REPO, profileData.id, profileData);
        } else {
            await freedom.create(PROFILE_REPO, profileData);
        }

        
        app.methods.navigate("/profile/show");
    }


    async profileCreateSave(e) {

        e.preventDefault();
        
        var profileData = app.form.convertToData('#create-profile-form');

        await freedom.create(PROFILE_REPO, profileData);
        
        app.methods.navigate("/profile/show");
    }


}