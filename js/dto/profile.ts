class Profile {
  _id?: string

  owner?: string
  name?: string
  aboutMe?: string
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