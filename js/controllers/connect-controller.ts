
import { ModelView, Dom7, Template7 } from "large-web"



var $$ = Dom7;

class ConnectController {


    constructor(
        private ipfs
    ) {}

    async showHome() : Promise<ModelView> {

        const self = this

        return new ModelView( async () => {

            let peers = await self.ipfs.swarm.peers()
            
            peers = peers.map(e => e.addr.toString())

            let subscribed = await self.ipfs.pubsub.ls()

            return {
                peers: peers,
                subscribed: subscribed,
                currentAccount: window['currentAccount']
            }
            
        }, 'pages/connect/home.html')

    }


}


export {
    ConnectController
}