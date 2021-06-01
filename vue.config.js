const path = require("path")


module.exports = {
    lintOnSave:false,
    productionSourceMap: false,

    // css: {
        // extract: process.env.NODE_ENV === "production",
        // sourceMap: false,
        // loaderOptions: {
        //     sass: {
        //         additionalData: `@import "~@/styles/common.scss";`
        //     }
        // }
    // },

    chainWebpack(config) {

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
                symbolId: 'icon-[name]'
            })
            .end()
    }
}