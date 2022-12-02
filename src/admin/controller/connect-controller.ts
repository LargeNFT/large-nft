import { injectable } from "inversify";
import { ModelView } from "../util/model-view.js";
import { routeMap } from "../util/route-map.js";
import { RouteTo } from '../service/core/routing-service.js';


import AdminConnectComponent from '../components/admin/connect/index.f7.html'

import { Author } from "../dto/author.js";
import { IpfsService } from "../service/core/ipfs-service.js";

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
            
          let id = await this.ipfsService.ipfs.id()

          return {
            peers: peers.map(e => e.addr.toString()),
            peerCount: peers.length,
            addresses: id?.addresses?.map( a => a.toString())
          }


        }, AdminConnectComponent)
    }

}

export {
  ConnectController
}