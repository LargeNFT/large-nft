import { injectable } from "inversify";
import { ModelView } from "../util/model-view.js";
import { routeMap } from "../util/route-map.js";
import { RouteTo } from '../service/core/routing-service.js';


import AdminSettingsComponent from '../components/admin/settings/index.f7.html'

import { SettingsService } from "../service/core/settings-service.js";
import { Settings } from "../dto/settings.js";


@injectable()
class SettingsController {

  constructor(
    private settingsService: SettingsService
  ) { }

  @routeMap("/admin/settings")
  async show(): Promise<ModelView> {

    return new ModelView(async (routeTo: RouteTo) => {
    }, AdminSettingsComponent)
  }


}

export {
  SettingsController
}