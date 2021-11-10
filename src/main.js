import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './bootstrap';

import '@/styles/base.scss'
import 'normalize.css';
import 'nprogress/nprogress.css';
// 需要单独引入的组件样式
import "element-plus/theme-chalk/src/message.scss"
import "element-plus/theme-chalk/src/notification.scss"
import "element-plus/theme-chalk/src/message-box.scss"

const app = createApp(App)

bootstrap({ app, }).then(async ({ router}) => {
    router.isReady().then(() => app.mount('#app'))
})


