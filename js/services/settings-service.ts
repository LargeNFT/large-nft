
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

    let mainDb = await orbitdb.open("mainDb", {create: true, type: 'table'})
    await mainDb.createSchema(Table)
    console.log('Created main schema')

    let profileTable = await orbitdb.open("profile", {create: true, type: 'table'})
    await profileTable.createSchema(Profile)
    console.log('Created profile table')

    let postFeed = await orbitdb.open("post", {create: true, type: 'feed'})
    console.log('Created post feed')


    let profileTableDTO= { 
      name: "profileTable", 
      path: profileTable.address.toString()
    }

    let postFeedDTO = { 
      name: "postFeed", 
      path: postFeed.address.toString()
    }


    await mainDb.put("profileTable", profileTableDTO)
    await mainDb.put("postFeed", postFeedDTO)
    console.log('Inserted tables into mainDb')

    
    await mainDb.commit()
    console.log('Committed mainDb')


    //Update settings
    let settings = this.getSettings()
    settings.dbAddress = mainDb.address.toString()
    await this.saveSettings(settings)

  }

}



export { SettingsService }

