import { merge } from 'webpack-merge'
import common from './webpack.common'


let configs = common()

let mainConfigs = []

for (let config of configs) {
    //@ts-ignore
    mainConfigs.push(merge(config, {
        //@ts-ignore
        //@ts-ignore
        mode: 'development',
        //@ts-ignore
        devtool: 'source-map',
    }))
}




export default mainConfigs

