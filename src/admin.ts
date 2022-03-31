import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"


import { getMainContainer } from "./inversify-admin.config"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'

import './html/css/app.css'
import './html/css/quill.snow.css'
import 'material-icons/iconfont/material-icons.css'
import '@yaireo/tagify/dist/tagify.css'


import './html/images/logo.png'


export default async() => {
                
    let container = getMainContainer()

}
