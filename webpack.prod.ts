import { merge } from 'webpack-merge'
import common from './webpack.common'

let mainConfig = merge(common, {
    //@ts-ignore
    mode: 'production'
})


export default [mainConfig]


