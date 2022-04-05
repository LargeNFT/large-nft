import { merge } from 'webpack-merge'
import path from 'path'
import configs from './webpack.common'


let mainConfigs = []

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
    port: 8081,

}


export default mainConfigs
