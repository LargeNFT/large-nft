import { Profile } from "../../dto/profile";
import { ImageService } from "./image-service";
import { SchemaService } from "./schema-service";
import { inject, injectable } from "inversify";
import { OrbitService } from "./orbit-service";

@injectable()
class ProfileService {

  profileStore: any

  constructor(
    private schemaService: SchemaService,
    private orbitService:OrbitService
  ) { }

  async getCurrentUser(): Promise<Profile> {
    return this.get(window['currentAccount'])
  }

  async getProfileByWallet(walletAddress: string): Promise<Profile> {

    await this.loadStoreForWallet(walletAddress)
    await this.profileStore.load()

    let profile: Profile = await this.get(walletAddress)

    return new Promise((resolve, reject) => {

      if (profile) {
        resolve(profile)
      }

      //If it's us don't bother waiting
      if (walletAddress == window['currentAccount']) {
        resolve({})
      }

      this.profileStore.events.on('replicated', async () => {
        console.log(`Replicated profile for ${walletAddress}`)
        let profile: Profile = await this.get(walletAddress)
        resolve(profile)
      })

    })




  }


  async updateLastKnownAddress() {

    let currentUser: Profile = await this.getCurrentUser()

    if (currentUser) {
      let id = await this.orbitService.ipfs.id()

      currentUser.lastKnownAddress = id.addresses

      await this.put(currentUser)
    } else {
      console.log('No profile found. Unable to update last known address')
    }

    return
  }



  async loadStoreForWallet(walletAddress: string) {
    this.profileStore = await this.schemaService.getProfileStoreByWalletAddress(walletAddress)
  }

  async get(key: string): Promise<Profile> {
    return this.profileStore.get(key)
  }

  async put(profile: Profile): Promise<Profile> {

    let key:string

    if (profile._id) {
      key = profile._id
    } else {
      key = new Date().toJSON()
    }

    await this.profileStore.put(key, profile)

    return this.get(key)

  }

  async load() {
    return this.profileStore.load()
  }



}


export { ProfileService }

