
import Web, { ModelView} from "large-web"
import Core, { SchemaService } from "large-core";
import { Global } from "../../global";
import { Dom7, Template7 } from "framework7/js/framework7.bundle"




class ConnectController {

    constructor(
        private ipfs,
        private schemaService:SchemaService
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




    async addPeerSubmit(e:Event) {

        console.log('Add peer submit')
        
        let pageData = Global.app.form.convertToData('#add-peer-form')

        //@ts-ignore
        document.getElementById('peerAddressInput').setCustomValidity("")

        if (pageData.peerAddress) {
            try {
                await Core.ipfs.swarm.connect(pageData.peerAddress)

                Web.uiService.showPopup(`Successfully connected to peer ${pageData.peerAddress}`)
                
                console.log('Connected to peer')
            } catch(ex) {
                Web.uiService.showExceptionPopup(ex)
            }
        }




    }

}


export {
    ConnectController
}