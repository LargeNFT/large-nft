import { merge } from 'webpack-merge'
import configs from './webpack.common'

let mainConfigs = []

for (let config of configs) {
    //@ts-ignore
    mainConfigs.push(merge(config, {
        //@ts-ignore
        mode: 'production'
    }))
}




export default mainConfigs

