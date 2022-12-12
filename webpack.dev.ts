//@ts-nocheck
import { merge } from 'webpack-merge'
import common from './webpack.common.js'



import path, { dirname } from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)








let mainConfigs = []


let configs = common()

for (let config of configs) {
    //@ts-ignore
    mainConfigs.push(merge(config, {
        //@ts-ignore
        mode: 'development',
        //@ts-ignore
        devtool: 'source-map',
        watch: true
    }))
}



//@ts-ignore
mainConfigs[0].devServer = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: false,
    port: 9081
}


export default mainConfigs
