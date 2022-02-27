import { getContainer } from "large-core"

import AppComponent from './components/app.f7.html'
import HomeComponent from './components/home/home.f7.html'

import AdminPostIndexComponent from './components/admin/post/index.f7.html'
import AdminPostCreateComponent from './components/admin/post/create.f7.html'

import { RoutingService } from './service/routing-service';
import { UiService } from './service/ui-service';

import { providers } from "ethers"
import { QueueService } from './service/queue_service';
import { PagingService } from './service/paging-service';
import { DeployService } from './service/deploy-service';
import { QuillService } from "./service/quill-service";
import { UploadService } from "./service/upload-service";



let container

function getMainContainer() {

    if (container) return container 

    container = getContainer()
    

    function framework7() {

        //Init framework7
        const Framework7 = require('framework7/bundle').default
        
        return new Framework7({
            el: '#app', // App root element
            id: 'large', // App bundle ID
            name: 'Large', // App name
            theme: 'auto', // Automatic theme detection
            component: AppComponent,
            routes: [
                {
                    path: "/",
                    component: HomeComponent
                },
                {
                    path: "/admin/post",
                    component: AdminPostIndexComponent
                },
                {
                    path: "/admin/post/create",
                    component: AdminPostCreateComponent
                }
            ]
        })
    }

    function contracts() {
        
      const c = require('../contracts.json')

      const overrides = require('../contracts-override.json')


      //Override addresses
    //   c['MLBC'].address = overrides['MLBC']
    //   c['Words'].address = overrides['Words']
    //   c['Baseballs'].address = overrides['Baseballs']
    //   c['BaseballWords'].address = overrides['BaseballWords']


      return c
    }
    
    function provider() {

        if (typeof window !== "undefined" && window['ethereum']) {
    
            //@ts-ignore
            window.web3Provider = window.ethereum
    
            //@ts-ignore
            return new providers.Web3Provider(window.ethereum)  

            
        } 
    }
    
    // container.bind('sketch').toConstantValue(sketch())
    container.bind("contracts").toConstantValue(contracts())
    container.bind("provider").toConstantValue(provider())
    container.bind("name").toConstantValue("Large")
    container.bind("framework7").toConstantValue(framework7())

    function ipfsOptions() {
        return {
            repo: "large",
            relay: {
              enabled: true,
              hop: {
                enabled: true // enable circuit relay HOP (make this node a relay)
              }
            },
            config: {
              Addresses: {
                //@ts-ignore
                Swarm: []
              }
            }
      
          }
      
    }

    function orbitOptions() {
        return {
        }
    }

    container.bind("ipfsOptions").toConstantValue(ipfsOptions())
    container.bind("orbitOptions").toConstantValue(orbitOptions())

    container.bind(RoutingService).toSelf().inSingletonScope()
    container.bind(UiService).toSelf().inSingletonScope()
    container.bind(QueueService).toSelf().inSingletonScope()
    container.bind(PagingService).toSelf().inSingletonScope()
    container.bind(DeployService).toSelf().inSingletonScope()
    container.bind(QuillService).toSelf().inSingletonScope()
    container.bind(UploadService).toSelf().inSingletonScope()





    return container
}



export {
    getMainContainer, container
}