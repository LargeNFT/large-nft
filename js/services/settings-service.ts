
import { Profile } from "../dto/profile"
import { Table } from "../dto/table"
import { IdentityService } from "./identity-service";
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


    let nameSeed = this._uuidv4()

    let mainDb = await orbitdb.docstore(`mainDb-${nameSeed}`, {
      create: true,
      indexBy: 'name',
      accessController: accessController
    })

    console.log('Created main schema')

    let profileTable = await orbitdb.docstore(`profile-${nameSeed}`, {
      create: true,
      indexBy: 'name',
      accessController: accessController
    })


    console.log('Created profile table')

    let postFeed = await orbitdb.feed(`post-${nameSeed}`, {
      create: true,
      accessController: accessController
    })

    console.log('Created post feed')


    console.log('Inserting tables into mainDb')

    await mainDb.put({
      name: "profileTable",
      path: profileTable.address.toString()
    })

    await mainDb.put({
      name: "postFeed",
      path: postFeed.address.toString()
    })

    console.log('Inserted tables into mainDb')



    //Update settings
    let settings = this.getSettings()
    settings.dbAddress = mainDb.address.toString()
    await this.saveSettings(settings)

  }



  _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



}



export { SettingsService }

