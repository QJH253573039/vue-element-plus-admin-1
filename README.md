
<h1 align="center">Vue ElementPlus Admin</h1>

<div align="center">
  
[Vue3 Element Plus Admin](https://github.com/TheFirework/vue-element-plus-admin) 开箱即用的后管理系统。它基于vue3和element plus 实现。内置了动态路由，i18n国际化，动态权限菜单等功能。

</div>

## 功能

```
- 登录 / 注销

- 动态路由
- 动态侧边栏（支持多级路由嵌套）
- 动态面包屑
- 快捷导航(标签页)
- 本地/后端 mock 数据
- 組件
  - 富文本
- 表格
  - 动态表格
  - 综合表格
- 错误页面
  - 401
  - 404
- ECharts 图表
- Clipboard(剪贴复制)
- Svg Sprite 图标
- 切换主题色
- i18n国际化
- 系统设置
  - 用户列表
  - 菜单列表
```

## 目录结构
```
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 项目源码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── http                   # http 请求工具
│   ├── icons                  # 项目所有 svg icons
│   ├── i18n                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── plugins                # 插件
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件
│   └── bootstrap.js           # 项目初始化
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── babel.config.js            # babel-loader 配置
├── nodemon.json               # 监听 mock 文件变更自动更新
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```



## 安装

```bash
# 克隆项目
git clone https://github.com/TheFirework/vue-element-plus-admin.git

# 进入项目目录
cd vue-element-plus-admin

# 安装依赖
yarn

# 本地开发 启动项目
yarn start
```

启动完成后会自动打开浏览器访问 http://localhost:8080/.

