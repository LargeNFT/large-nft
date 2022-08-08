import { merge } from 'webpack-merge'
import path from 'path'
import common from './webpack.common'


let mainConfigs = []


let baseURI = "http://localhost:9081"

let configs = common(baseURI)

for (let config of configs) {
    //@ts-ignore
    mainConfigs.push(merge(config, {
        //@ts-ignore
        mode: 'development',
        //@ts-ignore
        devtool: 'source-map',

    }))
}

mainConfigs[0].devServer = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: false,
    port: 9081,

}


export default mainConfigs
