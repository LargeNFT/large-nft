import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';


import AdminSettingsComponent from '../components/admin/settings/index.f7.html'

import { SettingsService } from "../service/core/settings-service";
import { Settings } from "../dto/settings";


@injectable()
class SettingsController {

  constructor(
    private settingsService: SettingsService
  ) { }

  @routeMap("/admin/settings")
  async show(): Promise<ModelView> {

    return new ModelView(async (routeTo: RouteTo) => {

      //GitLab
      let settings: Settings

      try {
        settings = await this.settingsService.get()
      } catch (ex) { }

      //If it doesn't exist create an empty one
      if (!settings) {

        settings = Object.assign(new Settings(), {
          personalAccessToken: ''
        })

      }
      
      return {
        settings: settings
      }
      

    }, AdminSettingsComponent)
  }


}

export {
  SettingsController
}