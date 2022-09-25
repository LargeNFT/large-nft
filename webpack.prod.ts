//@ts-nocheck
import { merge } from 'webpack-merge'
import common from './webpack.common'


let configs = common()

let mainConfigs = []

for (let config of configs) {

    mainConfigs.push(merge(config, {
        // mode: 'production'

                //@ts-ignore
                mode: 'development',
                //@ts-ignore
                devtool: 'source-map',
    }))

}




export default mainConfigs

