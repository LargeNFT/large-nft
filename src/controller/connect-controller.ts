import { injectable } from "inversify";
import { ModelView } from "../util/model-view";
import { routeMap } from "../util/route-map";
import { RouteTo } from '../service/core/routing-service';


import AdminConnectComponent from '../components/admin/connect/index.f7.html'

import { Author } from "../dto/author";
import { IpfsService } from "../service/core/ipfs-service";

@injectable()
class ConnectController {

    constructor(
      private ipfsService:IpfsService
    ) {}

    @routeMap("/admin/connect")
    async show() : Promise<ModelView> {

        return new ModelView(async (routeTo:RouteTo) => {

          if (!this.ipfsService.ipfs) return {}

          let peers = await this.ipfsService.ipfs.swarm.peers()
            
          return {
            peers: peers.map(e => e.addr.toString()),
            peerCount: peers.length
          }


        }, AdminConnectComponent)
    }

}

export {
  ConnectController
}