
import { Profile } from "../dto/profile"
import { IdentityService } from "./identity-service";
import { Schema } from "../dto/schema";
const Keystore = require('orbit-db-keystore/index-browser')


class SettingsService {


  constructor(
  ) {}


  getSettings(): Settings {
    return JSON.parse(localStorage.getItem("settings"))
  }

  saveSettings(settings: Settings) {
    localStorage.setItem("settings", JSON.stringify(settings))
  }


  async generateDatabase(orbitdb, accessController) {

    console.log('Generating database')

    let nameSeed = window['currentAccount'].toLowerCase()

    let mainStoreName = `mainStore-${nameSeed}`
    let mainDb = await orbitdb.docstore(mainStoreName, {
      create: true,
      indexBy: 'name',
      accessController: accessController
    })

    console.log('Created main schema')

    let profileStoreName = `profile-${nameSeed}`
    let profileStore = await orbitdb.docstore(profileStoreName, {
      create: true,
      indexBy: 'name',
      accessController: accessController
    })


    console.log('Created profile store')

    let postFeedName = `post-${nameSeed}`
    let postFeed = await orbitdb.feed(postFeedName, {
      create: true,
      accessController: accessController
    })

    console.log('Created post feed')

    let schema:Schema = {
      profileStore: profileStore.address.toString(),
      postFeed: postFeed.address.toString()
    }

    await mainDb.put({
      name: "schema",
      value: schema
    })

    console.log('Inserted schema into mainStore')


    //Update settings
    let settings = this.getSettings()
    settings.dbAddress = mainDb.address.toString()
    await this.saveSettings(settings)

  }



  _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }



}



export { SettingsService }

