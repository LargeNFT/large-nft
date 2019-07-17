
import { Profile } from "../dto/profile"
import { Table } from "../dto/table"


class SettingsService {

  getSettings() : Settings {
    return JSON.parse(localStorage.getItem("settings"))
  }

  saveSettings(settings: Settings) {
    localStorage.setItem("settings", JSON.stringify(settings))
  }


  async generateDatabase(orbitdb) {

    console.log('Generating database')

    let nameSeed = this._uuidv4()

    let mainDb = await orbitdb.open(`mainDb-${nameSeed}`, {create: true, type: 'docstore', indexBy: 'name'})
    console.log('Created main schema')

    let profileTable = await orbitdb.open(`profile-${nameSeed}`, {create: true, type: 'docstore', indexBy: 'name'})
    console.log('Created profile table')

    let postFeed = await orbitdb.open(`post-${nameSeed}`, {create: true, type: 'feed'})
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



}



export { SettingsService }

