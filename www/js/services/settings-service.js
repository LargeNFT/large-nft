class SettingsService {

  getSettings() {
    return localStorage.getObject("settings");
  }

  saveSettings(settings) {
    localStorage.setObject("settings", settings);
  }

}
