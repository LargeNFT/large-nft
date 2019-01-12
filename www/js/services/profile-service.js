let PROFILE_REPO = 1;

class ProfileService {

  async getProfileById(id) {
    return freedom.read(PROFILE_REPO, id);
  }

  async getCurrentUser() {
    return freedom.readByOwnedIndex(PROFILE_REPO, 0)
  }


}
