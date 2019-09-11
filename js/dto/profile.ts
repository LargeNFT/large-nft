class Profile {
  _id?: string

  owner?: string
  name?: string
  aboutMe?: string
  profilePic?: string
  lastKnownAddress?: string[]

  profilePicSrc?: string

  //This is probably should go somewhere else. It's not saved. It's view specific.
  following?:boolean 

  static get constraints() {
    return {
        _id: { primary: true, unique:true, type: 'string' }
    }
  }
  
}

export {
  Profile
}