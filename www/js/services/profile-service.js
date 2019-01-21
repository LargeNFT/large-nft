let PROFILE_REPO = 1;

class ProfileService {

  async getProfileById(id) {
    return freedom.read(PROFILE_REPO, id);
  }

  async getCurrentUser() {

    let currentUser

    try {
      currentUser = await freedom.readByOwnedIndex(PROFILE_REPO, 0)
    } catch (ex) {}

    return currentUser

  }

  async createProfile(profile) {
    return freedom.create(PROFILE_REPO, profile);
  }

  async updateProfile(profile) {
    return freedom.update(PROFILE_REPO, profile.id, profile);
  }

}
