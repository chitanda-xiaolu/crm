/*
 * @Description: vuecli3 项目配置
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-07-20 16:41:06
 * @LastEditors: Zale Ying
 */
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, './', dir)
}
module.exports = {
    publicPath: process.env.VUE_APP_SRC,
    outputDir: 'dist',
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.32.201:5000',
                // // target: 'http://192.168.31.118:8080',
                // target: 'http://101.37.85.221:5000',
                // target: 'http://47.110.188.237:5000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/map': {
                target: 'http://api.map.baidu.com/place/v2/search',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/map': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/scss/main.scss";`
            }
        },
        sourceMap: false
    }
}
