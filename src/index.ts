import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'

import 'material-icons/iconfont/material-icons.css'
import './html/css/app.css'
import './html/css/landing.css'





//Init framework7
//@ts-ignore
import Framework7 from 'framework7';

// Import additional components
//@ts-ignore
import Dialog from 'framework7/components/dialog';
//@ts-ignore
import Toast from 'framework7/components/toast';
//@ts-ignore
import Preloader from 'framework7/components/preloader';
//@ts-ignore
import VirtualList from 'framework7/components/virtual-list'
//@ts-ignore
import ListIndex from 'framework7/components/list-index'
//@ts-ignore
import Card from 'framework7/components/card'
//@ts-ignore
import Chip from 'framework7/components/chip'
//@ts-ignore
import Popup from 'framework7/components/popup'
//@ts-ignore
import Accordion from 'framework7/components/accordion'
//@ts-ignore
import Popover from 'framework7/components/popover'

//@ts-ignore
import Form from 'framework7/components/form'
//@ts-ignore
import Input from 'framework7/components/input'
//@ts-ignore
import Checkbox from 'framework7/components/checkbox'
//@ts-ignore
import Radio from 'framework7/components/radio'
//@ts-ignore
import Toggle from 'framework7/components/toggle'
//@ts-ignore
import Range from 'framework7/components/range'
//@ts-ignore
import Stepper from 'framework7/components/stepper'
//@ts-ignore
import SmartSelect from 'framework7/components/smart-select'
//@ts-ignore
import Grid from 'framework7/components/grid'
//@ts-ignore
import InfiniteScroll from 'framework7/components/infinite-scroll'
//@ts-ignore
import Menu from 'framework7/components/menu'


// Install F7 Components using .use() method on Framework7 class:
Framework7.use([Dialog, Toast, Preloader, VirtualList, ListIndex, Card, Chip,
  Form, Input, Checkbox, Radio, Toggle, Range, Stepper, SmartSelect, Grid, InfiniteScroll, Menu, Popup,Accordion,
  Popover
])


import AppComponent from './components/index/app.f7.html'
import IndexPageComponent from './components/index/index.f7.html'



export default async() => {
                
    let app = new Framework7({
        el: '#app', // App root element
        id: 'large-index', // App bundle ID
        name: 'Large Home', // App name
        theme: 'auto', // Automatic theme detection
  
        init: false,

        //@ts-ignore
        component: AppComponent,
        routes: [
            {
                path: "/",
                component: IndexPageComponent
            }
        ]

      })

      // console.log(app.routes)

    app.init()

}
