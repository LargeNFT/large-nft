
import { Profile } from "../../dto/profile"
import { IdentityService } from "./identity-service";
import { Schema } from "../../dto/schema";
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




}



export { SettingsService }

