

class ProfileController {

    constructor() {
        const self = this;
        $$(document).on('submit', '#edit-profile-form', self.profileEditSave);

    }

    async showStaticProfile(resolve, id) {
        let profile = await freedom.read(PROFILE_REPO, id)

        resolve({
            componentUrl: 'pages/profile/static.html'
        },
        {
            context: profile
        })
    }

    async showProfile(resolve) {

        let profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0)

        resolve({
            componentUrl: 'pages/profile/show.html'
        },
        {
            context: profile
        })
    }

    async showProfileEdit(resolve) {

        
        //Look up 
        try {
            const profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0);

            resolve({
                componentUrl: 'pages/profile/edit.html'
            },
            {
                context: profile
            })
        } catch(ex) {
            console.log(ex);
        }

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

}