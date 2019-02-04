class SettingsService {

  getSettings() : Settings {
    return JSON.parse(localStorage.getItem("settings"))
  }

  saveSettings(settings: Settings) {
    localStorage.setItem("settings", JSON.stringify(settings))
  }

}



export { SettingsService }

