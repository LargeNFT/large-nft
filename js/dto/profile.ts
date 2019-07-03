class Profile {
  _id?: string

  owner?: string
  name?: string
  aboutMe?: string
  twitterName?: string
  profilePic?: string


  static get constraints() {
    return {
        _id: { primary: true, unique:true, type: 'string' }
    }
  }
  
}

export {
  Profile
}