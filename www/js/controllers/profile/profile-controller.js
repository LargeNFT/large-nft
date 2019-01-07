

class ProfileController {

    constructor() {
        const self = this;
        $$(document).on('submit', '#edit-profile-form', self.profileEditSave);

    }

    async showProfile(page) {

        const profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0);

        app.methods.appendFromTemplate(
            $$(page.el).children('.page-content'), 
            '#profile-template', 
            profile
        );
        
    }

    async showProfileEdit() {

        //Look up 
        try {
            const profile = await freedom.readByOwnedIndex(PROFILE_REPO, 0);

            app.form.fillFromData('#edit-profile-form', profile);

        } catch(ex) {
            console.log(ex);
        }
        
    }

    async profileEditSave(e) {

        e.preventDefault();
        
        var profileData = app.form.convertToData('#edit-profile-form');

        //Validation?
        if (profileData.id) {
            await freedom.update(PROFILE_REPO, profileData.id, profileData);
        } else {
            await freedom.create(PROFILE_REPO, profileData);
        }

        
        app.methods.navigate("/profile/show");
    }

}