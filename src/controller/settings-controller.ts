import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';


import AdminSettingsComponent from '../components/admin/settings/index.f7.html'
import { PinningApi } from "../dto/pinning-api";
import { Gitlab } from "../dto/gitlab";
import { PinningService } from "../service/core/pinning-service";
import { GitlabService } from "../service/core/gitlab-service";


@injectable()
class SettingsController {

  constructor(
    private pinningService: PinningService,
    private gitlabService: GitlabService
  ) { }

  @routeMap("/admin/settings")
  async show(): Promise<ModelView> {

    return new ModelView(async (routeTo: RouteTo) => {

      let pinningApi: PinningApi

      try {
        pinningApi = await this.pinningService.getPinata()
      } catch (ex) { }

      //If it doesn't exist create an empty one
      if (!pinningApi) {

        pinningApi = Object.assign(new PinningApi(), {
          apiKey: '',
          secretApiKey: '',
          url: "https://api.pinata.cloud"
        })

      }


      let gitlab: Gitlab

      try {
        gitlab = await this.gitlabService.get()
      } catch (ex) { }

      //If it doesn't exist create an empty one
      if (!gitlab) {

        gitlab = Object.assign(new Gitlab(), {
          personalAccessToken: ''
        })

      }

      return {
        pinningApi: pinningApi,
        gitlab: gitlab
      }
      

    }, AdminSettingsComponent)
  }


}

export {
  SettingsController
}