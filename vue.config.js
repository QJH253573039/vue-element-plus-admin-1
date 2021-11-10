const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')

let title = process.env.VUE_APP_TITLE

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,

    configureWebpack:{
        plugins: [
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },


    chainWebpack(config) {
        config.plugin('html').tap(args=>{
            args[0].title = title
            return args
        })


        config.module
            .rule('svg')
            .exclude.add(path.resolve(__dirname, './src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end()
    },
}
