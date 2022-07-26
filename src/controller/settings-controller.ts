import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';


import AdminSettingsComponent from '../components/admin/settings/index.f7.html'
import { PinningApi } from "../dto/pinning-api";
import { Gitlab } from "../dto/gitlab";
import { PinningService } from "../service/core/pinning-service";
import { GitlabService } from "../service/core/gitlab-service";
import { IpfsHostService } from "../service/core/ipfs-host-service";
import { IpfsHost } from "../dto/ipfs-host";


@injectable()
class SettingsController {

  constructor(
    private pinningService: PinningService,
    private gitlabService: GitlabService,
    private ipfsHostService: IpfsHostService
  ) { }

  @routeMap("/admin/settings")
  async show(): Promise<ModelView> {

    return new ModelView(async (routeTo: RouteTo) => {


      //Pinning APIs
      let pinningApis: PinningApi[]

      try {
        pinningApis = await this.pinningService.list(1000,0)
      } catch (ex) { }




      //GitLab
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


      //Ipfs Host
      let ipfsHost: IpfsHost

      try {
        ipfsHost = await this.ipfsHostService.get()
      } catch (ex) { }


      //If it doesn't exist create an empty one
      if (!ipfsHost) {
        ipfsHost = Object.assign(new IpfsHost(), {})
      }

      
      return {
        pinningApis: pinningApis,
        gitlab: gitlab,
        ipfsHost: ipfsHost
      }
      

    }, AdminSettingsComponent)
  }


}

export {
  SettingsController
}