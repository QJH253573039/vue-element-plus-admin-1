const path = require("path")

module.exports = {
    chainWebpack(config) {
        // 清除 svg loader
        // config.module.rule("svg").uses.clear();
        // 添加 svg loader
        // config.module
        // 排除 svg loader 对 node_modules 的操作
        // .rule("svg-sprite-loader")
        // .test(/.svg$/)
        // .exclude.add(/node_modules/)
        // .end()
        // 添加 svg loader 对 icons/svg 下的 svg 图标进行操作
        // .test(/\.svg$/)
        // .include.add(path.resolve(__dirname, './src/icons/svg'))
        // .end()
        // .use("svg-sprite-loader")
        // .loader("svg-sprite-loader")
        // 定义规则  <svg class="icon-svg"> <use xlink:href="#icon-name"></use></svg>
        // .options({
        //     symbolId: "icon-[name]"
        // });

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