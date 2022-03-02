import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"


import { getMainContainer } from "./inversify-reader.config"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'

import './html/css/app.css'
import './html/css/quill.snow.css'
import 'material-icons/iconfont/material-icons.css';

import './html/images/logo.png'


// import { RoutingService } from "./service/routing-service"
// import { BlogPostService, OrbitService, PageService, ProfileService, SchemaService, WalletService } from "large-core"





export default async() => {
                
    let container = getMainContainer()

    // let app = container.get("framework7")

    // console.log(app)

}
